# 🚀 MooVit

MooVit is an AI‑powered real‑time object detection and voice‑assist system designed to improve road safety and mobility — especially for visually impaired users, logistics operations, and vehicle drivers. It detects people, vehicles, traffic signals, animals, dangerous objects, and known faces while providing intelligent voice alerts for navigation, safety awareness, and logistics support.

🔗 **Live Site:** [https://moo-vit.vercel.app/](https://moo-vit.vercel.app/)

---

## 📑 Table of Contents

* Web Application
* Features
* Project Structure
* Tech Stack
* Installation
* Use Cases
* Future Plans
* Contributing
* Contributors
* License

---

## 🌐 Web Application

The MooVit web interface is designed to be simple, accessible, and highly functional:

* Real‑time camera feed for object detection
* Upload image or video files for instant analysis
* Bounding boxes with voice alerts for detected objects
* Fully responsive interface (desktop and mobile)
* Shipment route scheduling with safety recommendations (Beta)
* Traffic safety prompts for road signs, crossings, and hazard zones

👉 Try it here: [https://moo-vit.vercel.app/](https://moo-vit.vercel.app/)

---

## 📸 Project Screenshots

### 🏠 Home / Landing Page

![Home Page](services_section.png.png)

### 🚚 Services Section

![Services Section](home_hero.png.png)

---

## ✨ Features

* Detects vehicles, pedestrians, signals, animals, and hazards
* Known face recognition to assist visually impaired users
* Real‑time voice alerts from camera or uploaded media
* Shipment scheduling with route timeline insights
* Route safety planner to avoid restricted or risky zones
* Traffic awareness highlighting signals and crossings
* Support for both live camera input and file uploads

---

## 📂 Project Structure

```
MooVit/
├── .github/
│   └── workflows/           # GitHub Actions / CI configurations
│
├── frontend/
│   ├── index.html
│   ├── pages/
│   │   ├── about.html
│   │   ├── contact.html
│   │   ├── login.html
│   │   └── safety.html
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles.css
│   └── script.js
│
├── backend/
│   ├── app.py
│   ├── routes/
│   │   ├── tracking.py
│   │   ├── vehicles.py
│   │   └── safety.py
│   ├── models/
│   │   └── detection_model.py
│   └── utils/
```

---

## 🛠 Tech Stack

### 🤖 Computer Vision & AI

* YOLOv8 / YOLOv11 / YOLOv12
* OpenCV for image/video processing
* TensorFlow / PyTorch for model training and inference

### 🌐 Web & Voice Interaction

* HTML, CSS, JavaScript frontend
* Python (Flask / FastAPI) backend
* Canvas API for drawing detection overlays
* MediaDevices API for webcam access
* JSON‑based text‑to‑speech alerts

### 🚚 Logistics & Routing

* Custom scheduling API (JSON‑based input)
* GeoJSON / Google Maps API (optional integration)
* SQLite / JSON storage for routes and hazard data

### ☁️ Deployment & Tools

* Vercel (Frontend hosting)
* GitHub (Version control & collaboration)
* WebSocket / HTTP Fetch for real‑time communication

---

## 📦 Installation (Developer Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ShubhangiRoy12/moovit.git
cd moovit
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3️⃣ Run Backend Server

```bash
python app.py
```

### 4️⃣ Run Frontend

Deploy the `frontend/` folder on Vercel or use any static server locally.

---

## 📋 Use Cases

* Assist visually impaired users with voice‑based navigation alerts
* Logistics route planning and shipment tracking
* Driver assistance for obstacle detection and road awareness
* Traffic hazard identification and safety prompts
* Face tracking to help follow companions in crowded environments

---

## 🚧 Future Plans

* Multilingual voice support
* GPS‑based live shipment routing
* Risk zone heatmap overlays
* Admin dashboard for logistics management
* Public API integration for third‑party apps

---

## 🤝 Contributing

Contributions are welcome and encouraged.

### You can contribute by:

* Improving detection accuracy
* Enhancing logistics and scheduling features
* UI/UX improvements
* Accessibility and localization enhancements

### Contribution Steps:

1. Fork the repository
2. Create a branch:

   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes
4. Push your branch and open a Pull Request

---

## 👥 Contributors

* **Shubhangi Roy** – Project Lead & Machine Learning Engineer
* **Om Roy** – Web Developer & Machine Learning Engineer

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.
