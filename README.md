# MooVit

MooVit is an AI-powered real-time object detection and voice-assist system designed to improve road safety and mobility—especially for visually impaired users, logistics operations, and vehicle drivers. It detects people, vehicles, traffic signals, animals, and dangerous objects, providing voice alerts for real-time navigation, shipment scheduling, route optimization, and road safety awareness.

🔗 Live site: https://moo-vit.vercel.app/

---

## 🌐 Web Application

The MooVit web interface is simple, accessible, and packed with functionality:

- Real-time camera feed for object detection
- Bounding boxes + voice alerts for detected objects
- Responsive interface for desktop and mobile
- Shipment route scheduling and safety recommendations
- Safety awareness prompts for road signs and traffic zones

Try it now → https://moo-vit.vercel.app/

---

## ✨ Features

- Detects vehicles, people, signals, and sharp objects
- Real-time voice alerts based on camera/video input
- Vehicle shipment schedule module
- Route safety planner
- Traffic awareness highlights
- AI Assistant chatbot for 24/7 support
- Cab sharing network
- Hotel and food services management
- Public transit hub

---

## 📁 Project Structure

```
MooVit/
├── main.html                        # Main dashboard (entry point)
├── index.html                       # Landing / Login page
├── services.html                    # Services overview page
├── about.html                       # About page
├── contact.html                     # Contact page
├── favicon.png                      # Site favicon
│
├── Chatbot/                         # AI Assistant chatbot
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── Shipments/                       # Shipment management
│   └── shipments.html
│
├── Vehicles/                        # Fleet management
│   └── vechicle.html
│
├── Routes/                          # Route optimization
│   └── route.html
│
├── Schedule/                        # Smart scheduling
│   └── schedule.html
│
├── Safety and awareness/            # Road safety awareness
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── sharp-detection/                 # Sharp object detection
│   └── sharp-detection.html
│
├── live-detection/                  # Live object detection
│   └── live-detection.html
│
├── Public transportation/           # Public transit hub
│   └── index.html
│
├── sharingcab/                      # Cab sharing network
│   └── sharingcab.html
│
├── FoodStall_and_hotels/            # Hotel & food services
│   └── index.html
│
└── feedback/                        # Feedback & support
    └── feedback.html
```

---

## 🛠 Tech Stack

### Computer Vision & AI
- YOLOv8 – object detection
- OpenCV – image and video stream processing
- TensorFlow / PyTorch – model training and inference

### Web & Voice Interaction
- HTML, CSS, JavaScript – frontend interface
- Canvas API – draw detection boxes in real-time
- MediaDevices API – webcam access on web
- Web Speech API – text-to-speech voice alerts
- Tailwind CSS – utility-first styling

### Deployment & Tools
- Vercel – frontend deployment
- GitHub – version control

---

## 📦 Setup & Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge)
- Git installed on your machine

### Steps

1. Fork this repository on GitHub

2. Clone your fork:
```bash
git clone https://github.com/YOUR-USERNAME/MooVit.git
cd MooVit
```

3. Open the project in VS Code:
```bash
code .
```

4. Run locally using Live Server:
   - Install the **Live Server** extension in VS Code
   - Right-click `index.html` and select **"Open with Live Server"**
   - The site opens at `http://127.0.0.1:5500`

5. Or simply open `index.html` directly in your browser.

> **Note:** There is currently no backend server required to run the frontend. All features run client-side in the browser.

---

## 📋 Use Cases

- Assist visually impaired users with voice-based object alerts
- Help logistics teams plan safe and efficient routes
- Offer vehicle drivers route awareness and obstacle warnings
- Provide safety prompts in traffic-heavy or high-risk zones

---

## 🚧 Future Plans

- Add multilingual voice support
- GPS-based live routing for shipment vehicles
- Python + Flask backend for full AI detection pipeline
- Admin dashboard to view and edit shipment schedules
- Public API for integration with logistics and assistive apps

---

## 🤝 Contributing

We welcome contributions! You can help with:
- Improving detection accuracy
- Expanding shipment scheduling logic
- UI/UX design improvements
- Documentation improvements
- Bug fixes and accessibility enhancements

### Contribution Steps:
1. Fork this repo
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit: `git commit -m "type: description"`
5. Push: `git push origin feature/your-feature-name`
6. Open a Pull Request

---

## 👥 Contributors

- **[Shubhangi Roy](https://github.com/ShubhangiRoy12)** – Project Lead & ML Engineer
- **[Om Roy](https://github.com/omroy07)** – Web Developer & ML Engineer

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.