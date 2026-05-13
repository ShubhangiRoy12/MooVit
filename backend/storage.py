from __future__ import annotations

import json
from pathlib import Path

from models import TrackingRecord


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_FILE = DATA_DIR / "tracking_records.json"


class TrackingStore:
    def __init__(self, data_file: Path = DATA_FILE) -> None:
        self.data_file = data_file
        self.data_file.parent.mkdir(parents=True, exist_ok=True)
        if not self.data_file.exists():
            self._write([])

    def list_records(self) -> list[TrackingRecord]:
        raw_records = self._read()
        return [TrackingRecord.model_validate(item) for item in raw_records]

    def get_record(self, tracking_id: str) -> TrackingRecord | None:
        for record in self.list_records():
            if record.tracking_id == tracking_id:
                return record
        return None

    def save_record(self, record: TrackingRecord) -> TrackingRecord:
        records = self.list_records()
        updated = False

        for index, existing in enumerate(records):
            if existing.tracking_id == record.tracking_id:
                records[index] = record
                updated = True
                break

        if not updated:
            records.append(record)

        self._write([item.model_dump(mode="json") for item in records])
        return record

    def delete_record(self, tracking_id: str) -> bool:
        records = self.list_records()
        remaining = [record for record in records if record.tracking_id != tracking_id]
        deleted = len(remaining) != len(records)
        if deleted:
            self._write([item.model_dump(mode="json") for item in remaining])
        return deleted

    def _read(self) -> list[dict]:
        with self.data_file.open("r", encoding="utf-8") as file:
            return json.load(file)

    def _write(self, records: list[dict]) -> None:
        with self.data_file.open("w", encoding="utf-8") as file:
            json.dump(records, file, indent=2)
