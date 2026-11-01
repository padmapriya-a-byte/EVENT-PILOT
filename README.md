# EventPilot AI — Intelligent Full-Stack Event Planning Platform

&lt;div align=&quot;center&quot;&gt;


[](https://nextjs.org/)
[](https://flask.palletsprojects.com/)
[](https://ai.google.dev/)
[](https://supabase.com/)
[License: MIT](https://www.google.com/search?q=LICENSE)

**Your Event. Your Vision. Perfectly Planned.**

*An intelligent, full-stack event architecture platform transforming concepts into actionable master blueprints with dynamic budget optimization, illustrative venue matching, minute-by-minute run-of-show agendas, and multi-format exports.*

[Key Features](#-key-features) • [System Architecture](#-system-architecture) • [Quickstart Guide](#-quickstart-guide) • [Supabase Database & RLS](#-database-schema--rls-policies) • [REST API Reference](#-backend-rest-api-reference) • [Deployment](#-production-deployment)

&lt;/div&gt;

---

## 🌟 Executive Overview

**EventPilot AI** bridges high-level creative ideation and granular on-the-ground operational execution for multi-scale events:

- 💍 **Weddings & Receptions**: Courtyard ambience, floral architecture, tiered catering, and guest logistics.
- 🎓 **College & Cultural Fests**: Main-stage concert AV, QR delegate accreditation, band riders, and student council budgets.
- 🚀 **Corporate Summits & Product Launches**: Pillarless ballrooms, curved LED walls, dedicated 1Gbps fiber failovers, and press lounges.
- 🎉 **Birthdays & Anniversaries**: Thematic decor styling, live entertainment, and milestone toasts.
- 🎙️ **Conferences & Meetups**: Multi-track agendas, speaker management, and networking breakouts.

The application combines a modern Next.js 14 / Tailwind / shadcn frontend, a robust Python Flask REST backend, Google Gemini AI (`gemini-2.5-flash`) with strict JSON schema validation, and Supabase PostgreSQL with Row Level Security (RLS).

---

## 🚀 Key Features

| Capability | Technical Implementation | Highlights |
| :--- | :--- | :--- |
| **Conversational AI Planner** | Google Gemini API + Structured JSON schema | Natural language prompt understanding, automated parameter extraction, missing-constraint follow-up prompts, and 1-click workspace application. |
| **Multi-Step Event Wizard** | React Hook Form + Zod + Autosave | 4-step guided configuration (Type, Schedule, Preferences, Budget/Priorities) + interactive review step before creation. |
| **AI Budget Studio** | Recharts (Bar & Pie) + AI Optimizer | Live estimated vs. committed spend tracking, categorized breakdowns, and a 1-click AI optimizer that trims costs while safeguarding core priorities. |
| **Venue Matcher** | Transparent algorithmic scoring engine | Illustrative contender comparisons evaluating capacity fit, budget ratios, amenities, and trade-offs without fake live claims. |
| **Run-of-Show & Milestones** | Time-slot scheduler + Task checklist | Minute-by-minute event day agenda paired with deadline-driven tasks, milestone stars, and progress percentages. |
| **Multi-Format Exports** | Native browser streaming & Blob generation | 1-click exports for printable PDF dossiers, CSV itemized budgets, JSON data packages, and `.ics` calendar schedules. |
| **Enterprise Security** | Supabase Auth + PostgreSQL RLS | Server-side Gemini API key isolation, client-safe anonymous keys, and strict Row Level Security ensuring user data privacy. |

---

## 🏗️ System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                       CLIENT LAYER (Vercel)                            │
│  Next.js 14 (App Router) • TypeScript • React 18 • Tailwind CSS        │
│  shadcn/ui • Lucide Icons • Recharts • React Hook Form + Zod           │
└───────────────────▲────────────────────────────────▲───────────────────┘
                    │ HTTPS / JSON                   │ Supabase Auth & RLS
                    ▼                                ▼
┌───────────────────────────────────────┐  ┌─────────────────────────────┐
│       BACKEND API (Render)            │  │     DATABASE & AUTH         │
│  Python 3.11 • Flask REST API         │  │     (Supabase Cloud)        │
│  Gunicorn WSGI • Pydantic             │  │  PostgreSQL 15 Engine       │
│                                       │  │  Row Level Security (RLS)   │
│  ┌─────────────────────────────────┐  │  │  Automated Profiles Trigger │
│  │     Google Gemini AI Engine     │  │  │  Cascade Foreign Keys       │
│  │     Model: gemini-2.5-flash     │  │  └─────────────────────────────┘
│  │     Structured JSON Schema      │  │
│  │     Automatic Mock Fallback     │  │
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```text
eventpilot-ai/
├── README.md                          # Master documentation & setup guide
├── render.yaml                        # Render deployment blueprint for Flask API
├── supabase/
│   └── schema.sql                     # Complete PostgreSQL DDL, triggers, indexes & RLS policies
├── backend/
│   ├── .env.example                   # Backend environment variables template
│   ├── requirements.txt               # Python production dependencies
│   ├── app.py                         # Application factory, CORS, and blueprint registration
│   ├── config.py                      # Strongly-typed environment configuration
│   ├── services/
│   │   ├── gemini_service.py          # Gemini AI client, structured JSON parser & Mock fallback
│   │   ├── supabase_service.py        # Database client wrapper
│   │   └── export_service.py          # CSV and ICS export generators
│   └── routes/
│       ├── health.py                  # GET /api/health (service telemetry)
│       ├── events.py                  # CRUD /api/events
│       ├── ai_planner.py              # POST /api/ai/plan, /api/ai/chat, /api/ai/optimize-budget
│       └── exports.py                 # File export streaming endpoints
└── frontend/
    ├── .env.example                   # Frontend environment variables template
    ├── package.json                   # Next.js scripts & npm dependencies
    ├── tsconfig.json                  # Strict TypeScript configuration
    ├── tailwind.config.ts             # Custom luxury design system palette
    ├── vercel.json                    # Vercel deployment configuration
    └── src/
        ├── lib/
        │   ├── supabase.ts            # Supabase client singleton
        │   ├── api.ts                 # Axios/Fetch API client with fallback handling
        │   └── validations.ts         # Zod schemas for forms and event models
        ├── types/
        │   └── event.ts               # Shared TypeScript domain interfaces
        └── app/
            ├── layout.tsx             # Root typography & ambient styling
            └── page.tsx               # Complete single-page interactive application
```

---

## ⚡ Quickstart Guide

### 1. Prerequisites
- **Node.js**: v18.17.0 or higher
- **Python**: v3.10 or higher
- **Supabase Account**: [supabase.com](https://supabase.com)
- **Google AI Studio Key**: [aistudio.google.com](https://aistudio.google.com/)

---

### 2. Backend Setup (Flask + Google Gemini)

```bash
# Navigate to the backend directory
cd backend

# Create and activate a Python virtual environment
python3 -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate

# Install required dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
```

Edit `backend/.env` with your credentials:
```ini
FLASK_ENV=development
PORT=5000
FRONTEND_ORIGIN=http://localhost:3000

# Google Gemini API Key (Server-Side Only — Never expose in client code)
GEMINI_API_KEY=AIzaSyYourGeminiApiKeyHere
GEMINI_MODEL=gemini-2.5-flash

# Supabase Credentials (Service Role Key for admin backend access)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJh...your-service-role-key
```

Run the development API server:
```bash
flask --app app run --port 5000 --debug
```

Test the health check endpoint:
```bash
curl http://localhost:5000/api/health
```

---

### 3. Frontend Setup (Next.js 14 + TypeScript)

```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install npm packages
npm install

# Configure frontend environment variables
cp .env.example .env.local
```

Edit `frontend/.env.local`:
```ini
# Flask REST API URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Supabase Public Anonymous Keys (Safe for browser client)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...your-anon-key
```

Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema & RLS Policies

Execute the full schema located at `supabase/schema.sql` in your Supabase SQL Editor:

```sql
-- 1. Profiles Table (Synced automatically from auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    organization TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Events Table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('Wedding', 'Birthday', 'College Fest', 'Conference', 'Corporate', 'Other')),
    event_date DATE NOT NULL,
    event_time TIME NOT NULL DEFAULT '18:00',
    location TEXT NOT NULL,
    guest_count INTEGER NOT NULL CHECK (guest_count > 0),
    total_budget NUMERIC(12, 2) NOT NULL CHECK (total_budget >= 0),
    status TEXT NOT NULL DEFAULT 'Planning' CHECK (status IN ('Idea', 'Planning', 'Confirmed', 'In Progress', 'Completed')),
    priorities TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS) Enforcement
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users CRUD own events" ON public.events FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
```

*The complete `schema.sql` also includes `event_plans`, `expenses`, `venues`, `agenda_items`, and `tasks` tables with performance indexes and cascading foreign keys.*

---

## 🔌 Backend REST API Reference

| Endpoint | Method | Payload / Parameters | Response Description |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | None | Returns backend status, Gemini connection mode, and DB mode. |
| `/api/events` | `GET` | Authorization Bearer Token | Returns array of user's saved events. |
| `/api/events` | `POST` | `{ title, event_type, date, location, guest_count, total_budget }` | Creates a new validated event record. |
| `/api/ai/plan` | `POST` | `{ title, event_type, location, guest_count, total_budget, priorities }` | Generates a complete phased timeline, budget split, venue specs & risk matrix. |
| `/api/ai/chat` | `POST` | `{ message, history, current_event }` | Returns conversational AI guidance, follow-up questions, and structured proposals. |
| `/api/ai/optimize-budget` | `POST` | `{ total_budget, expenses, priorities }` | Analyzes expenses against priorities and returns realistic savings adjustments. |
| `/api/exports/csv` | `POST` | `{ expenses: [...] }` | Generates downloadable budget CSV file stream. |
| `/api/exports/ics` | `POST` | `{ title, event_date, location, agenda: [...] }` | Streams an `.ics` iCalendar schedule file. |

---

## ☁️ Production Deployment

### 1. Backend on Render

1. Log in to [Render](https://render.com) and click **New + -> Web Service**.
2. Connect your GitHub repository.
3. Configure service parameters:
   - **Root Directory**: `backend`
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 4 --timeout 120`
   - **Health Check Path**: `/api/health`
4. Add Environment Variables:
   - `GEMINI_API_KEY`: Google Gemini API Key
   - `SUPABASE_URL`: Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key
   - `FRONTEND_ORIGIN`: Your deployed Vercel domain (e.g. `https://eventpilot-ai.vercel.app`)

---

### 2. Frontend on Vercel

1. Log in to [Vercel](https://vercel.com) and click **Add New -> Project**.
2. Select your repository and set **Root Directory** to `frontend`.
3. Framework Preset: **Next.js**.
4. Configure Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your deployed Render backend URL (e.g. `https://eventpilot-api.onrender.com`)
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Public Key
5. Click **Deploy**.

---

## 🛡️ Security & Privacy Architecture

- **No Hardcoded Secrets**: Client-side code never receives raw Gemini API credentials or Supabase service keys.
- **Row Level Security (RLS)**: PostgreSQL validates all queries directly against Supabase JWT claims (`auth.uid()`).
- **Input Sanitization**: All incoming wizard and API payloads are validated against strict Zod and Pydantic schemas.
- **Safe Fallback**: When Gemini credentials are missing in local dev, EventPilot AI enters an **Interactive Demo AI Mode**, clearly labeling illustrative outputs.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
