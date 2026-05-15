# MooVit

MooVit is a road safety and mobility assistant focused on real-time awareness, accessibility, logistics support, and route-related tooling. The project combines a frontend-first web experience with feature modules for detection, safety guidance, transport workflows, and shipment planning.

Live site: <https://moo-vit.vercel.app/>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Capabilities](#core-capabilities)
- [Architecture Overview](#architecture-overview)
- [Project Screenshots](#project-screenshots)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Installation and Local Setup](#installation-and-local-setup)
- [Usage and Navigation](#usage-and-navigation)
- [Use Cases](#use-cases)
- [Future Plans](#future-plans)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

---

## Project Overview

MooVit is designed to improve road awareness and transport usability for a range of users, including:

- Visually impaired users who benefit from object awareness and voice-assisted guidance
- Drivers and logistics operators who need route, vehicle, or shipment-related visibility
- Contributors exploring accessibility, safety, and mobility-focused web features

The repository currently functions as a frontend-first codebase with multiple feature-specific pages and modules. The broader project vision also references AI-assisted detection and backend-supported flows, which are represented in the documentation and feature direction.

---

## Core Capabilities

### Detection and Awareness

- Real-time object-awareness workflows
- Sharp-object and live-detection feature areas
- Traffic and route-awareness oriented UI

### Voice and Accessibility

- Voice-assist oriented user flows
- Safety-focused information surfaces
- Accessible mobility support use cases

### Logistics and Transport

- Shipment and scheduling modules
- Route planning and public transportation pages
- Vehicle and cab-sharing related interfaces

### Contributor-Friendly Frontend

- Static HTML, CSS, and JavaScript pages
- Feature folders organized by domain
- GitHub templates for issues and pull requests

---

## Architecture Overview

The current repository is best understood as a modular frontend application with domain-based feature folders.

### 1. Presentation Layer

- Root HTML pages such as `index.html`, `about.html`, `services.html`, and `contact.html`
- Shared styling through `styles.css` and `transport.css`
- Shared interaction logic in scripts like `script.js` and `cursor.js`

### 2. Feature Modules

- Directory-based feature areas such as `Routes/`, `Vehicles/`, `Shipments/`, `Schedule/`, and `Safety and awareness/`
- Each module contains its own UI assets, scripts, or page-specific logic where needed

### 3. Experience Flow

Typical user flow in the current project looks like:

1. Enter through the main landing page
2. Navigate into a specific domain such as routes, vehicles, safety, feedback, or shipment tools
3. Interact with page-level JavaScript and UI components for that feature
4. Use the project as a frontend showcase for mobility, awareness, and logistics-related capabilities

### 4. AI and Backend Direction

Project documentation references AI detection, voice assistance, and backend-supported workflows. In the current repository, these are primarily represented through:

- Frontend modules and demos
- Documentation and roadmap references
- Feature-specific structure prepared for future expansion

---

## Project Screenshots

### Home / Landing Page
![Home Page](services_section.png.png)

### Services Section
![Services Section](home_hero.png.png)

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

### Frontend

- HTML
- CSS
- JavaScript

### UX and Browser APIs

- Responsive page design
- Canvas-oriented visual interactions
- MediaDevices-based browser integrations where applicable

### AI and Detection Direction

- YOLO-based object detection references
- OpenCV-based computer vision references
- TensorFlow / PyTorch documentation-level integration direction

### Tooling and Delivery

- GitHub for collaboration
- Vercel for deployment
- Markdown-based documentation and contributor templates

---

## Installation and Local Setup

### Option 1: Frontend-only local preview

1. Clone the repository:

```bash
git clone https://github.com/ShubhangiRoy12/MooVit.git
cd MooVit
```

2. Serve the repository locally with any static server:

```bash
python -m http.server 8000
```

3. Open the local URL in your browser and navigate through the pages you want to test.

### Option 2: Backend-related experimentation

Some project documentation references backend setup. If you are working with backend code that exists outside the current root layout or in future branches, the intended flow is:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

If a `backend/` directory is not present in the current checkout, treat the repository as frontend-first and use the static-server workflow above.

---

## Usage and Navigation

After opening the app locally or on the deployed site, contributors and users can explore:

- The landing page for project overview and service entry points
- Services and route-related pages for transport-focused workflows
- Safety and awareness sections for accessibility and road-safety use cases
- Vehicles, shipments, and scheduling modules for logistics-oriented demos
- Feedback and informational pages for project interaction and contributor discovery

---

## Use Cases

- Assist visually impaired users with awareness-oriented guidance
- Help logistics teams explore shipment and route planning flows
- Offer drivers route awareness and obstacle-related context
- Demonstrate accessibility-centered mobility experiences
- Provide a modular frontend base for future AI-backed transport features

---

## Future Plans

- Add multilingual voice support
- Expand live routing and transport intelligence features
- Add richer risk-zone and safety overlays
- Improve admin and dashboard capabilities
- Integrate more backend- and model-driven workflows over time

---

## Contributing

Contributions are welcome across:

- Accessibility improvements
- Frontend polish and responsiveness fixes
- Documentation and onboarding improvements
- Mobility, safety, and logistics feature enhancements
- JavaScript bug fixes and UX refinements

Recommended contribution flow:

1. Fork the repository
2. Create a focused branch
3. Make a scoped change
4. Test the relevant pages locally
5. Open a pull request with the related issue linked

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contributor workflow details.

---

## Contributors

- **[Shubhangi Roy](https://github.com/ShubhangiRoy12)** - Project Lead and Machine Learning Engineer
- **[Om Roy](https://github.com/omroy07)** - Web Developer and Machine Learning Engineer

---

## License

This project is licensed under the [MIT License](./LICENSE).
