# Workout Coach App — Task Checklist

## Planning
- [/] Define app features, architecture, and tech stack
- [ ] Create implementation plan and get user approval

## Backend (NestJS)
- [ ] Scaffold NestJS project
- [ ] Set up PostgreSQL + TypeORM (entities: User, Workout, Exercise, Session, ProgressLog)
- [ ] Auth module (JWT)
- [ ] Exercises module (CRUD, muscle groups)
- [ ] Workouts module (plans, templates)
- [ ] Sessions module (log a workout session)
- [ ] Progress module (track sets, reps, weight over time)
- [ ] Diet module (foods, meal-logs, nutrition-goals)
- [ ] Body-weight module (daily weigh-in logs)
- [ ] Body-fat module (photo upload + BF% history storage)
- [ ] Chatbot module (chat sessions, message history)
- [ ] ML service (Python microservice) integration
  - [ ] Performance trend endpoint
  - [ ] Workout suggestion endpoint
  - [ ] TDEE estimator endpoint
  - [ ] Nutrition ↔ performance correlation endpoint
  - [ ] Body fat estimator endpoint (vision model)
  - [ ] Chatbot message endpoint (RAG + LLM)

## Frontend (React + RTK)
- [ ] Scaffold Vite + React project
- [ ] RTK store setup + RTK Query API slices
- [ ] Auth pages (Login / Register)
- [ ] Dashboard (summary, streak, weekly snapshot)
- [ ] Exercise library page
- [ ] Workout plan builder
- [ ] Session logger (active workout UI)
- [ ] Diet / Nutrition pages
  - [ ] Food search + meal logger
  - [ ] Daily macro & calorie dashboard (ring chart + bar chart)
  - [ ] Nutrition goals setup
- [ ] Body weight log + trend chart
- [ ] Body fat % page (photo upload UI + result card + history)
- [ ] Fitness chatbot page (chat UI with message history)
- [ ] Progress charts (recharts/chart.js)
- [ ] AI suggestions panel

## ML Layer
- [ ] Decide: Python microservice (FastAPI) vs TensorFlow.js
- [ ] Implement performance prediction (regression)
- [ ] Implement nutrition ↔ performance correlation
- [ ] Implement TDEE estimator
- [ ] Implement workout suggestion (rule-based → ML)
- [ ] Implement body fat estimator (MobileNet/ResNet fine-tune OR vision LLM API)
- [ ] Implement fitness myth-buster chatbot (RAG pipeline: embed knowledge base → vector DB → LLM)
- [ ] Optionally: PoseNet in browser for form detection

## Database
- [ ] Design PostgreSQL schema (users, exercises, sessions, diet, body-weight)
- [ ] Write TypeORM migrations

## DevOps / Project Setup
- [ ] Monorepo or separate repos decision
- [ ] docker-compose for local dev (NestJS + React + PostgreSQL + ML service)

## Verification
- [ ] E2E flow: register → create workout → log session → view progress
- [ ] ML predictions return meaningful output
- [ ] Charts render correctly
