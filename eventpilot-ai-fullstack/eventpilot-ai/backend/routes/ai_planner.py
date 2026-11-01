from flask import Blueprint, request, jsonify
from services.gemini_service import GeminiEventService

ai_bp = Blueprint("ai_planner", __name__)

@ai_bp.route("/api/ai/plan", methods=["POST"])
def create_ai_plan():
    payload = request.get_json(silent=True) or {}
    if not payload.get("title") or not payload.get("event_type"):
        return jsonify({"error": "Missing required fields: title and event_type"}), 400
    result = GeminiEventService.generate_event_plan(payload)
    return jsonify({"status": "success", "data": result}), 200

@ai_bp.route("/api/ai/chat", methods=["POST"])
def ai_chat():
    payload = request.get_json(silent=True) or {}
    message = (payload.get("message") or "").strip()
    if not message:
        return jsonify({"error": "Message cannot be empty"}), 400
    history = payload.get("history", [])
    current_event = payload.get("current_event", {})
    result = GeminiEventService.conversational_planner(message, history, current_event)
    return jsonify({"status": "success", "data": result}), 200

@ai_bp.route("/api/ai/optimize-budget", methods=["POST"])
def optimize_budget():
    payload = request.get_json(silent=True) or {}
    total_budget = float(payload.get("total_budget", 100000))
    expenses = payload.get("expenses", [])
    priorities = payload.get("priorities", [])
    result = GeminiEventService.optimize_budget(total_budget, expenses, priorities)
    return jsonify({"status": "success", "data": result}), 200
