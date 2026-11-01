from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.health import health_bp
from routes.events import events_bp
from routes.ai_planner import ai_bp
from routes.exports import exports_bp

def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": Config.FRONTEND_ORIGIN}})

    app.register_blueprint(health_bp)
    app.register_blueprint(events_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(exports_bp)

    @app.errorhandler(404)
    def not_found(err):
        return jsonify({"status": "error", "message": "Endpoint not found"}), 404

    @app.errorhandler(500)
    def internal_error(err):
        return jsonify({"status": "error", "message": "Internal server error"}), 500

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.PORT, debug=(Config.FLASK_ENV == "development"))
