# SkillBridge

An AI-powered career platform connecting engineering students with internships, placements,
industry research challenges and technology licensing — across academia and industry.

## Structure

- `frontend/` — React + Vite + Tailwind SPA. Works fully standalone on mock data
  (see `frontend/src/data/` and `frontend/src/services/aiService.js`) — no backend required for a demo.
- `backend/` — Express + MongoDB API mirroring the same data model and AI matching heuristic,
  ready to plug into the frontend or a real Python ML/NLP service.

## Quick start (frontend only, no backend needed)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. On the landing page, click **Explore Opportunities** or use
**Continue with Demo** on the login page (pick Student / Institution / Industry / Admin) to
enter the platform with realistic seeded data — no registration required.

## Full stack (with MongoDB-backed API)

1. Start MongoDB (local install, or Docker: `docker run -d -p 27017:27017 --name skillbridge-mongo mongo:7`).
2. Configure and seed the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env   # adjust MONGO_URI if needed
   npm run seed           # loads the same students/institutions/industries/internships/etc.
   npm run dev            # http://localhost:4000
   ```
   Seeded demo logins (password `demo1234` for role accounts, `student1234` for the 50 generated students):
   - Student: `amit.kumar@skillbridge.demo`
   - Institution: `sourav.banerjee@nitdgp.skillbridge.demo`
   - Industry: `ananya.iyer@innovatex.demo`
   - Admin: `admin@skillbridge.demo`
3. The frontend runs entirely on its own local mock data by default. To point it at this
   API instead, wire `frontend/src/services/aiService.js` (`USE_REMOTE_API`) and the
   page-level data imports to `http://localhost:4000/api/*` via `frontend/src/services/api.js`.

## API reference (backend)

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create a Student / Institution / Industry / Admin account |
| POST | `/api/auth/login` | Email/password login |
| GET | `/api/auth/me` | Resolve the current demo session token |
| GET \| PUT | `/api/students/:id` | Read / update a student profile |
| POST | `/api/students/skill-analysis` | Run AI skill mapping on `{ skills }` or `{ text }` |
| GET | `/api/internships` | List internships (filters: `discipline`, `location`, `verified`, `search`) |
| GET | `/api/internships/:id` | Internship detail |
| POST | `/api/internships` | Create an internship posting |
| POST | `/api/internships/:id/apply` | Apply a student to an internship (`{ studentId }`) |
| GET | `/api/applications` | List applications (filters: `studentId`, `internshipId`, `status`) |
| GET | `/api/industry/candidates` | AI-ranked candidates for one opportunity (`?internshipId=`) |
| POST | `/api/industry/opportunities` | Post a new internship opportunity |
| GET \| POST | `/api/rnd` | List / create R&D problem statements |
| GET | `/api/rnd/:id` | R&D challenge detail |
| GET \| POST | `/api/technologies` | List / list a technology |
| POST | `/api/technologies/:id/license` | Submit a licensing request |
| GET | `/api/analytics/dashboard` | Platform ecosystem KPI numbers |
| GET | `/api/analytics/skills` | Industry demand vs. registered student skill supply |
| GET | `/api/analytics/internships` | Monthly application/placement trend |
| GET | `/api/analytics/placements` | Placement rate summary |
| GET | `/api/admin/users` | All platform users |
| GET | `/api/admin/verifications` | Pending institutions/industries/internships/technologies |
| PUT | `/api/admin/verifications/:id` | Approve/reject one pending item (`{ type, action }`) |
| POST | `/api/ai/skill-analysis` | Same AI heuristic, framework-agnostic endpoint for a future Python model swap |

## AI/NLP layer

Both the frontend (`frontend/src/services/aiService.js`) and backend
(`backend/src/services/aiService.js`) run the same deterministic, explainable
skill-matching heuristic — `analyzeStudentSkills`, `calculateSkillGap`,
`matchStudentToInternship` / `matchCandidateToIndustry` (40% skills · 20% education ·
15% experience · 10% location · 10% interests · 5% certifications, with a "why this
match" explanation), `recommendCareer`, `recommendCourses`, and `analyzeIndustryDemand` —
so the product demos end-to-end without a live ML service. Both are architected so a real
Python/FastAPI model can be dropped in behind `POST /api/ai/skill-analysis` without any
caller changes.
