import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
    PORT = int(os.getenv("PORT", "5000"))
    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "*")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()

    @classmethod
    def is_ai_configured(cls) -> bool:
        return bool(cls.GEMINI_API_KEY and cls.GEMINI_API_KEY != "your_google_gemini_api_key_here")

    @classmethod
    def is_db_configured(cls) -> bool:
        return bool(cls.SUPABASE_URL and cls.SUPABASE_SERVICE_ROLE_KEY)
