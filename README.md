# MooVit

MooVit is a transport, safety, and accessibility project focused on AI-assisted mobility features such as object detection, route awareness, shipment tools, and public transport support.

Live site: https://moo-vit.vercel.app/

## Overview

- React now powers the main frontend shell for the landing page, dashboard, and feedback flow.
- Legacy static HTML modules are still present and linked from the new dashboard while the migration continues.
- The repository also includes experimental safety, logistics, detection, and assistive feature pages.

## Frontend Migration

Issue `#110` introduces an incremental migration from plain HTML, CSS, and JavaScript to React instead of trying to rewrite every page in one PR.

Current React routes:

- `/` for the landing page
- `/#/dashboard` for the module dashboard
- `/#/feedback` for feedback submission

Compatibility pages:

- `main.html` redirects to the React dashboard route
- `feedback.html` redirects to the React feedback route

## Project Structure

```text
MooVit/
|- .github/                     # GitHub Actions workflows
|- src/
|  |- components/               # Shared React layouts and modal UI
|  |- pages/                    # React routes
|  `- styles/                   # React-scoped styling
|- index.html                   # React app entry point
|- main.html                    # Legacy redirect to dashboard
|- feedback.html                # Legacy redirect to feedback
|- package.json                 # Vite + React scripts and dependencies
|- transport.css                # Legacy transport styling for non-migrated pages
|- Shipments/                   # Static feature module
|- Vehicles/                    # Static feature module
|- Routes/                      # Static feature module
|- Schedule/                    # Static feature module
|- Public transportation/       # Static feature module
`- other feature folders/       # Additional static modules still awaiting migration
```

## Tech Stack

### Frontend

- React
- React Router
- Vite
- HTML, CSS, and JavaScript for legacy pages that have not been migrated yet

### AI and Computer Vision

- YOLO-based object detection
- OpenCV
- TensorFlow / PyTorch

### Platform and Deployment

- Vercel
- GitHub

## Local Development

1. Clone the repository:

```bash
git clone https://github.com/ShubhangiRoy12/MooVit.git
cd MooVit
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm run dev
```

4. Build the frontend for deployment:

```bash
npm run build
```

## Contribution Notes

- New shared frontend work should go into the React app under `src/`.
- Legacy feature pages can still be improved in place until they are migrated.
- See `CONTRIBUTING.md` for contribution workflow and repository standards.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
