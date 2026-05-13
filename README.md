# MooVit

MooVit is a transport, safety, and accessibility project that combines shipment workflows, route planning, public mobility features, and AI-assisted detection experiences.

Live site: https://moo-vit.vercel.app/

## Overview

- Frontend modules cover shipments, vehicles, routes, scheduling, public transit, safety, and assistive experiences.
- A new FastAPI backend slice now powers shipment tracking APIs.
- The tracking backend is intentionally small and focused so the repository has a usable backend foundation instead of only placeholder references.

## Project Structure

```text
MooVit/
|- backend/
|  |- app.py                  # FastAPI entry point
|  |- models.py               # Tracking API models
|  |- storage.py              # JSON-backed persistence layer
|  |- routes/
|  |  `- tracking.py          # Tracking endpoints
|  |- data/
|  |  `- tracking_records.json
|  `- requirements.txt
|- Shipments/                 # Shipment dashboard frontend
|- Vehicles/                  # Fleet frontend
|- Routes/                    # Route management frontend
|- Schedule/                  # Scheduling frontend
|- Public transportation/     # Public transit frontend
|- Chatbot/                   # Assistant frontend
|- index.html                 # Landing page
|- main.html                  # Main dashboard
|- services.html              # Services page
|- script.js                  # Shared frontend interactions
`- transport.css              # Shared transport styling
```

## Tracking Backend

The backend currently provides a first tracking service slice with persistent JSON storage.

Available endpoints:

- `GET /health`
- `GET /api/tracking`
- `GET /api/tracking/summary`
- `GET /api/tracking/{tracking_id}`
- `POST /api/tracking`
- `PATCH /api/tracking/{tracking_id}`
- `DELETE /api/tracking/{tracking_id}`

Example create payload:

```json
{
  "tracking_id": "TRK-1001",
  "customer_name": "Aarav Sharma",
  "origin": "Bhopal",
  "destination": "Indore",
  "current_location": "Bhopal Dispatch Hub",
  "eta": "2026-03-30T10:30:00Z",
  "status": "Pending",
  "quantity": 4,
  "note": "Shipment booked"
}
```

## Local Development

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

The API will run at `http://127.0.0.1:8000`.

### Frontend

Serve the repository with any static server. One simple option is:

```bash
python -m http.server 8080
```

Then open `http://127.0.0.1:8080`.

## Tech Stack

- FastAPI
- Pydantic
- HTML, CSS, JavaScript
- Chart.js
- Bootstrap
- JSON-backed local persistence for the tracking prototype

## Contributing

- Frontend improvements can continue in the existing module folders.
- Backend tracking work should live under `backend/`.
- See `CONTRIBUTING.md` for contribution workflow and standards.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
