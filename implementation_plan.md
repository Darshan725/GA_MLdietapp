# 🏋️ AI Workout Coach — Implementation Plan

## Overview

A full-stack **AI-powered workout & nutrition coaching app** where users can:
- Build custom workout plans
- Log workout sessions (exercises, sets, reps, weight)
- Log daily meals and track macros/calories
- Get AI-estimated **body fat percentage** from a personal photo
- Talk to a **fitness myth-busting chatbot** grounded in science
- Track fitness + nutrition progress with charts
- Receive **ML-powered** performance predictions, adaptive workout suggestions, and nutrition insights

This app is designed to grow in ML complexity — starting with rule-based suggestions and progressing to real regression/RL models.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | NestJS (Node.js) |
| **Frontend** | React + Vite + Redux Toolkit (RTK Query) |
| **Database** | **PostgreSQL** + TypeORM |
| **ML Service** | Python (FastAPI) — separate microservice |
| **Auth** | JWT (access + refresh tokens) |
| **Charts** | Recharts |
| **Dev Environment** | Docker Compose (all services) |

---

## Database Schema (PostgreSQL)

```
users
  id, email, password_hash, name, age, weight_kg, height_cm, goal (lose/gain/maintain), created_at

exercises
  id, name, muscle_group, equipment, description

workout_plans
  id, user_id, name, description, created_at

workout_plan_exercises
  id, plan_id, exercise_id, sets, reps, rest_seconds, order

sessions
  id, user_id, plan_id (nullable), started_at, ended_at, notes

session_logs
  id, session_id, exercise_id, set_number, reps_done, weight_kg, duration_seconds

progress_snapshots
  id, user_id, exercise_id, date, best_weight, best_reps, total_volume

-- DIET TRACKING --

foods
  id, name, brand, calories_per_100g, protein_g, carbs_g, fat_g, fiber_g
  (pre-seeded from Open Food Facts API or manual entry)

meal_logs
  id, user_id, date, meal_type (breakfast/lunch/dinner/snack), logged_at

meal_log_items
  id, meal_log_id, food_id, quantity_g

nutrition_goals
  id, user_id, calories_target, protein_g, carbs_g, fat_g, effective_from
  (one active row per user; changes tracked for ML)

body_weight_logs
  id, user_id, weight_kg, recorded_at
  (separate from session — users can log daily weigh-ins)
```

---

## App Features (Phase by Phase)

### Phase 1 — Core (MVP)
- [ ] Auth: Register / Login (JWT), user profile (age, weight, goal)
- [ ] Exercise library (pre-seeded with common exercises)
- [ ] Create & manage workout plans
- [ ] Log a live workout session (exercise → sets → reps → weight)
- [ ] View session history

### Phase 2 — Diet Tracking
- [ ] Food database (seed from Open Food Facts or manual entry)
- [ ] Log meals by type (breakfast/lunch/dinner/snack)
- [ ] Daily macro & calorie summary (protein / carbs / fat / calories)
- [ ] Set nutrition goals (calories, macros)
- [ ] Daily body weight log
- [ ] Nutrition dashboard: macros ring chart, calorie bar chart, weekly trend

### Phase 3 — Progress & Analytics
- [ ] Progress charts per exercise (weight over time, volume over time)
- [ ] Personal records (PRs) detection
- [ ] Streak tracking (workout + diet compliance)
- [ ] Combined dashboard: workout streak + nutrition compliance + body weight trend

### Phase 4 — AI & ML Integration
- [ ] **Performance prediction**: predict next-session weight based on training history
  - *Model: Linear Regression on volume/weight time-series*
- [ ] **Nutrition ↔ Performance correlation**: did eating more protein correlate with strength gains?
  - *Model: Correlation analysis + simple regression*
- [ ] **Calorie need estimation**: predict daily TDEE based on activity + body weight logs
  - *Model: Harris-Benedict adjusted via user data*
- [ ] **Workout suggestions**: adjust sets/reps based on recent fatigue/progress
  - *Model: Rule-based → RL recommendation loop*
- [ ] **Body fat estimator from photo** — user uploads body image → AI returns estimated body fat %
  - *Model: Fine-tuned CNN (ResNet/MobileNet) or vision LLM (Gemini Vision / GPT-4o) via API call*
  - *Input: front-facing body photo. Output: estimated BF% range + body composition category*
- [ ] **Fitness Myth-Buster Chatbot** — conversational AI that answers and debunks fitness myths
  - *Approach A (Simpler — RAG)*: embed a curated fitness facts knowledge base into a vector DB (Chroma/Pinecone), use LLM (Gemini/OpenAI) to answer grounded in facts
  - *Approach B (Learning-focused)*: Fine-tune a small open-source LLM (e.g., Mistral 7B) on fitness Q&A datasets — great for ML learning!
  - Chat history stored per user, allowing follow-up questions
- [ ] **Optional**: PoseNet (TensorFlow.js) in-browser form detection

---

## Project Structure

```
workout-coach/
├── backend/                  # NestJS
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── exercises/
│   │   ├── workout-plans/
│   │   ├── sessions/
│   │   ├── progress/
│   │   ├── diet/            # foods, meal-logs, nutrition-goals
│   │   ├── body-weight/     # daily weigh-in logs
│   │   ├── body-fat/        # photo upload + BF% history
│   │   ├── chatbot/         # chat sessions, message history
│   │   └── ml/              # HTTP client to ML service
│   └── ...
│
├── frontend/                 # Vite + React + RTK
│   ├── src/
│   │   ├── app/             # RTK store + baseApi
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── exercises/
│   │   │   ├── plans/
│   │   │   ├── session/
│   │   │   ├── diet/        # meal logger, food search, macros view
│   │   │   ├── bodyweight/  # weigh-in log + trend chart
│   │   │   ├── bodyfat/     # photo upload + BF% result display
│   │   │   ├── chatbot/     # myth-buster chat UI
│   │   │   └── progress/
│   │   ├── pages/
│   │   └── components/
│   └── ...
│
├── ml-service/               # Python FastAPI
│   ├── main.py
│   ├── models/
│   │   ├── performance_predictor.py
│   │   ├── nutrition_correlation.py
│   │   ├── tdee_estimator.py
│   │   ├── body_fat_estimator.py   # CV model / vision LLM call
│   │   └── workout_suggester.py
│   ├── chatbot/
│   │   ├── rag_pipeline.py         # embed docs → vector search → LLM answer
│   │   ├── knowledge_base/         # curated fitness facts (markdown/PDF)
│   │   └── chat_history.py
│   └── requirements.txt
│
└── docker-compose.yml
```

---

## ML Service APIs (FastAPI)

| Endpoint | Method | Description |
|---|---|---|
| `/predict/performance` | POST | Session logs → predicted next-session weight |
| `/suggest/workout` | POST | User profile + history → exercise adjustments |
| `/predict/tdee` | POST | Body weight logs + activity → daily calorie estimate |
| `/analyze/nutrition-performance` | POST | Correlates nutrition logs with strength progress |
| `/analyze/bodyfat` | POST | Body image (base64/URL) → estimated BF% range + category |
| `/chat/message` | POST | User message + chat history → LLM grounded response |
| `/chat/history/{userId}` | GET | Retrieve past chat messages |

> Initially these can return rule-based responses. Swap in sklearn models as you learn.

---

## Key Learning Opportunities

| Feature | ML Concept |
|---|---|
| Performance prediction | Linear Regression, feature engineering |
| Volume fatigue detection | Moving averages, time-series |
| Nutrition ↔ performance | Correlation analysis, multi-variate regression |
| TDEE estimation | Energy balance equations + regression tuning |
| Workout suggestions | Collaborative filtering, RL basics |
| **Body fat from photo** | Transfer Learning, CNN (MobileNet/ResNet), Vision LLMs |
| **Fitness chatbot** | RAG pipeline, vector embeddings, LLM prompting, Chroma/Pinecone |
| Form detection (optional) | Computer Vision, PoseNet |

---

## Verification Plan

### Development Verification
- Run backend: `npm run start:dev` in `/backend`
- Run frontend: `npm run dev` in `/frontend`
- Run ML service: `uvicorn main:app --reload` in `/ml-service`
- Run all together: `docker-compose up`

### Manual E2E Test Flow
1. Register a new user → verify JWT returned
2. Browse exercise library → verify seed data loaded
3. Create a workout plan with 3 exercises
4. Start a session → log sets/reps/weight → end session
5. Log a full day of meals → verify calorie/macro totals correct
6. Set a nutrition goal → verify dashboard reflects targets
7. Log body weight for 7 days → view trend chart
8. View progress chart for an exercise → verify data plotted
9. Call ML prediction + nutrition correlation endpoints → verify responses

---

## Questions for You Before Starting

> [!IMPORTANT]
> Please confirm or adjust these decisions before I scaffold the project:

1. **Monorepo?** — Single `workout-coach/` folder with `backend/`, `frontend/`, `ml-service/` inside. OK?
2. **Food database source** — Seed foods manually with a small dataset, or integrate the free [Open Food Facts API](https://world.openfoodfacts.org/) for real food search?
3. **ML approach** — Python **FastAPI** microservice (easier for sklearn learning) or **TensorFlow.js** in NestJS?
4. **Phase to start** — Phase 1 MVP first, then diet, then ML? Or wire everything in together?
5. **PoseNet** (webcam form detection) — in scope or skip for now?
