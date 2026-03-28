# MooVit

MooVit is an AI-powered real-time object detection and voice-assist system designed to improve road safety and mobility, especially for visually impaired users, logistics operations, and vehicle drivers. It detects people, vehicles, traffic signals, animals, dangerous objects, and known faces, then provides voice alerts for navigation, shipment support, and road awareness.

Live site: <https://moo-vit.vercel.app/>

---

## Table of Contents

- [Web Application](#web-application)
- [Project Screenshots](#project-screenshots)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Use Cases](#use-cases)
- [Future Plans](#future-plans)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

---

## Web Application

The MooVit web interface is simple, accessible, and packed with functionality:

- Access real-time camera feed for object detection
- Upload image or video files for instant analysis
- Bounding boxes and voice alerts for detected objects and threats
- Responsive interface that works on both desktop and mobile
- Shipment route scheduling and alert-based safety recommendations
- Safety awareness prompts for road signs, traffic zones, and conditions

Try it now: <https://moo-vit.vercel.app/>

---

## Project Screenshots

### Home / Landing Page
![Home Page](services_section.png.png)

### Services Section
![Services Section](home_hero.png.png)

---

## Features

- Detects vehicles, people, signals, and sharp objects
- Recognizes known faces to help visually impaired users follow familiar people
- Provides real-time voice alerts based on camera or video input
- Includes shipment scheduling and route timeline support
- Supports route safety planning and traffic awareness
- Works with uploaded images as well as live camera input

---

## Folder Structure

```text
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

## Tech Stack

### Computer Vision and AI

- YOLOv8 / YOLOv11 / YOLOv12 for object detection
- OpenCV for image and video stream processing
- TensorFlow / PyTorch for training and inference

### Web and Voice Interaction

- HTML, CSS, and JavaScript for the frontend interface
- Python with Flask / FastAPI for backend services referenced by the project docs
- Canvas API for drawing detection boxes in real time
- MediaDevices API for webcam access
- Text-to-speech integrations for voice alerts

### Logistics and Route Modules

- Custom scheduling flows for shipment planning
- GeoJSON / Google Maps API integrations when applicable
- SQLite / JSON for storing schedules and hazard-zone data

### Deployment and Tools

- Vercel for frontend deployment
- GitHub for version control
- WebSocket / HTTP Fetch for real-time communication

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ShubhangiRoy12/MooVit.git
cd MooVit
```

2. If you are working on backend functionality, install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Start the backend server when applicable:

```bash
python app.py
```

4. For frontend work, serve the repository with any static server or deploy it on Vercel.

---

## Use Cases

- Assist visually impaired users with voice-based object alerts
- Help logistics teams plan safe and efficient routes
- Offer vehicle drivers route awareness and obstacle warnings
- Provide safety prompts in traffic-heavy or high-risk zones
- Enable face tracking to follow companions in crowded areas

---

## Future Plans

- Add multilingual voice support
- Add GPS-based live routing for shipment vehicles
- Introduce heatmap overlays for high-risk zones
- Expand the admin dashboard for shipment schedules
- Offer a public API for logistics and assistive integrations

---

## Contributing

Contributions are welcome in areas such as:

- Detection accuracy improvements
- Shipment scheduling enhancements
- UI/UX design improvements
- Accessibility, localization, and documentation

Basic contribution flow:

1. Fork the repository
2. Create a branch
3. Commit your changes
4. Push and open a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contributor workflow details.

---

## Contributors

- **[Shubhangi Roy](https://github.com/ShubhangiRoy12)** - Project Lead and Machine Learning Engineer
- **[Om Roy](https://github.com/omroy07)** - Web Developer and Machine Learning Engineer

---

## License

This project is licensed under the [MIT License](./LICENSE).
