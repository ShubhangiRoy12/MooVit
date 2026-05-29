"""
MooVit Real-Time Tracking API
--------------------------------
Provides REST API endpoints for live shipment tracking,
vehicle locations, ETA calculations, and route information.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# ============================================
# SAMPLE DATABASE - Shipment Information
# ============================================

SHIPMENTS_DB = {
    "SHIP-12345": {
        "id": "SHIP-12345",
        "status": "in-transit",
        "origin": "Mumbai, Maharashtra",
        "destination": "Delhi, NCR",
        "customer": "Acme Corporation",
        "customer_type": "business",
        "weight": "245 kg",
        "type": "Electronics",
        "value": "₹4,50,000",
        "driver": {
            "name": "Rajesh Kumar",
            "phone": "+91 98765 12345",
            "rating": 4.8,
            "experience": "8 years"
        },
        "vehicle": {
            "number": "MH-04-AB-1234",
            "type": "Container Truck",
            "capacity": "10 tons"
        },
        "location": {"lat": 23.0225, "lng": 72.5714},
        "speed": 85,
        "temperature": 22,  # Celsius (for sensitive cargo)
        "fuel_level": 65,   # Percentage
        "last_update": str(datetime.now()),
        "eta_minutes": 135,
        "progress": 42      # Percentage completed
    },
    "SHIP-67890": {
        "id": "SHIP-67890",
        "status": "delivered",
        "origin": "Chennai, Tamil Nadu",
        "destination": "Bangalore, Karnataka",
        "customer": "Tech Solutions Pvt Ltd",
        "customer_type": "business",
        "weight": "120 kg",
        "type": "IT Equipment",
        "value": "₹12,50,000",
        "driver": {
            "name": "Priya Singh",
            "phone": "+91 87654 32109",
            "rating": 4.9,
            "experience": "5 years"
        },
        "vehicle": {
            "number": "TN-07-CD-5678",
            "type": "Refrigerated Van",
            "capacity": "3 tons"
        },
        "location": {"lat": 12.9716, "lng": 77.5946},
        "speed": 0,
        "temperature": 4,
        "fuel_level": 0,
        "last_update": str(datetime.now() - timedelta(hours=5)),
        "eta_minutes": 0,
        "progress": 100
    },
    "SHIP-11111": {
        "id": "SHIP-11111",
        "status": "pending",
        "origin": "Kolkata, West Bengal",
        "destination": "Patna, Bihar",
        "customer": "Fresh Foods Ltd",
        "customer_type": "individual",
        "weight": "500 kg",
        "type": "Perishable Goods",
        "value": "₹85,000",
        "driver": {
            "name": "Suresh Yadav",
            "phone": "+91 99887 66554",
            "rating": 4.7,
            "experience": "6 years"
        },
        "vehicle": {
            "number": "WB-02-EF-9012",
            "type": "Refrigerated Truck",
            "capacity": "8 tons"
        },
        "location": {"lat": 22.5726, "lng": 88.3639},
        "speed": 0,
        "temperature": 4,
        "fuel_level": 100,
        "last_update": str(datetime.now()),
        "eta_minutes": 180,
        "progress": 0
    },
    "SHIP-22222": {
        "id": "SHIP-22222",
        "status": "in-transit",
        "origin": "Hyderabad, Telangana",
        "destination": "Pune, Maharashtra",
        "customer": "Global Traders",
        "customer_type": "business",
        "weight": "780 kg",
        "type": "Machinery",
        "value": "₹28,00,000",
        "driver": {
            "name": "Amit Patel",
            "phone": "+91 77665 44332",
            "rating": 4.6,
            "experience": "10 years"
        },
        "vehicle": {
            "number": "TS-09-GH-3456",
            "type": "Flatbed Truck",
            "capacity": "15 tons"
        },
        "location": {"lat": 18.5204, "lng": 73.8567},
        "speed": 72,
        "temperature": 28,
        "fuel_level": 55,
        "last_update": str(datetime.now()),
        "eta_minutes": 95,
        "progress": 65
    }
}

# ============================================
# ROUTE COORDINATES FOR EACH SHIPMENT
# ============================================

SHIPMENT_ROUTES = {
    "SHIP-12345": [
        {"lat": 19.0760, "lng": 72.8777, "name": "Mumbai", "time": "2025-05-11 08:00 AM", "status": "completed"},
        {"lat": 20.3710, "lng": 72.9110, "name": "Vapi", "time": "2025-05-11 11:30 AM", "status": "completed"},
        {"lat": 22.3072, "lng": 73.1812, "name": "Vadodara", "time": "2025-05-11 02:45 PM", "status": "completed"},
        {"lat": 23.0225, "lng": 72.5714, "name": "Ahmedabad", "time": "2025-05-11 05:00 PM", "status": "current"},
        {"lat": 24.5854, "lng": 73.7125, "name": "Udaipur", "time": "ETA: 08:00 PM", "status": "pending"},
        {"lat": 26.9124, "lng": 75.7873, "name": "Jaipur", "time": "ETA: 02:00 AM", "status": "pending"},
        {"lat": 28.7041, "lng": 77.1025, "name": "Delhi", "time": "ETA: 08:00 AM", "status": "pending"}
    ],
    "SHIP-67890": [
        {"lat": 13.0827, "lng": 80.2707, "name": "Chennai", "time": "2025-05-10 09:00 AM", "status": "completed"},
        {"lat": 12.9165, "lng": 79.1325, "name": "Vellore", "time": "2025-05-10 12:30 PM", "status": "completed"},
        {"lat": 12.9716, "lng": 77.5946, "name": "Bangalore", "time": "2025-05-10 04:00 PM", "status": "completed"}
    ],
    "SHIP-11111": [
        {"lat": 22.5726, "lng": 88.3639, "name": "Kolkata", "time": "2025-05-11 10:00 AM", "status": "current"},
        {"lat": 23.7957, "lng": 86.4304, "name": "Dhanbad", "time": "ETA: 02:00 PM", "status": "pending"},
        {"lat": 25.5941, "lng": 85.1376, "name": "Patna", "time": "ETA: 06:00 PM", "status": "pending"}
    ],
    "SHIP-22222": [
        {"lat": 17.3850, "lng": 78.4867, "name": "Hyderabad", "time": "2025-05-11 09:00 AM", "status": "completed"},
        {"lat": 18.5204, "lng": 73.8567, "name": "Pune", "time": "2025-05-11 04:30 PM", "status": "current"}
    ]
}

# ============================================
# API ENDPOINTS
# ============================================

@app.route('/api/track/<shipment_id>', methods=['GET'])
def track_shipment(shipment_id):
    """
    Get real-time tracking data for a specific shipment.
    
    Query Parameters:
        - refresh: (optional) Force refresh location
        
    Returns:
        JSON object with shipment details and current location
    """
    shipment_id = shipment_id.upper()
    
    if shipment_id not in SHIPMENTS_DB:
        return jsonify({
            "success": False,
            "error": f"Shipment {shipment_id} not found",
            "available_ids": list(SHIPMENTS_DB.keys())
        }), 404
    
    data = SHIPMENTS_DB[shipment_id].copy()
    
    # Add route information
    if shipment_id in SHIPMENT_ROUTES:
        data['route'] = SHIPMENT_ROUTES[shipment_id]
    
    # Simulate real-time location update for in-transit shipments
    if data['status'] == 'in-transit':
        # Random but realistic movement
        data['location']['lat'] += random.uniform(-0.008, 0.008)
        data['location']['lng'] += random.uniform(-0.008, 0.008)
        
        # Decrease ETA
        data['eta_minutes'] = max(0, data['eta_minutes'] - random.randint(1, 3))
        
        # Update progress
        total_time = 180  # Total expected minutes
        data['progress'] = min(95, int((1 - data['eta_minutes'] / total_time) * 100))
        
        # Random speed variation
        data['speed'] = random.randint(65, 95)
        
        # Random fuel consumption
        data['fuel_level'] = max(0, data['fuel_level'] - random.randint(0, 2))
        
        # Update timestamp
        data['last_update'] = str(datetime.now())
    
    # Add friendly ETA string
    if data['eta_minutes'] > 0:
        hours = data['eta_minutes'] // 60
        minutes = data['eta_minutes'] % 60
        if hours > 0:
            data['eta_string'] = f"{hours} hr {minutes} min"
        else:
            data['eta_string'] = f"{minutes} minutes"
    else:
        data['eta_string'] = "Arrived"
    
    return jsonify({
        "success": True,
        "data": data,
        "timestamp": str(datetime.now())
    })


@app.route('/api/shipments', methods=['GET'])
def get_all_shipments():
    """
    Get list of all shipments (basic info only).
    
    Query Parameters:
        - status: (optional) Filter by status (in-transit, delivered, pending)
        
    Returns:
        JSON array of shipment summaries
    """
    status_filter = request.args.get('status', None)
    
    shipments_list = []
    for sid, shipment in SHIPMENTS_DB.items():
        if status_filter and shipment['status'] != status_filter:
            continue
            
        shipments_list.append({
            "id": sid,
            "status": shipment['status'],
            "origin": shipment['origin'],
            "destination": shipment['destination'],
            "customer": shipment['customer'],
            "type": shipment['type'],
            "eta_minutes": shipment['eta_minutes']
        })
    
    return jsonify({
        "success": True,
        "data": shipments_list,
        "count": len(shipments_list),
        "timestamp": str(datetime.now())
    })


@app.route('/api/shipments/active', methods=['GET'])
def get_active_shipments():
    """
    Get all in-transit shipments (for live tracking dashboard).
    
    Returns:
        JSON array of active shipments with location data
    """
    active = []
    for sid, shipment in SHIPMENTS_DB.items():
        if shipment['status'] == 'in-transit':
            active.append({
                "id": sid,
                "origin": shipment['origin'],
                "destination": shipment['destination'],
                "location": shipment['location'],
                "eta_minutes": shipment['eta_minutes'],
                "progress": shipment.get('progress', 0),
                "driver": shipment['driver']['name']
            })
    
    return jsonify({
        "success": True,
        "data": active,
        "count": len(active),
        "timestamp": str(datetime.now())
    })


@app.route('/api/shipments/<shipment_id>/history', methods=['GET'])
def get_shipment_history(shipment_id):
    """
    Get historical tracking data for a shipment.
    
    Returns:
        JSON array of location history
    """
    shipment_id = shipment_id.upper()
    
    if shipment_id not in SHIPMENT_ROUTES:
        return jsonify({
            "success": False,
            "error": "No history found for this shipment"
        }), 404
    
    # Return route as history
    history = SHIPMENT_ROUTES[shipment_id]
    
    return jsonify({
        "success": True,
        "data": history,
        "shipment_id": shipment_id,
        "timestamp": str(datetime.now())
    })


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    API health check endpoint.
    
    Returns:
        API status and version
    """
    return jsonify({
        "status": "healthy",
        "version": "1.0.0",
        "service": "MooVit Tracking API",
        "timestamp": str(datetime.now()),
        "active_shipments": len([s for s in SHIPMENTS_DB.values() if s['status'] == 'in-transit'])
    })


@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """
    Get dashboard statistics.
    
    Returns:
        Summary statistics for admin dashboard
    """
    total = len(SHIPMENTS_DB)
    in_transit = len([s for s in SHIPMENTS_DB.values() if s['status'] == 'in-transit'])
    delivered = len([s for s in SHIPMENTS_DB.values() if s['status'] == 'delivered'])
    pending = len([s for s in SHIPMENTS_DB.values() if s['status'] == 'pending'])
    
    total_value = sum([int(s['value'].replace('₹', '').replace(',', '')) for s in SHIPMENTS_DB.values()])
    total_weight = sum([int(s['weight'].split()[0]) for s in SHIPMENTS_DB.values()])
    
    return jsonify({
        "success": True,
        "data": {
            "total_shipments": total,
            "in_transit": in_transit,
            "delivered": delivered,
            "pending": pending,
            "total_value": f"₹{total_value:,.0f}",
            "total_weight": f"{total_weight} kg",
            "on_time_rate": "94%",
            "avg_delivery_time": "2.4 days"
        },
        "timestamp": str(datetime.now())
    })


# ============================================
# ERROR HANDLERS
# ============================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found"
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500


# ============================================
# MAIN ENTRY POINT
# ============================================

if __name__ == '__main__':
    import sys
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

    print("\n" + "="*50)
    print("🚚 MooVit Real-Time Tracking API")
    print("="*50)
    print(f"📍 Server: http://localhost:5000")
    print(f"📊 Health Check: http://localhost:5000/api/health")
    print(f"\n📦 Available Shipments:")
    for sid in SHIPMENTS_DB.keys():
        print(f"   - {sid}")
    print("\n📋 Available Endpoints:")
    print("   GET /api/track/<shipment_id>     - Track specific shipment")
    print("   GET /api/shipments               - List all shipments")
    print("   GET /api/shipments/active        - List active shipments")
    print("   GET /api/shipments/<id>/history  - Get route history")
    print("   GET /api/dashboard/stats         - Dashboard statistics")
    print("   GET /api/health                  - Health check")
    print("="*50 + "\n")
    
    app.run(debug=True, port=5000, host='0.0.0.0')