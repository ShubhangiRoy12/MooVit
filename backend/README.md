# Tracking Backend

This backend provides a first tracking service slice for MooVit.

## Run locally

```bash
pip install -r requirements.txt
uvicorn app:app --reload
```

## Endpoints

- `GET /health`
- `GET /api/tracking`
- `GET /api/tracking/summary`
- `GET /api/tracking/{tracking_id}`
- `POST /api/tracking`
- `PATCH /api/tracking/{tracking_id}`
- `DELETE /api/tracking/{tracking_id}`
