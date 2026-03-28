# MooVit

MooVit is an AI-powered real-time object detection and voice-assist system designed to improve road safety and mobility—especially for visually impaired users, logistics operations, and vehicle drivers. It detects people, vehicles, traffic signals, animals, dangerous objects, and known faces. MooVit offers voice alerts for real-time navigation, shipment scheduling assistance, route optimization, and road safety awareness.

🔗 Live site: https://moo-vit.vercel.app/

---

## 🌐 Web Application

The MooVit web interface is simple, accessible, and packed with functionality:

- Access real-time camera feed for object detection
- Upload image or video files for instant analysis
- Bounding boxes + voice alerts for detected objects and threats
- Responsive interface works on both desktop and mobile
- Shipment route scheduling and alert-based safety recommendations (BETA)
- Safety awareness prompts for road signs, traffic zones, and conditions

Try it now → https://moo-vit.vercel.app/

---

## 📸 Project Screenshots

### 🏠 Home / Landing Page
![Home Page](services_section.png.png)

### 🚚 Services Section
![Services Section](home_hero.png.png)

---
## ✨ Features

- Detects vehicles, people, signals, and sharp objects
- Recognizes known faces to help visually impaired users follow familiar people
- Real-time voice alerts based on camera/video input
- Vehicle shipment schedule module: input shipment data, receive route timelines
- Route safety planner: avoid known hazard zones or restricted areas
- Traffic awareness: highlights signals, signs, and crossing points
- Upload images or use live camera feed for detection

---

## 📁 Folder Structure
```
MooVit/
├── .github/                       # GitHub templates and automation
│   ├── ISSUE_TEMPLATE/            # Bug and feature request templates
│   └── pull_request_template.md   # PR checklist template
├── Chatbot/                       # Chatbot module
├── feedback/                      # Feedback-related assets
├── FoodStall_and_hotels/          # Food and hotel feature pages
├── live-detection/                # Live detection feature
├── Public transportation/         # Public transport module
├── Routes/                        # Route planning module
├── Safety and awareness/          # Safety awareness module
├── Schedule/                      # Scheduling feature
├── sharingcab/                    # Cab sharing feature
├── sharp-detection/               # Sharp object detection
├── Shipments/                     # Shipment-related pages
├── Vehicles/                      # Vehicle module
├── index.html                     # Landing page
├── about.html                     # About page
├── services.html                  # Services page
├── contact.html                   # Contact page
├── feedback.html                  # Feedback page
├── script.js                      # Shared JavaScript
├── cursor.js                      # Cursor interaction logic
├── styles.css                     # Shared site styles
├── transport.css                  # Main transport UI styles
├── README.md                      # Project overview
├── CONTRIBUTING.md                # Contribution guide
├── CODE_OF_CONDUCT.md             # Community guidelines
└── LICENSE                        # MIT license
```


---
## 🛠 Tech Stack

### Computer Vision & AI
- YOLOv8 / YOLOv11 / YOLOv12 – object detection
- OpenCV – image and video stream processing
- TensorFlow / PyTorch – model training and inference

### Web & Voice Interaction
- HTML, CSS, JavaScript – frontend interface
- Python + Flask / FastAPI – backend server and APIs
- Canvas API – draw detection boxes in real-time
- MediaDevices API – access webcam on web
- json – text-to-speech alerts

### Logistics & Route Modules
- Custom scheduling API – for shipment planning (JSON-based input)
- GeoJSON / Google Maps API (optional) – for route plotting and safe-path suggestions
- SQLite / JSON – for storing schedules and known hazard zones

### Deployment & Tools
- Vercel – frontend deployment
- GitHub – version control
- WebSocket / HTTP Fetch – real-time communication

---

## 📦 Installation (Developer Setup)

1. Clone the repo:

```bash
git clone https://github.com/ShubhangiRoy12/moovit.git
cd moovit
```

2. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```
3. Start the backend server:
```bash
python app.py
```

4. For frontend, deploy the frontend/ folder on Vercel or use a static server locally.

---
 
## 📋 Use Cases

-Assist visually impaired users with voice-based object alerts

-Help logistics teams plan safe and efficient routes

-Offer vehicle drivers route awareness and obstacle warnings

-Provide safety prompts in traffic-heavy or high-risk zones

-Enable face tracking to follow companions in crowded areas

---

## 🚧 Future Plans

-Add multilingual voice support

-GPS-based live routing for shipment vehicles

-Heatmap overlays for high-risk zones

-Admin dashboard to view and edit shipment schedules

-Public API for integration with logistics and assistive apps

---

## 🤝 Contributing

-We welcome contributions! You can help with:

-Improving detection accuracy

-Expanding shipment scheduling logic

-UI/UX design improvements

-Adding more face profiles or localization features

---

Steps:
1. Fork this repo
2. Create a branch (git checkout -b feature-name)
3. Commit your changes
4. Push and open a PR

---

## Contibutors
- **[Shubhangi Roy](https://github.com/ShubhangiRoy12)** – Project Lead & Machine Learning Engineer 

- **[Om Roy](https://github.com/omroy07)** – Web Developer  & Machine Learning Engineer


📜 License
This project is licensed under the MIT License. See LICENSE file for details.

