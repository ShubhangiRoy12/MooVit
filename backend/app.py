from fastapi import FastAPI

from routes.tracking import router as tracking_router


app = FastAPI(
    title="MooVit Tracking Backend",
    version="0.1.0",
    description="Backend service for shipment tracking workflows in MooVit.",
)

app.include_router(tracking_router, prefix="/api")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
