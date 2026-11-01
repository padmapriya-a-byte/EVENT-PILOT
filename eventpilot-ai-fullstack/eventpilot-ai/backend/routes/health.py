from flask import Blueprint, jsonify
from config import Config

health_bp = Blueprint("health", __name__)

@health_bp.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "EventPilot AI Backend API",
        "version": "1.0.0",
        "ai_mode": "live_gemini" if Config.is_ai_configured() else "demo_mock_fallback",
        "database_mode": "supabase_connected" if Config.is_db_configured() else "in_memory_fallback"
    }), 200
