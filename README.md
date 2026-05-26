# 🚦 MooVit – Smart Transportation, Logistics & Safety Management Platform

MooVit is a smart transportation, logistics, and safety-focused web platform designed to improve urban mobility experiences through route optimization, shipment management, scheduling systems, vehicle tracking interfaces, safety awareness modules, and AI-assisted user interaction.

This project was developed as an open-source contribution initiative and demonstrates a modular frontend architecture combined with a lightweight Flask backend for shipment tracking and transportation utilities.

---

# 🌟 Vision

MooVit aims to provide an integrated ecosystem for transportation-related operations where users can:

* Manage routes efficiently
* Track shipments in real-time
* Organize transportation schedules
* Access transportation assistance tools
* Improve road safety awareness
* Explore travel-related facilities
* Interact using smart chatbot systems
* Monitor transportation workflows visually

The project is designed with scalability and modularity in mind, allowing independent transportation modules to evolve separately.

---

# 🧠 Key Highlights

✅ Modular transportation platform

✅ Shipment tracking system with Flask backend

✅ Interactive scheduling dashboards

✅ Route analytics and transportation utilities

✅ Vehicle and logistics management interfaces

✅ Safety awareness and detection modules

✅ Smart chatbot integration

✅ Open-source friendly structure

✅ Beginner-friendly frontend architecture

---

# 🏗️ Project Architecture

```bash
Frontend (HTML/CSS/JS)
        │
        ├── Route Management
        ├── Shipment Interface
        ├── Scheduling System
        ├── Chatbot Assistant
        ├── Vehicle Dashboard
        ├── Public Transportation
        ├── Detection Modules
        └── Safety Awareness

Backend (Flask API)
        │
        └── Shipment Tracking APIs
```

---

# 📁 Repository Structure

```bash
MooVit-abhimanyu-main/
│
├── .github/                     # GitHub workflows and issue templates
├── Chatbot/                     # AI chatbot assistant module
├── FoodStall_and_hotels/        # Travel food & hotel utility module
├── MooVit/                      # Additional project resources
├── Public transportation/       # Public transport interfaces
├── Routes/                      # Route management dashboard
├── Safety and awareness/        # Safety education module
├── Schedule/                    # Scheduling & trip management
├── Shipments/                   # Shipment management frontend
├── Vehicles/                    # Vehicle management dashboard
├── backend/                     # Flask backend APIs
├── feedback/                    # Feedback system
├── live-detection/              # Live detection frontend module
├── sharingcab/                  # Shared cab interface
├── sharp-detection/             # Detection-related frontend
│
├── admin-dashboard.html         # Admin dashboard
├── admin.html                   # Admin panel
├── about.html                   # About page
├── 404.html                     # Custom error page
├── CONTRIBUTING.md              # Contribution guidelines
├── CODE_OF_CONDUCT.md           # Community rules
├── SECURITY.md                  # Security policy
├── LICENSE                      # Open-source license
└── LEARN.md                     # Learning & documentation notes
```

---

# ⚙️ Technology Stack

## 🎨 Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Bootstrap
* Chart.js

## ⚡ Backend

* Python
* Flask
* Flask-CORS

## 🧰 Development Utilities

* REST APIs
* DOM Manipulation
* Dynamic Event Handling
* Interactive UI Components

---

# 🚚 Route Management System

📂 Location:

```bash
Routes/
```

Files:

```bash
route.html
route.css
route.js
```

The Route Management module is one of the core transportation utilities inside MooVit.

It allows users to:

* Create transportation routes
* Track estimated travel time
* Calculate route distances
* Estimate fuel expenses
* Monitor transportation statistics
* Update and edit route information dynamically

## ✨ Features

* Interactive dashboard UI
* Route analytics cards
* Dynamic modal forms
* Route status tracking
* Route preview generation
* Export functionality
* Real-time clock updates
* Bootstrap-based responsive interface

## 🔍 Important Functions (`route.js`)

| Function                | Description                            |
| ----------------------- | -------------------------------------- |
| `init()`                | Initializes route management workflows |
| `updateLiveTime()`      | Updates dashboard live time            |
| `setupEventListeners()` | Registers frontend event handlers      |
| `showAddModal()`        | Opens add-route modal                  |
| `showEditModal()`       | Opens route editing interface          |
| `calculateRouteTime()`  | Calculates estimated trip duration     |
| `updateRoutePreview()`  | Generates route previews dynamically   |
| `exportData()`          | Handles route data export              |

## 📊 Route Statistics

The dashboard tracks:

* Active routes
* Delayed routes
* Completed routes
* In-transit routes
* Total distance
* Fuel cost estimations
* Estimated travel time

---

# 📦 Shipment Tracking System

📂 Locations:

```bash
Shipments/
backend/
```

Frontend Files:

```bash
shipments.html
shipments.css
shipments.js
```

Backend API:

```bash
backend/tracking_api.py
```

This module provides shipment and logistics management capabilities.

## 🚀 Features

* Shipment tracking
* Logistics status monitoring
* ETA management
* Driver & vehicle information tracking
* GPS location handling
* Fuel and temperature monitoring
* Progress visualization

## ⚙️ Backend Overview

The backend is implemented using Flask and Flask-CORS.

The API currently uses an in-memory shipment database structure for simulation and demonstration purposes.

### Example Structure

```python
SHIPMENTS_DB = {
    "SHIP-12345": {
        "status": "in-transit",
        "location": {
            "lat": 23.0225,
            "lng": 72.5714
        }
    }
}
```

## 📡 Backend Responsibilities

* Serve shipment tracking data
* Handle shipment status queries
* Return logistics information
* Provide tracking-related responses

---

# 📅 Schedule Management Module

📂 Location:

```bash
Schedule/
```

Files:

```bash
schedule.html
schedule.css
schedule.js
```

The scheduling system helps manage transportation schedules and trip workflows.

## ✨ Features

* Trip scheduling
* Driver assignment
* Vehicle allocation
* Trip status updates
* Analytics visualization
* Completion tracking
* Dynamic schedule tables

## 📈 Dashboard Analytics

Chart.js is used to generate visual transportation analytics.

Supported metrics include:

* Completed trips
* Pending schedules
* Cancelled schedules
* Weekly transportation statistics

## 🔍 Core Functions

| Function           | Purpose                       |
| ------------------ | ----------------------------- |
| `renderTable()`    | Renders schedules dynamically |
| `updateStats()`    | Updates analytics cards       |
| `addSchedule()`    | Adds new schedules            |
| `markComplete()`   | Marks trip as completed       |
| `deleteSchedule()` | Removes schedule entries      |

---

# 🤖 AI Chatbot Assistant

📂 Location:

```bash
Chatbot/
```

Files:

```bash
index.html
script.js
style.css
```

The chatbot module provides transportation-related conversational assistance.

## 💡 Capabilities

* Greeting responses
* Transportation guidance
* Safety awareness suggestions
* Public transport assistance
* Emergency-related help prompts
* Parking assistance

## 🧠 Architecture

The chatbot is implemented using:

* Rule-based logic
* JavaScript event handling
* DOM manipulation
* Dynamic message rendering
* Predefined response categories

---

# 🚘 Vehicle Management Module

📂 Location:

```bash
Vehicles/
```

Files:

```bash
vechicle.html
vechicle.css
vechicle.js
```

## Features

* Vehicle information handling
* Vehicle dashboard UI
* Vehicle management workflows
* Transportation monitoring interfaces

---

# 🚍 Public Transportation Module

📂 Location:

```bash
Public transportation/
```

Files:

```bash
index.html
scripts.js
styles.css
```

This module provides public transportation-related interfaces and utilities.

---

# 🍽️ Food Stall & Hotels Module

📂 Location:

```bash
FoodStall_and_hotels/
```

This module enhances travel convenience by providing food stall and hotel-related frontend utilities.

Files:

```bash
index.html
script.js
styles.css
```

---

# 🛡️ Safety & Awareness Module

📂 Location:

```bash
Safety and awareness/
```

This module focuses on transportation safety awareness and educational assistance.

Files:

```bash
index.html
script.js
styles.css
```

---

# 📡 Live Detection Module

📂 Location:

```bash
live-detection/
```

Files:

```bash
live-detection.html
live-detection.css
live-detection.js
```

The module contains frontend interfaces related to live detection workflows.

---

# ⚠️ Sharp Detection Module

📂 Location:

```bash
sharp-detection/
```

Files:

```bash
sharp-detection.html
```

Contains frontend interfaces for detection-related functionality.

---

# 🚖 Sharing Cab Module

📂 Location:

```bash
sharingcab/
```

Files:

```bash
sharingcab.html
```

Provides shared transportation interface concepts.

---

# 👨‍💼 Admin Dashboards

Files:

```bash
admin.html
admin-dashboard.html
```

Administrative interfaces used for management and monitoring workflows.

---

# 📝 Feedback System

📂 Location:

```bash
feedback/
```

This module allows users to submit platform feedback.

---

# 🔒 Open Source & Community Files

| File                 | Purpose                       |
| -------------------- | ----------------------------- |
| `CONTRIBUTING.md`    | Contribution guidelines       |
| `CODE_OF_CONDUCT.md` | Community standards           |
| `SECURITY.md`        | Security policy               |
| `LICENSE`            | Open-source licensing         |
| `LEARN.md`           | Learning and onboarding notes |

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/wonderwithabhimanyu/MooVit-abhimanyu.git
```

## 2️⃣ Navigate to Project

```bash
cd MooVit-abhimanyu
```

---

# ⚙️ Backend Setup

## Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## Run Flask Server

```bash
python tracking_api.py
```

The backend server will start locally for shipment tracking APIs.

---

# 🌐 Frontend Setup

Since most modules are static frontend applications, you can run them directly.

## Option 1: Open HTML Files

Example:

```bash
Routes/route.html
```

## Option 2: Use Local Server (Recommended)

```bash
python -m http.server 8000
```

Then open:

```bash
http://localhost:8000
```

---

# 📊 Major Frontend Features

Across the platform, MooVit includes:

* Interactive dashboards
* Dynamic transportation tables
* Modal-based forms
* Real-time UI updates
* Transportation analytics
* Chart visualizations
* Event-driven architecture
* Dynamic frontend rendering
* Responsive interface sections

---

# 🧩 Project Characteristics

## 🏛️ Architecture Style

The project follows a modular frontend architecture where every transportation utility is isolated into dedicated modules.

## 🔄 Design Approach

Most modules rely on:

* DOM-based rendering
* JavaScript utility functions
* Dynamic event listeners
* In-memory frontend state handling
* Modular separation of concerns

---

# 🚀 Future Enhancements

Potential improvements for future contributors:

* Database integration
* Authentication system
* Live GPS tracking
* Map API integration
* WebSocket support
* Cloud deployment
* Real-time analytics
* AI-powered recommendations
* Mobile responsiveness improvements
* Persistent backend storage

---

# 🤝 Contributing

Contributions are welcome.

## Contribution Steps

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push your branch
5. Open a Pull Request

Please read:

* `CONTRIBUTING.md`
* `CODE_OF_CONDUCT.md`

before contributing.

---

# 📄 License

This repository includes a LICENSE file.

Please review the license terms before commercial usage.

---

# 👨‍💻 Repository Information

Original Repository:

urlOriginal MooVit Repository[https://github.com/ShubhangiRoy12/MooVit](https://github.com/ShubhangiRoy12/MooVit)

Fork / Contribution Repository:

urlMooVit-abhimanyu Repository[https://github.com/wonderwithabhimanyu/MooVit-abhimanyu](https://github.com/wonderwithabhimanyu/MooVit-abhimanyu)

---

# 🌍 Open Source Contribution

This README was prepared for open-source contribution purposes under GSSoC 2026 (GirlScript Summer of Code).

The project demonstrates:

* Collaborative open-source development
* Modular frontend engineering
* Transportation-focused problem solving
* Flask API integration
* Beginner-friendly contribution opportunities

---

# ⭐ Final Summary

MooVit is a transportation and logistics-focused modular web platform that combines:

* Route management
* Shipment tracking
* Vehicle systems
* Scheduling dashboards
* Transportation utilities
* Safety awareness tools
* Detection interfaces
* Smart chatbot assistance

The project provides an excellent foundation for contributors interested in:

* Frontend development
* Flask backend APIs
* Transportation systems
* Dashboard interfaces
* Open-source collaboration

Built with ❤️ for smart mobility and open-source innovation.
