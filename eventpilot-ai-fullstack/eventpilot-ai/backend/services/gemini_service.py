import json
import logging
from typing import Dict, Any, List
from config import Config

logger = logging.getLogger(__name__)

try:
    from google import genai
    from google.genai import types
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False


class GeminiEventService:
    """Reusable AI service for EventPilot AI with structured JSON validation and Mock/Demo fallback."""

    @staticmethod
    def _call_gemini_json(system_instruction: str, user_prompt: str) -> Dict[str, Any]:
        if not Config.is_ai_configured() or not GENAI_AVAILABLE:
            raise RuntimeError("GEMINI_NOT_CONFIGURED")

        client = genai.Client(api_key=Config.GEMINI_API_KEY)
        response = client.models.generate_content(
            model=Config.GEMINI_MODEL,
            contents=user_prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                temperature=0.4,
            ),
        )
        return json.loads(response.text)

    @classmethod
    def generate_event_plan(cls, payload: Dict[str, Any]) -> Dict[str, Any]:
        title = payload.get("title", "Signature Event")
        event_type = payload.get("event_type", "College Fest")
        guest_count = int(payload.get("guest_count", 300))
        budget = float(payload.get("total_budget", 200000))
        location = payload.get("location", "Bengaluru, India")
        priorities = payload.get("priorities", ["Venue & Ambience", "Catering", "Audio/Visual"])

        system_prompt = (
            "You are EventPilot AI, an elite event architect. Return a strict JSON object with keys: "
            "overview (string), timeline (array of {phase, timeframe, key_actions}), "
            "budget_allocation (array of {category, percentage, amount, rationale}), "
            "venue_requirements ({min_capacity, layout_style, power_av_needs, accessibility}), "
            "recommended_vendors (array of {service_type, specification, estimated_cost, booking_lead_time}), "
            "agenda (array of {start_time, end_time, title, description, zone, lead}), "
            "tasks (array of {title, category, due_offset_days, priority, is_milestone}), "
            "risk_considerations (array of {risk, severity, mitigation})."
        )
        user_prompt = (
            f"Generate a complete master event plan for '{title}' ({event_type}) in {location} "
            f"for {guest_count} guests with total budget {budget}. Top priorities: {', '.join(priorities)}."
        )

        try:
            data = cls._call_gemini_json(system_prompt, user_prompt)
            data["is_mock"] = False
            data["mode_label"] = "Live Google Gemini AI"
            return data
        except Exception as exc:
            logger.warning("Falling back to labeled mock plan generation: %s", exc)
            return {
                "is_mock": True,
                "mode_label": "Demo / Mock AI Mode (No API Key Configured)",
                "overview": (
                    f"[Illustrative AI Master Plan] {title} is designed as a high-impact {event_type} "
                    f"for {guest_count} guests in {location}, balancing a total budget of ₹{budget:,.0f} "
                    f"with priority emphasis on {', '.join(priorities)}."
                ),
                "timeline": [
                    {"phase": "Phase 1: Concept & Venue Lock", "timeframe": "8–10 Weeks Out", "key_actions": ["Finalize guest capacity & charter", "Shortlist and inspect 3 venues", "Sign venue contract & pay deposit"]},
                    {"phase": "Phase 2: Vendor & Production", "timeframe": "4–7 Weeks Out", "key_actions": ["Lock catering tasting & menu", "Confirm stage, lighting & AV production", "Launch registration & invitations"]},
                    {"phase": "Phase 3: Run-of-Show & Execution", "timeframe": "1–3 Weeks Out", "key_actions": ["Lock final headcount with caterer", "Distribute technical cue-to-cue sheet", "Conduct on-site soundcheck & rehearsal"]}
                ],
                "budget_allocation": [
                    {"category": "Venue & Rentals", "percentage": 30, "amount": round(budget * 0.30), "rationale": f"Accommodates {guest_count} guests comfortably in {location}"},
                    {"category": "Catering & Hospitality", "percentage": 28, "amount": round(budget * 0.28), "rationale": "Multi-course menu, welcome refreshments, and service staff"},
                    {"category": "Stage, Lighting & AV", "percentage": 18, "amount": round(budget * 0.18), "rationale": "Line-array sound, ambient uplighting, and LED backdrop"},
                    {"category": "Decor & Experiential Design", "percentage": 14, "amount": round(budget * 0.14), "rationale": "Entrance archway, thematic centerpieces, and photo booth"},
                    {"category": "Contingency & Permits", "percentage": 10, "amount": round(budget * 0.10), "rationale": "Buffer for last-minute guest additions and logistics"}
                ],
                "venue_requirements": {
                    "min_capacity": int(guest_count * 1.15),
                    "layout_style": "Auditorium + Networking Courtyard" if guest_count > 250 else "Banquet Cabaret with Central Stage",
                    "power_av_needs": "63A 3-phase power backup, dual projection/LED wall, acoustic dampening",
                    "accessibility": "Step-free ramp access, dedicated registration foyer, valet/bus drop-off bay"
                },
                "recommended_vendors": [
                    {"service_type": "AV & Stage Production", "specification": "Truss lighting, wireless mics, LED wall", "estimated_cost": round(budget * 0.18), "booking_lead_time": "6 weeks prior"},
                    {"service_type": "Culinary & Beverage Service", "specification": f"Buffet & live stations for {guest_count} pax", "estimated_cost": round(budget * 0.28), "booking_lead_time": "5 weeks prior"},
                    {"service_type": "Photography & Aftermovie", "specification": "2 candid photographers + 1 drone/reel cinematographer", "estimated_cost": round(budget * 0.07), "booking_lead_time": "4 weeks prior"}
                ],
                "risk_considerations": [
                    {"risk": "Acoustic spillover or power fluctuation during peak performance", "severity": "High", "mitigation": "Mandate silent DG backup generator and conduct full-load rehearsal 4 hours prior"},
                    {"risk": "Last-minute guest surge exceeding seating plan by 10–15%", "severity": "Medium", "mitigation": "Reserve 15% buffer plates with caterer and modular overflow seating"},
                    {"risk": "Vendor setup bottleneck at loading dock", "severity": "Medium", "mitigation": "Stagger load-in windows by 90 minutes between decor and AV teams"}
                ]
            }

    @classmethod
    def conversational_planner(cls, message: str, history: List[Dict[str, str]], current_event: Dict[str, Any]) -> Dict[str, Any]:
        system_prompt = (
            "You are EventPilot AI, a warm, perceptive senior event architect. "
            "Analyze the user's message and conversation history. If key parameters (event type, guest count, "
            "location, budget, date/timeframe) are missing, ask 2 concise clarifying questions while offering "
            "an initial structured breakdown. Return strict JSON with keys: "
            "reply (string), follow_up_questions (array of strings), extracted_updates (object with optional "
            "title, event_type, guest_count, total_budget, location), and suggested_actions (array of strings)."
        )
        user_prompt = f"Current event context: {json.dumps(current_event)}
History: {json.dumps(history[-5:])}
User: {message}"

        try:
            data = cls._call_gemini_json(system_prompt, user_prompt)
            data["is_mock"] = False
            return data
        except Exception:
            return {
                "is_mock": True,
                "reply": (
                    "I've mapped out an actionable structure based on your brief. To tailor the venue capacity "
                    "and production tiers accurately, I've prepared a recommended budget split and timeline below—"
                    "and included two quick questions so we can lock the final run-of-show."
                ),
                "follow_up_questions": [
                    "Do you prefer an indoor air-conditioned auditorium/ballroom or an open-air lawn setup with weather backup?",
                    "Should we allocate a larger share of the budget to headline entertainment/AV or gourmet catering?"
                ],
                "extracted_updates": {},
                "suggested_actions": [
                    "Apply AI Budget Split to Budget Tracker",
                    "Generate 6-Slot Run-of-Show Agenda",
                    "Add 5 Critical Path Milestones to Tasks"
                ]
            }

    @classmethod
    def optimize_budget(cls, total_budget: float, expenses: List[Dict[str, Any]], priorities: List[str]) -> Dict[str, Any]:
        system_prompt = (
            "You are an AI Event Financial Optimizer. Analyze the total budget, current expense items, and "
            "user priorities. Return strict JSON with keys: summary (string), potential_savings (number), "
            "recommendations (array of {category, current_amount, suggested_amount, delta, reasoning})."
        )
        user_prompt = f"Budget: {total_budget}, Priorities: {priorities}, Expenses: {json.dumps(expenses)}"
        try:
            data = cls._call_gemini_json(system_prompt, user_prompt)
            data["is_mock"] = False
            return data
        except Exception:
            total_est = sum(float(x.get("estimated_cost", 0)) for x in expenses)
            return {
                "is_mock": True,
                "summary": (
                    f"[Illustrative AI Optimization] Analyzed ₹{total_est:,.0f} in planned spend against your "
                    f"₹{total_budget:,.0f} cap while protecting high-priority categories ({', '.join(priorities[:2]) or 'Core Production'})."
                ),
                "potential_savings": round(max(total_est * 0.12, 15000)),
                "recommendations": [
                    {
                        "category": "Decor & Florals",
                        "current_amount": round(total_budget * 0.16),
                        "suggested_amount": round(total_budget * 0.11),
                        "delta": -round(total_budget * 0.05),
                        "reasoning": "Repurpose ceremony/stage floral installations for reception tables and use programmable warm LED uplighting."
                    },
                    {
                        "category": "Print & Signage",
                        "current_amount": round(total_budget * 0.05),
                        "suggested_amount": round(total_budget * 0.02),
                        "delta": -round(total_budget * 0.03),
                        "reasoning": "Replace printed program booklets with QR-code digital passes and dynamic LED screen wayfinding."
                    }
                ]
            }
