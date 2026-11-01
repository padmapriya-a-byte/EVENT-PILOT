from flask import Blueprint, request, jsonify
import uuid
from datetime import datetime

events_bp = Blueprint("events", __name__)

# In-memory store when Supabase credentials are not configured in local dev
MEMORY_EVENTS = {}

@events_bp.route("/api/events", methods=["GET"])
def list_events():
    return jsonify({"status": "success", "data": list(MEMORY_EVENTS.values())}), 200

@events_bp.route("/api/events", methods=["POST"])
def create_event():
    payload = request.get_json(silent=True) or {}
    required = ["title", "event_type", "event_date", "location", "guest_count", "total_budget"]
    missing = [f for f in required if f not in payload]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    event_id = str(uuid.uuid4())
    record = {
        "id": event_id,
        "title": payload["title"],
        "event_type": payload["event_type"],
        "event_date": payload["event_date"],
        "event_time": payload.get("event_time", "18:00"),
        "location": payload["location"],
        "guest_count": int(payload["guest_count"]),
        "total_budget": float(payload["total_budget"]),
        "status": payload.get("status", "Planning"),
        "priorities": payload.get("priorities", []),
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    MEMORY_EVENTS[event_id] = record
    return jsonify({"status": "success", "data": record}), 201

@events_bp.route("/api/events/<event_id>", methods=["PUT", "PATCH"])
def update_event(event_id: str):
    if event_id not in MEMORY_EVENTS:
        return jsonify({"error": "Event not found"}), 404
    payload = request.get_json(silent=True) or {}
    MEMORY_EVENTS[event_id].update(payload)
    return jsonify({"status": "success", "data": MEMORY_EVENTS[event_id]}), 200

@events_bp.route("/api/events/<event_id>", methods=["DELETE"])
def delete_event(event_id: str):
    MEMORY_EVENTS.pop(event_id, None)
    return jsonify({"status": "success", "deleted_id": event_id}), 200
