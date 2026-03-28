# MooVit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

MooVit is an AI-powered real-time object detection and voice-assist system designed to improve road safety and mobility, especially for visually impaired users, logistics operations, and vehicle drivers. It detects people, vehicles, traffic signals, animals, dangerous objects, and known faces, then provides voice alerts for navigation, awareness, and route support.

Live site: <https://moo-vit.vercel.app/>

## Web Application

The MooVit web interface includes:

- Real-time camera feed for object detection
- Image and video upload for instant analysis
- Bounding boxes and voice alerts for detected objects
- Responsive behavior for desktop and mobile
- Shipment route scheduling and alert-based safety recommendations
- Safety awareness prompts for road signs, traffic zones, and conditions

## Features

- Detects vehicles, people, signals, and sharp objects
- Recognizes known faces to support visually impaired users
- Provides real-time voice alerts from camera or video input
- Includes shipment scheduling and route planning modules
- Highlights traffic signals, signs, and crossing points
- Supports uploaded media as well as live camera input

## Project Structure

```text
MooVit/
├── .github/                    # GitHub workflows and repo automation
├── Chatbot/                    # Chatbot module
├── feedback/                   # Feedback page assets
├── FoodStall_and_hotels/       # Food and hotel-related UI
├── live-detection/             # Live detection UI and assets
├── Public transportation/      # Public transportation module
├── Routes/                     # Route planning module
├── Safety and awareness/       # Safety awareness module
├── Schedule/                   # Scheduling module
├── sharingcab/                 # Cab sharing module
├── sharp-detection/            # Sharp object detection module
├── Shipments/                  # Shipment-related pages
├── Vehicles/                   # Vehicle-related module
├── index.html                  # Landing page
├── script.js                   # Shared frontend logic
├── styles.css                  # Shared styles
└── transport.css               # Main transport UI styles
```

## Tech Stack

### Computer Vision and AI

- YOLO-based object detection
- OpenCV for image and video processing
- TensorFlow or PyTorch for model training and inference

### Web and Voice Interaction

- HTML, CSS, and JavaScript
- Python with Flask or FastAPI
- Canvas API for drawing detection boxes
- MediaDevices API for webcam access
- Text-to-speech integrations for voice alerts

### Logistics and Route Modules

- JSON-based scheduling flows
- Optional map and route integrations
- SQLite or JSON-backed data storage

### Deployment and Tooling

- Vercel for frontend deployment
- GitHub for version control and collaboration
- WebSocket or HTTP-based communication

## Installation

1. Clone the repository.

```bash
git clone https://github.com/ShubhangiRoy12/MooVit.git
cd MooVit
```

2. Install backend dependencies if you are working on the backend.

```bash
cd backend
pip install -r requirements.txt
```

3. Start the backend server.

```bash
python app.py
```

4. Serve the frontend locally with any static server, or deploy it on Vercel.

## Use Cases

- Assist visually impaired users with voice-based object alerts
- Help logistics teams plan safer and more efficient routes
- Offer drivers route awareness and obstacle warnings
- Provide traffic and safety prompts in high-risk zones
- Enable face tracking to follow companions in crowded spaces

## Future Plans

- Add multilingual voice support
- Enable GPS-based live routing for shipments
- Introduce risk-zone heatmaps
- Expand the admin dashboard
- Offer a public API for integrations

## Contributing

Contributions are welcome across:

- Detection accuracy improvements
- Shipment scheduling enhancements
- UI and accessibility improvements
- Documentation and contributor experience

Basic flow:

1. Fork the repository
2. Create a branch
3. Make your changes
4. Open a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contributor guidelines and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for community expectations.

## Contributors

- **[Shubhangi Roy](https://github.com/ShubhangiRoy12)** - Project Lead and Machine Learning Engineer
- **[Om Roy](https://github.com/omroy07)** - Web Developer and Machine Learning Engineer

## License

This project is licensed under the [MIT License](./LICENSE).
