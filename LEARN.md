# 🚦 MooVit: AI-Powered Road Safety & Assistance

Welcome to **MooVit**!  
An AI-driven, real-time object detection and voice assistance platform designed to enhance road safety, assist visually impaired users, and optimize logistics operations.

---

## 🚗 What It Does

- **Real-Time Object Detection**  
  Detects vehicles, pedestrians, traffic signals, animals, sharp objects, and known faces through live camera feed or uploaded media.  

- **Voice-Based Alerts**  
  Announces detected objects and hazards in real time to help users stay aware and safe.

- **Face Recognition**  
  Helps visually impaired users follow familiar people in public spaces.

- **Shipment & Route Scheduling**  
  Suggests safe and optimized delivery routes based on hazard data and user-provided shipment details.

- **Safety Awareness Prompts**  
  Warns about road signs, traffic zones, and conditions ahead.

---

## 🧩 Why It Matters

Road accidents, poor navigation, and limited accessibility tools remain a challenge for millions worldwide. MooVit offers:

- For visually impaired users → audio alerts to navigate safely  
- For drivers → warnings about hazards & traffic conditions  
- For logistics teams → optimized and safer delivery routes  
- For public safety → early detection of dangerous objects or animals on roads  

---

## 🛠️ Tech Stack

- **AI & Computer Vision:** YOLOv8 / YOLOv11 / YOLOv12, OpenCV, TensorFlow / PyTorch  
- **Backend:** Python (Flask / FastAPI), WebSocket, HTTP APIs  
- **Frontend:** HTML, CSS, JavaScript, Canvas API, MediaDevices API  
- **Data & Storage:** SQLite / JSON for schedules and hazard zones  
- **Mapping & Routing:** GeoJSON, Google Maps API (optional)  
- **Deployment:** Vercel (frontend), GitHub (version control)  

---

## 📂 Project Structure
```bash
MooVit/
├── backend/ # API and detection logic
│ ├── app.py # Main server
│ ├── detection/ # YOLO model scripts
│ ├── utils/ # Helper functions
│ └── requirements.txt # Backend dependencies
├── frontend/ # Web interface
│ ├── index.html
│ ├── static/ # CSS, JS, assets
│ └── scripts/ # Frontend logic
├── data/ # Hazard zones, routes, known faces
├── models/ # Pre-trained YOLO weights
└── README.md # Project overview
```

# 🏁 Getting Started with MooVit

To get your MooVit development environment up and running, follow these steps:

---

## 🔹 Clone the Repository
```bash
git clone https://github.com/ShubhangiRoy12/moovit.git
cd moovit
```

---

## 🔹 Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

---

## 🔹 Run the Backend Server
```bash
python app.py
```

---

## 🔹 Open the Frontend

Deploy the `frontend/` directory on Vercel or run a local static server for the frontend.

---

---

## 📈 Adding a New Feature?

1. Fork the repo & create a branch: `feature/your-feature`  
2. Build, test, and document your changes  
3. Push your branch and open a Pull Request  
4. We’ll review your work and help merge it 😊

---

## 🧪 Ideas for Improving MooVit

- ✅ Add multilingual voice support  
- ✅ Integrate GPS-based live routing  
- 🚦 Add heatmap overlays for high-risk zones  
- 📊 Develop an admin dashboard for hazard data  
- 🧠 Improve detection accuracy & add new object classes  

---

## 💡 Want to Learn More?

Want to understand how it all works — like how YOLO detects objects in milliseconds, or how we convert detections into audio alerts?  

Explore the `backend/detection/` folder for model scripts and `frontend/scripts/` for real-time visualization logic.

---

## 🧩 Developer-Friendly Architecture Diagram
```bash
    A[📷 Camera / Uploaded Media] -->|Video Frames| B[🖥 YOLO Object Detection Model]
    B -->|Detections| C[🗣 Voice Alert Engine]
    C -->|Audio Alerts| D[👤 User]

    B -->|Recognized Faces / Objects| E[📍 Routing & Hazard Engine]
    E -->|Optimized Route| F[🚚 Logistics / Driver]
    
    B -->|Hazard Data| G[(🗂 Hazard Database)]
    G -->|Updates| E
```

---

## 🔍 How to Read This

- The camera feed is processed by YOLO for object and face detection.  
- Detected hazards are sent to the Voice Alert Engine for real-time audio warnings.  
- The Routing & Hazard Engine uses hazard data to optimize routes.  
- The Hazard Database stores risky locations for future predictions.  

---
## 💡 Want to Learn More?

Curious about the inner workings — like how **real-time object detection models**, **voice alert systems**, or **route optimization algorithms** tie together?  
Dive into the code and documentation within the [`backend/detection`](backend/detection) and [`frontend/scripts`](frontend/scripts) folders to explore how **MooVit** makes roads safer and smarter!

Thank you for being part of MooVit — helping make roads safer and mobility smarter for everyone!






