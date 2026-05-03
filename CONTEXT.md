# Project Context & Learning Preferences

## Teaching Style (IMPORTANT — Read This Every Session)

- ⚠️ **NEVER auto-generate files directly** — I need to create the files and paste the code myself so I stay involved.
- **Batch & Explain (Faster Pace)** — Give me larger chunks of code to copy/paste at once (not line-by-line), then explain what the chunk does.
- **Explain concepts as we build** — use analogies (I learn well this way), avoid pure theory dumps.
- **Classes & OOP focus** — help me get comfortable with classes, objects, interfaces, decorators.
- **Ask me questions** — check understanding after major concepts or steps to ensure I'm not just blindly copying.
- **Learning pace note** — I grasp the big picture quickly but need clear instructions on syntax/where things go. Keep the pace moving efficiently!

## Unanswered Decisions (from implementation plan)

- [ ] Food database source — manual seed or Open Food Facts API?
- [ ] ML approach — Python FastAPI microservice or TensorFlow.js?
- [ ] Phase to start — Phase 1 MVP first or wire everything together?
- [ ] PoseNet (webcam form detection) — in scope or skip?
- [ ] Monorepo confirmed? (backend already scaffolded in `workout-coach/backend/`)

## Current Status

- Backend NestJS project scaffolded at `workout-coach/backend/`
- All packages already installed (TypeORM, JWT, bcrypt, class-validator, passport, pg)
- Full plan in `implementation_plan.md`
- Task checklist in `task.md`
- Phase 1 (MVP) not yet started

## ▶️ RESUME POINT — Docker Compose Setup (hands-on)

**WHERE WE STOPPED:**
- Docker is installed (version 29.3.1) ✅
- Next step: user needs to **manually create** `workout-coach/docker-compose.yml` (empty file)
- Then I walk through it line by line — user types each section themselves

**Teaching approach for Docker session:**
- I explain a concept → tell user what to type → user types it → I explain what it does → repeat
- Do NOT auto-generate the file

**What docker-compose.yml needs to contain (for me to guide through):**
1. `version` line
2. `services:` block with `postgres` container (image, env vars, ports, volumes)
3. `backend` container (build from Dockerfile, ports, env vars, depends_on postgres)
4. `volumes:` block for persistent DB data

**After docker-compose.yml:** create `backend/Dockerfile` the same hands-on way

## Session Notes

<!-- Add notes here as we make decisions mid-chat -->

