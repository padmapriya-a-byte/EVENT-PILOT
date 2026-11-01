import csv
import io
import json
from flask import Blueprint, Response, request, jsonify

exports_bp = Blueprint("exports", __name__)

@exports_bp.route("/api/exports/csv", methods=["POST"])
def export_csv():
    payload = request.get_json(silent=True) or {}
    expenses = payload.get("expenses", [])
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Category", "Item Title", "Vendor", "Priority", "Estimated Cost", "Actual Cost", "Status"])
    for item in expenses:
        writer.writerow([
            item.get("category", ""),
            item.get("title", ""),
            item.get("vendor", ""),
            item.get("priority", ""),
            item.get("estimated", 0),
            item.get("actual", 0),
            item.get("status", "Pending"),
        ])
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment; filename=eventpilot_budget.csv"}
    )

@exports_bp.route("/api/exports/ics", methods=["POST"])
def export_ics():
    payload = request.get_json(silent=True) or {}
    title = payload.get("title", "EventPilot AI Event")
    date_str = (payload.get("event_date", "2026-12-15")).replace("-", "")
    location = payload.get("location", "Venue TBD")
    ics_content = "\r\n".join([
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//EventPilot AI//Event Planner//EN",
        "BEGIN:VEVENT",
        f"SUMMARY:{title}",
        f"DTSTART:{date_str}T100000Z",
        f"DTEND:{date_str}T180000Z",
        f"LOCATION:{location}",
        "DESCRIPTION:Planned and exported via EventPilot AI",
        "END:VEVENT",
        "END:VCALENDAR"
    ])
    return Response(
        ics_content,
        mimetype="text/calendar",
        headers={"Content-Disposition": "attachment; filename=eventpilot_schedule.ics"}
    )
