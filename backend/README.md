# ⚙️ Backend Tier — LaborDesk

The **Backend Tier** provides server-side business logic, API controllers, worker matching algorithms, and authentication processing.

---

## 📁 File & Controller Structure

```text
backend/
├── controllers/
│   ├── workersController.ts    # Physical worker registry CRUD & filter services
│   ├── companiesController.ts  # Corporate company profiles & GSTIN verification
│   ├── requestsController.ts   # Worker requirement dispatches & assignment workflow
│   └── analyticsController.ts  # Revenue, active headcount, and site analytics
├── services/
│   ├── matchingService.ts      # Candidate matching algorithm (skill, location, wage)
│   ├── attendanceService.ts    # Attendance check-in audit service
│   └── billingService.ts       # Automated tax invoice calculation engine
└── README.md
```

---

## 🔌 API Route Contracts (`/api/...`)

- `GET /api/workers` — Retrieve verified worker registry with skill search queries.
- `POST /api/workers` — Register new physical worker with Aadhaar documents.
- `GET /api/companies` — Fetch corporate client roster.
- `GET /api/requests` — Retrieve corporate worker headcount dispatches.
- `POST /api/requests` — Submit new blue-collar headcount requirement.
- `GET /api/analytics` — Return system revenue metrics and deployment stats.
