from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


TrackingStatus = Literal["Pending", "In Transit", "Delayed", "Delivered", "Cancelled"]


class TrackingEvent(BaseModel):
    status: TrackingStatus
    location: str = Field(min_length=1)
    note: str = ""
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class TrackingRecord(BaseModel):
    tracking_id: str = Field(min_length=1)
    customer_name: str = Field(min_length=1)
    origin: str = Field(min_length=1)
    destination: str = Field(min_length=1)
    current_location: str = Field(min_length=1)
    eta: datetime
    status: TrackingStatus
    quantity: int = Field(ge=1)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    history: list[TrackingEvent] = Field(default_factory=list)


class TrackingCreate(BaseModel):
    tracking_id: str = Field(min_length=1)
    customer_name: str = Field(min_length=1)
    origin: str = Field(min_length=1)
    destination: str = Field(min_length=1)
    current_location: str = Field(min_length=1)
    eta: datetime
    status: TrackingStatus = "Pending"
    quantity: int = Field(ge=1, default=1)
    note: str = ""


class TrackingUpdate(BaseModel):
    current_location: str | None = Field(default=None, min_length=1)
    eta: datetime | None = None
    status: TrackingStatus | None = None
    quantity: int | None = Field(default=None, ge=1)
    note: str = ""


class TrackingSummary(BaseModel):
    total: int
    pending: int
    in_transit: int
    delayed: int
    delivered: int
    cancelled: int
