from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, HTTPException, Query, status

from models import (
    TrackingCreate,
    TrackingEvent,
    TrackingRecord,
    TrackingSummary,
    TrackingUpdate,
)
from storage import TrackingStore


router = APIRouter(prefix="/tracking", tags=["tracking"])
store = TrackingStore()


@router.get("", response_model=list[TrackingRecord])
def list_tracking_records(status_filter: str | None = Query(default=None, alias="status")) -> list[TrackingRecord]:
    records = store.list_records()
    if status_filter:
        return [record for record in records if record.status.lower() == status_filter.lower()]
    return records


@router.get("/summary", response_model=TrackingSummary)
def get_tracking_summary() -> TrackingSummary:
    records = store.list_records()
    counts = {
        "Pending": 0,
        "In Transit": 0,
        "Delayed": 0,
        "Delivered": 0,
        "Cancelled": 0,
    }

    for record in records:
        counts[record.status] += 1

    return TrackingSummary(
        total=len(records),
        pending=counts["Pending"],
        in_transit=counts["In Transit"],
        delayed=counts["Delayed"],
        delivered=counts["Delivered"],
        cancelled=counts["Cancelled"],
    )


@router.get("/{tracking_id}", response_model=TrackingRecord)
def get_tracking_record(tracking_id: str) -> TrackingRecord:
    record = store.get_record(tracking_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tracking record not found")
    return record


@router.post("", response_model=TrackingRecord, status_code=status.HTTP_201_CREATED)
def create_tracking_record(payload: TrackingCreate) -> TrackingRecord:
    if store.get_record(payload.tracking_id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Tracking ID already exists")

    record = TrackingRecord(
        tracking_id=payload.tracking_id,
        customer_name=payload.customer_name,
        origin=payload.origin,
        destination=payload.destination,
        current_location=payload.current_location,
        eta=payload.eta,
        status=payload.status,
        quantity=payload.quantity,
        history=[
            TrackingEvent(
                status=payload.status,
                location=payload.current_location,
                note=payload.note or "Tracking record created",
            )
        ],
    )
    return store.save_record(record)


@router.patch("/{tracking_id}", response_model=TrackingRecord)
def update_tracking_record(tracking_id: str, payload: TrackingUpdate) -> TrackingRecord:
    record = store.get_record(tracking_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tracking record not found")

    changed = False

    if payload.current_location is not None:
        record.current_location = payload.current_location
        changed = True
    if payload.eta is not None:
        record.eta = payload.eta
        changed = True
    if payload.status is not None:
        record.status = payload.status
        changed = True
    if payload.quantity is not None:
        record.quantity = payload.quantity
        changed = True

    if not changed:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No changes provided")

    record.updated_at = datetime.utcnow()
    record.history.append(
        TrackingEvent(
            status=record.status,
            location=record.current_location,
            note=payload.note or "Tracking record updated",
        )
    )
    return store.save_record(record)


@router.delete("/{tracking_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tracking_record(tracking_id: str) -> None:
    deleted = store.delete_record(tracking_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tracking record not found")
