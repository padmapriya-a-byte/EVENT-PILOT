# EventPilot AI — Intelligent Full-Stack Event Planning Platform

**Your Event. Your Vision. Perfectly Planned.**

EventPilot AI is a production-ready, full-stack SaaS application that transforms event concepts into complete, actionable master plans using **Google Gemini AI**, **Next.js (TypeScript)**, **Python Flask**, and **Supabase (PostgreSQL + Auth + RLS)**.

---

## 1. Architecture & Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React 18, Tailwind CSS, shadcn/ui components, Lucide Icons, Recharts, React Hook Form + Zod
- **Backend**: Python 3.11+, Flask 3.0 REST API, Flask-CORS, Gunicorn
- **AI Engine**: Google Gemini API (`google-genai` / `gemini-2.5-flash`) with structured JSON schema validation and automatic fallback to clearly labeled **Interactive Demo/Mock Mode** when credentials are omitted
- **Database & Auth**: Supabase (PostgreSQL with Row Level Security, Auth, Foreign Keys, and Indexes)
- **Deployment**: Vercel (Frontend) + Render (Backend) + Supabase Cloud (Database/Auth)

---

## 2. Project Folder Structure

```text
eventpilot-ai/
├── README.md
├── render.yaml                      # Render Blueprint for Flask Backend deployment
├── supabase/
│   └── schema.sql                   # Complete PostgreSQL schema, indexes, triggers & RLS policies
├── backend/
│   ├── .env.example                 # Backend environment variables template
│   ├── requirements.txt             # Python dependencies (Flask, google-genai, supabase, gunicorn)
│   ├── app.py                       # Flask application factory, CORS, and route registration
│   ├── config.py                    # Environment configuration & validation
│   ├── services/
│   │   ├── gemini_service.py        # Reusable Gemini AI functions + structured JSON + mock fallback
│   │   ├── supabase_service.py      # Supabase database client & CRUD helpers
│   │   └── export_service.py        # CSV, JSON, ICS, and printable report generators
│   └── routes/
│       ├── health.py                # GET /api/health
│       ├── events.py                # CRUD /api/events, /api/events/<id>/agenda, /api/events/<id>/tasks
│       ├── ai_planner.py            # POST /api/ai/plan, /api/ai/chat, /api/ai/optimize-budget, /api/ai/venues, /api/ai/agenda
│       └── exports.py               # GET /api/exports/<event_id>/<format> (csv, json, ics)
└── frontend/
    ├── .env.example                 # Frontend environment variables template
    ├── package.json                 # Dependencies & scripts
    ├── tsconfig.json                # TypeScript configuration
    ├── tailwind.config.ts           # Custom luxury theme (Lavender, Deep Indigo, Warm Ivory, Subtle Gold)
    ├── vercel.json                  # Vercel deployment configuration
    └── src/
        ├── lib/
        │   ├── supabase.ts          # Supabase client initialization & auth helpers
        │   ├── api.ts               # Typed REST client calling Flask backend with fallback
        │   └── validations.ts       # Zod schemas for Event Wizard, Expenses, Tasks, Auth
        ├── types/
        │   └── event.ts             # Shared TypeScript interfaces
        └── app/
            ├── layout.tsx           # Fonts (Playfair Display + Plus Jakarta Sans) & metadata
            └── page.tsx             # Complete EventPilot AI application
```

---

## 3. Database Setup (Supabase)

1. Create a new project at [https://supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** -> **New Query**.
3. Copy and paste the contents of `supabase/schema.sql` and click **Run**.
   - Creates `profiles`, `events`, `event_plans`, `expenses`, `venues`, `agenda_items`, and `tasks` tables.
   - Configures foreign keys, cascading deletes, `updated_at` triggers, performance indexes, and **Row Level Security (RLS)** policies so users can only access and mutate their own private records.
4. Go to **Project Settings -> API** to copy your `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.

---

## 4. Local Development Setup

### A. Backend (Python Flask + Gemini API)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your GEMINI_API_KEY and SUPABASE credentials (or leave blank to test Demo/Mock AI Mode)
flask --app app run --port 5000 --debug
```

### B. Frontend (Next.js + TypeScript)

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000 and Supabase keys
npm run dev
```

Visit `http://localhost:3000`.

---

## 5. Production Deployment Instructions

### Deploying Backend to Render

1. Push this repository to GitHub/GitLab.
2. Log in to [Render](https://render.com) and click **New + -> Web Service** (or **Blueprint** using `render.yaml`).
3. Set **Root Directory** to `backend`.
4. Set **Build Command**: `pip install -r requirements.txt`
5. Set **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 4 --timeout 120`
6. Set **Health Check Path**: `/api/health`
7. Add Environment Variables in Render Dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API Key
   - `SUPABASE_URL`: Your Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key
   - `FRONTEND_ORIGIN`: Your deployed Vercel domain (e.g., `https://eventpilot-ai.vercel.app`)

### Deploying Frontend to Vercel

1. Log in to [Vercel](https://vercel.com) and click **Add New -> Project**.
2. Import your repository and set **Root Directory** to `frontend`.
3. Framework Preset: **Next.js**.
4. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL (e.g., `https://eventpilot-ai-api.onrender.com`)
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
5. Click **Deploy**.
