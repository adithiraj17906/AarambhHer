# SheWorks (AarambhHer) Backend API

A Node.js Express and PostgreSQL REST API backend providing full CRUD operations for Jobs, Gigs, Learning Resources, and Career Advisor features.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment (`.env`)
A default `.env` is created in `server/.env`.
```env
PORT=5000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/sheworks
```

> **Note:** If PostgreSQL is not configured yet or the service is offline, the backend automatically runs in **In-Memory Fallback Mode** with seed data so you can test all endpoints immediately.

### 3. Run the Server
```bash
# Production mode:
npm start

# Development mode (with auto-reload):
npm run dev
```

The server will run on `http://localhost:5000`.

---

## 🗄️ PostgreSQL Setup

1. Create a database named `sheworks` in PostgreSQL:
   ```sql
   CREATE DATABASE sheworks;
   ```
2. Update `DATABASE_URL` in [`server/.env`](.env) with your credentials:
   - **Local PostgreSQL:** `postgresql://postgres:password@localhost:5432/sheworks`
   - **Cloud PostgreSQL (Supabase / Neon / Railway):** `postgresql://user:password@ep-xyz.aws.neon.tech/sheworks?sslmode=require`
3. Restart the server. Tables (`jobs`, `gigs`, `videos`, `advisor_replies`) will be **automatically created and seeded** on first connect!

---

## 📡 REST API Endpoints

### 🩺 Health & System
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Check server and database status |
| `GET` | `/` | API welcome and endpoint summary |

### 💼 Jobs (`/api/jobs`)
| Method | Endpoint | Query / Body Params | Description |
|---|---|---|---|
| `GET` | `/api/jobs` | `?type=`, `?location=`, `?search=` | List jobs with optional filters |
| `GET` | `/api/jobs/:id` | — | Get single job details |
| `POST` | `/api/jobs` | `{ title, company, salary, type, location, tags, ... }` | Create a new job |
| `PUT` | `/api/jobs/:id` | `{ title, salary, location, ... }` | Update an existing job |
| `DELETE` | `/api/jobs/:id` | — | Delete a job |
| `POST` | `/api/jobs/:id/apply` | `{ applicantName, email }` | Submit job application |

### 🚗 Flexible Gigs (`/api/gigs`)
| Method | Endpoint | Query / Body Params | Description |
|---|---|---|---|
| `GET` | `/api/gigs` | `?location=`, `?search=` | List flexible gigs |
| `GET` | `/api/gigs/:id` | — | Get gig details |
| `POST` | `/api/gigs` | `{ title, pay, location, time, dist, ... }` | Create a new gig |
| `PUT` | `/api/gigs/:id` | `{ title, pay, location, ... }` | Update a gig |
| `DELETE` | `/api/gigs/:id` | — | Delete a gig |

### 🎥 Learning Resources / Videos (`/api/videos`)
| Method | Endpoint | Query / Body Params | Description |
|---|---|---|---|
| `GET` | `/api/videos` | `?cat=`, `?search=` | List courses / videos |
| `GET` | `/api/videos/:id` | — | Get video by ID |
| `POST` | `/api/videos` | `{ cat, title, meta, live }` | Add new video/course |
| `PUT` | `/api/videos/:id` | `{ title, cat, meta, live }` | Update video |
| `DELETE` | `/api/videos/:id` | — | Delete video |

### 🤖 AI Career Advisor (`/api/advisor`)
| Method | Endpoint | Body Params | Description |
|---|---|---|---|
| `GET` | `/api/advisor/replies` | — | Get career guidance FAQs |
| `POST` | `/api/advisor/replies` | `{ question, reply }` | Add or update FAQ response |
| `POST` | `/api/advisor/chat` | `{ message: "your question" }` | Get AI advisor reply |
