# Freelancer Hub — Backend Development Learning Roadmap

> **One project. Every concept. Portfolio-ready.**
> Learn Node.js by building a real product — not by following tutorials.

---

## The Project

Freelancer Hub is a platform where freelancers manage their clients, track projects, send invoices, and get paid. You will build the **entire backend** from scratch — one feature at a time, one concept at a time.

**Why this project works:** It naturally requires authentication, role-based access, relational data, file generation, payment integration, email notifications, real-time updates, caching, and deployment. You won't learn these in isolation — you'll learn them because your project *needs* them.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (graduating to Fastify in Phase 5)
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** JWT + bcrypt
- **Validation:** Zod
- **Testing:** Vitest + Supertest
- **Payments:** Stripe API
- **Real-time:** Socket.io
- **Deployment:** Railway / Render + Docker

---

## Phase 1 — Foundation: Your First Working API
**Weeks 1–3**

Before you write a single route, you need to understand what actually happens when someone sends a request to your server. This phase is about building that mental model — then proving it by building a working CRUD API for managing clients.

### What You'll Build
A RESTful API for managing freelancer clients: create, read, update, delete clients with proper validation, error handling, and project structure.

| Feature | Concepts You'll Learn | Challenge |
|---|---|---|
| Project setup | npm init, folder structure, environment variables, nodemon | Set it up from scratch — no boilerplate generators |
| First Express server | HTTP fundamentals, request/response cycle, how Express routes work under the hood | Trace a request from curl to response — explain every step |
| CRUD routes for clients | REST design, HTTP verbs, status codes, route parameters, query strings | Add filtering and pagination without a tutorial |
| Input validation | Why never trust the client, Zod schemas, validation middleware | What happens if someone sends `{ "name": 123 }`? Handle it. |
| Error handling | Centralized error middleware, custom error classes, async error catching | Make every error return a consistent JSON shape — design it yourself |
| Project structure | Controllers, routes, middleware — separation of concerns | Refactor your single file into a professional folder structure |

### Key Thinking Skills
- Tracing a request through Express from start to finish
- Understanding why REST conventions exist (not just following them)
- Designing error responses that are useful for frontend developers
- Knowing when to validate on the server even if the frontend validates too

### Milestone
Your API handles all CRUD operations for clients, validates every input, returns consistent error messages, and is organized like a real codebase. Test it with curl or Postman — every edge case should return something sensible.

---

## Phase 2 — Data Layer: Real Database, Real Relationships
**Weeks 4–6**

Your in-memory array was fine for Phase 1, but real apps need persistent data with relationships. A client has many projects. A project has many invoices. This phase teaches you to think in data models.

### What You'll Build
PostgreSQL database with Prisma ORM. Models for clients, projects, and time entries. Migrations, seeding, and relational queries.

| Feature | Concepts You'll Learn | Challenge |
|---|---|---|
| PostgreSQL setup | Relational databases, SQL basics, why not MongoDB for this | Write raw SQL to create tables before using Prisma |
| Prisma ORM | Schema definition, migrations, generated client, type safety | Explain what Prisma does that raw SQL doesn't (and vice versa) |
| Data modeling | One-to-many, many-to-many, thinking about relationships | Design the schema for clients → projects → time entries yourself first |
| Migrations | Why ALTER TABLE in production is dangerous, migration workflow | Add a field to clients after data exists — write the migration |
| Seeding | Test data, faker libraries, reproducible development setup | Create a seed script that generates 50 realistic clients with projects |
| Complex queries | Filtering, sorting, pagination with database, N+1 problem | Fetch all clients with their total project hours — in one query |

### Key Thinking Skills
- Designing a database schema by thinking about real-world relationships first
- Understanding why ORMs exist and when to drop down to raw SQL
- Recognizing the N+1 query problem before it kills your performance
- Thinking about data integrity — what happens if you delete a client who has projects?

### Milestone
All Phase 1 routes now use PostgreSQL. You can create a client, add projects to them, log time entries, and query the data efficiently. Your schema handles edge cases like cascading deletes.

---

## Phase 3 — Authentication & Authorization: Who Are You and What Can You Do?
**Weeks 7–9**

Right now anyone can hit your API and modify data. That's fine for learning, but a real app needs to know who's making the request and what they're allowed to do. This phase adds identity.

### What You'll Build
Full authentication system with signup, login, password hashing, JWT tokens, refresh tokens, and role-based access control (freelancer vs. client roles).

| Feature | Concepts You'll Learn | Challenge |
|---|---|---|
| User registration | Password hashing with bcrypt, salting, why plain text kills | Hash a password, then explain why you can't reverse it |
| Login + JWT | What a token is, how signing works, token payload design | Decode a JWT manually and explain each section |
| Auth middleware | Protecting routes, extracting tokens, verifying signatures | What happens if the token is expired? Tampered? Missing? |
| Refresh tokens | Access vs refresh tokens, token rotation, secure storage | Design the refresh flow on a whiteboard before coding it |
| Role-based access | Authorization vs authentication, permission middleware | A client can only see THEIR projects — implement and test it |
| Password reset | Secure token generation, email flow, time-limited tokens | What are the security holes if you do this wrong? |

### Key Thinking Skills
- Understanding the difference between authentication (who are you?) and authorization (what can you do?)
- Thinking like an attacker — what happens if someone steals a token?
- Designing middleware that composes cleanly (auth check + role check + ownership check)
- Understanding why you never store passwords, never trust the client, and always validate server-side

### Milestone
Users can register, log in, and access only their own data. A freelancer sees their clients; a client sees their projects. Tokens expire and refresh. Invalid requests get clear, secure error messages.

---

## Phase 4 — Business Logic: Invoices, Payments, and Files
**Weeks 10–12**

This is where Freelancer Hub starts feeling like a real product. You'll add the features that make it actually useful: generating invoices, processing payments, sending emails, and handling file uploads.

### What You'll Build
Invoice generation from time entries, PDF creation, Stripe payment integration, email notifications, and file upload for project attachments.

| Feature | Concepts You'll Learn | Challenge |
|---|---|---|
| Invoice generation | Business logic layer, calculating totals from time entries, invoice states | Design the invoice state machine: draft → sent → paid → overdue |
| PDF creation | Server-side file generation, templates, streaming buffers | Generate a professional invoice PDF from data — not a screenshot |
| Stripe integration | Third-party APIs, webhooks, handling async payment events | What if Stripe says "paid" but your webhook fails? Handle it. |
| Email notifications | SMTP, email services (SendGrid/Resend), templating | Send invoice emails that don't land in spam — learn why they do |
| File uploads | Multipart forms, file storage, presigned URLs, size/type limits | Upload project files securely with size limits and type checking |
| Background jobs | Why long tasks shouldn't block requests, job queues (BullMQ) | Generate a PDF in the background and notify when done |

### Key Thinking Skills
- Thinking about state machines — an invoice isn't just data, it has a lifecycle
- Handling third-party API failures gracefully (Stripe is down — now what?)
- Understanding webhooks — your server as a listener, not just a requester
- Knowing when a task is too slow for a request and needs a background job

### Milestone
A freelancer can log time, generate an invoice, send it to a client, and the client can pay via Stripe. The freelancer gets an email when payment is received. Files can be attached to projects.

---

## Phase 5 — Production-Grade: Testing, Performance, and Real-Time
**Weeks 13–15**

Your features work. Now make them reliable, fast, and professional. This phase transforms your project from "it works on my machine" to "it's ready for users."

### What You'll Build
Comprehensive test suite, caching layer, rate limiting, real-time notifications with WebSockets, and API documentation.

| Feature | Concepts You'll Learn | Challenge |
|---|---|---|
| Testing | Unit tests, integration tests, mocking, test databases | Write tests that catch real bugs — not tests that just pass |
| Caching with Redis | Cache strategies, invalidation, when caching hurts | Cache the client list. Now update a client — does the cache lie? |
| Rate limiting | Protecting your API, sliding windows, per-user limits | What happens when a bot sends 10,000 requests per second? |
| WebSocket notifications | Real-time communication, Socket.io, event-driven updates | Notify the freelancer in real time when a client pays |
| Logging & monitoring | Structured logging (Pino), request tracing, health checks | Your API crashed at 3am — can your logs tell you why? |
| API documentation | OpenAPI/Swagger, self-documenting APIs, versioning | Document your API so another developer can use it without asking you |

### Key Thinking Skills
- Writing tests that actually protect against regressions, not tests for coverage numbers
- Understanding cache invalidation — the hardest problem in computer science, for real
- Thinking about abuse — what would a malicious user do to your API?
- Designing for observability — when it breaks at 3am, can you figure out what happened?

### Milestone
Your API has 80%+ test coverage on critical paths, responses are fast thanks to caching, abusers get rate-limited, and payment notifications arrive in real time. The API is fully documented.

---

## Phase 6 — Deploy: Ship It to the World
**Week 16**

The final phase. Your project goes from localhost to a live URL anyone can visit. This is where you learn what changes when real users are involved.

### What You'll Build
Docker containerization, CI/CD pipeline, production deployment, and environment management.

| Feature | Concepts You'll Learn | Challenge |
|---|---|---|
| Docker | Containers, Dockerfiles, why "works on my machine" isn't enough | Containerize your app so anyone can run it with one command |
| CI/CD pipeline | GitHub Actions, automated testing, deploy on merge | Push to main → tests run → deploys automatically. Set it up. |
| Production deploy | Railway/Render, managed databases, environment configs | Deploy and hit your live API from your phone |
| Environment management | Dev vs staging vs production, secrets management, .env files | Your Stripe keys are different in dev and prod — handle it cleanly |

### Milestone
Freelancer Hub is live. It has a public URL, a CI/CD pipeline that runs tests on every push, and separate dev/production environments. You can share the link in your portfolio and demo it in interviews.

---

## How to Use This Plan

1. **Don't rush through phases.** The week counts are estimates. If Phase 2 takes you 4 weeks instead of 3, that's fine. Understanding > speed.
2. **Build features in order.** Each phase builds on the previous one. Don't skip to Stripe before your database works.
3. **Do every challenge.** The challenges are where real learning happens. They're intentionally harder than the feature itself.
4. **Use AI as a co-programmer.** Ask AI to help you think through architecture. Ask it to review your code. Ask it to explain errors. Don't ask it to write your features for you.
5. **When you're stuck:** Try for 20 minutes alone. Then ask your tutor — it will guide you through the problem, not hand you the answer.
6. **Keep a learning journal.** After each session, write 2–3 sentences about what clicked and what's still fuzzy. This is the fastest way to solidify understanding.

---

## Git & GitHub Strategy

This project uses a professional Git workflow. Your GitHub history should tell the story of how you built this — not just show the final code.

### Initial Setup

```bash
# Create the repo
cd freelancer-hub
git init
git branch -M main

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/freelancer-hub.git

# First commit — just the project skeleton
git add .
git commit -m "chore: initial project setup"
git push -u origin main
```

### Branching Model

**Never code directly on `main`.** Every feature gets its own branch.

```
main (always working, always clean)
 ├── feat/express-server
 ├── feat/client-crud-routes
 ├── feat/input-validation
 ├── feat/error-handling
 └── refactor/project-structure
```

**The workflow for every feature:**

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create a branch for the feature
git checkout -b feat/client-crud-routes

# 3. Build the feature — commit as you go (small, meaningful commits)
git add .
git commit -m "feat: add GET /api/clients route"
git add .
git commit -m "feat: add POST /api/clients with request body parsing"
git add .
git commit -m "feat: add PUT and DELETE for clients"
git add .
git commit -m "test: manually test all client routes with curl"

# 4. Push the branch to GitHub
git push origin feat/client-crud-routes

# 5. Open a Pull Request on GitHub (browser)
#    - Write a short description of what you built and why
#    - Review your own code in the PR diff

# 6. Merge the PR into main (on GitHub)

# 7. Back in terminal — switch to main and pull
git checkout main
git pull origin main

# 8. Delete the old branch (keep things clean)
git branch -d feat/client-crud-routes
```

### Branch Naming Convention

Use prefixes so it's clear what each branch is for:

| Prefix | When to use | Example |
|---|---|---|
| `feat/` | Adding a new feature | `feat/jwt-authentication` |
| `fix/` | Fixing a bug | `fix/validation-empty-email` |
| `refactor/` | Restructuring without changing behavior | `refactor/project-structure` |
| `chore/` | Config, dependencies, tooling | `chore/add-eslint` |

### Commit Message Convention

Use the [Conventional Commits](https://www.conventionalcommits.org/) format. Keep messages short and specific.

```
feat: add client CRUD routes
feat: add Zod validation for client input
fix: handle empty request body without crashing
refactor: move route handlers into controllers
chore: add nodemon for dev auto-reload
test: add integration tests for client routes
docs: add API documentation for client endpoints
```

**Bad commits to avoid:**
```
fixed stuff
wip
asdfgh
update
phase 1 done
```

### Tagging Phase Completions

When you finish a phase, tag it. This creates a snapshot you (and employers) can jump to:

```bash
git tag -a v1.0-foundation -m "Phase 1 complete: CRUD API with validation and error handling"
git push origin v1.0-foundation
```

| Tag | Phase |
|---|---|
| `v1.0-foundation` | Phase 1 — Foundation |
| `v2.0-data-layer` | Phase 2 — Data Layer |
| `v3.0-auth` | Phase 3 — Auth |
| `v4.0-business-logic` | Phase 4 — Business Logic |
| `v5.0-production` | Phase 5 — Production-Grade |
| `v6.0-deployed` | Phase 6 — Deploy |

### Phase 1 Branch Plan (Example)

Here's exactly how Phase 1 breaks down into branches:

```
main
 ├── chore/project-setup          → npm init, folder structure, .env, .gitignore
 ├── feat/express-server           → first working server, GET /health
 ├── feat/client-crud-routes       → all CRUD routes for clients (in-memory)
 ├── feat/input-validation         → Zod schemas, validation middleware
 ├── feat/error-handling           → centralized error middleware, custom error class
 └── refactor/project-structure    → split into controllers/, routes/, middleware/
 ↓
 Tag: v1.0-foundation
```

Each branch = one Pull Request on GitHub. By the end of Phase 1, you'll have 6 merged PRs — each one showing what you built and why.

### What This Looks Like to an Employer

When someone visits your GitHub repo, they'll see:
- **A clean main branch** that always works
- **Pull Requests** showing your thought process feature by feature
- **Meaningful commit messages** that read like a developer journal
- **Tags** they can click to see the project at any phase
- **No giant "dump all code" commits** — everything is incremental and intentional

This is how professional teams work. Most junior developers don't know this — you will.

### README.md

Create a `README.md` in your repo from day one and update it as you go. By Phase 6, it should include:
- What the project is and what it does
- Tech stack
- How to run it locally (with Docker, after Phase 6)
- API endpoints overview
- What you learned building it

This is the first thing anyone sees when they visit your repo.

---

## Progress Tracker

<!-- Update this as you complete each phase -->

| Phase | Status | Started | Completed |
|---|---|---|---|
| Phase 1 — Foundation | ⬜ Not started | | |
| Phase 2 — Data Layer | ⬜ Not started | | |
| Phase 3 — Auth | ⬜ Not started | | |
| Phase 4 — Business Logic | ⬜ Not started | | |
| Phase 5 — Production-Grade | ⬜ Not started | | |
| Phase 6 — Deploy | ⬜ Not started | | |

**Current Phase:** Phase 1
**Current Feature:** —
