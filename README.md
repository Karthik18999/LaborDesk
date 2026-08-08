<div align="center">

# 🏗️ LaborDesk — On-Demand Blue-Collar Workforce Management Platform

<p align="center">
  <b>Enterprise-grade workforce management platform connecting corporate infrastructure builders with physically verified, skilled blue-collar workers on-demand.</b>
</p>

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![JWT Auth](https://img.shields.io/badge/JWT-HS256-000000?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Deployment Status](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://labor-desk.vercel.app)

---

### 🌐 [Live Platform Demo ➔ labor-desk.vercel.app](https://labor-desk.vercel.app)

</div>

---

## 🌟 Architecture & Directory Structure

LaborDesk is organized into a modular **3-Tier Enterprise Architecture**: `frontend/`, `backend/`, and `database/` with native **JWT Authentication**.

```text
LaborDesk/
├── 🎨 frontend/                  # Frontend UI Tier (Components, Theme, Store & Layouts)
│   ├── components/               # UI components (landing, shared header, admin & company sidebars)
│   ├── store/                    # React AppContext global store & JWT session decoding
│   ├── styles/                   # Glassmorphism, CSS tokens, and HSL theme engine
│   └── README.md                 # Frontend UI documentation & component guide
│
├── ⚙️ backend/                   # Backend API Tier (Controllers, Services & JWT Auth)
│   ├── controllers/              # Workers, Companies, Requests & Analytics API controllers
│   ├── services/                 # Candidate matching, JWT signing (HS256 Web Crypto API), attendance & billing
│   │   ├── jwtService.ts         # Edge-compatible JSON Web Token signer & verifier
│   │   └── matchingService.ts    # Intelligent candidate matching engine
│   └── README.md                 # Backend API contracts & controller documentation
│
├── 🗄️ database/                  # Database Tier (Schemas, Seeds & Client Helpers)
│   ├── schema.sql                # Production PostgreSQL relational schema (tables, UUIDs, indexes)
│   ├── seed.sql                  # Initial mock dataset seed script
│   ├── db.ts                     # Database connection client & memory persistence fallback
│   └── README.md                 # ERD diagram, Supabase setup & migration guide
│
├── src/                          # Next.js App Router entry pages & route handlers
│   └── lib/jwt.ts                # Next.js JWT helper exports
├── Dockerfile                    # Multi-stage production Docker container definition
├── .dockerignore                 # Container build exclusions
├── package.json
└── README.md
```

---

## 🔒 JWT Security & Authentication

LaborDesk uses **JSON Web Tokens (JWT)** signed via the **Web Crypto API (HMAC SHA-256)** for secure session authentication.

- **Edge & Vercel Native**: Zero binary external dependencies — compatible with Next.js Edge Middleware & Serverless Functions.
- **Session Payload**: Contains `{ name, email, role, companyName, iat, exp }` with a 24-hour expiration token.
- **Token Verification**: Automatic decoding and session restoration on initial page load via `verifyJwtToken()`.

---

## ✨ Key Modules & Capabilities

### 🏢 1. Corporate Client Portal (`/company`)
- **Worker Requirement Engine**: Submit headcount requests with granular specifications (skill trade, sub-skill, daily wage offered, reporting date, location, site amenities like food/shelter/transport).
- **Live Workflow Stepper**: Real-time 8-stage progress tracker (`Pending` ➔ `Reviewing` ➔ `Searching` ➔ `Workers Assigned` ➔ `Reached Site`).
- **Assigned Worker Roster**: View deployed workforce profiles, Aadhaar verification badges, emergency contact details, and skill ratings.
- **Invoices & Billing**: Automated tax invoice generation, wage breakdown statements, and PDF downloads.

### 🛡️ 2. Central Admin Hub Operations (`/admin`)
- **Physical Worker Registry**: Register workers in-person with Aadhaar numbers, biometric verification status, wage rates, and document uploads.
- **Intelligent Candidate Matching**: Match client worker requests with available verified workers based on skill trades, location, and wage requirements.
- **Site Attendance Auditing**: Log daily check-ins (`Present`, `Half Day`, `Late`, `Absent`) and track daily site rosters.
- **Corporate Company Approval**: Review GSTIN compliance, approve company registrations, and manage subscription tiers (`Basic`, `Pro`, `Enterprise`).
- **Analytics & Revenue Reporting**: Track active deployments, total wages disbursed, and workforce availability metrics.

### 🎨 3. Enterprise Design System & Authentication (`/login`)
- **Modern Dark/Light Themes**: Dynamic HSL color system with dark mode glassmorphism.
- **Strict Role-Based Authentication**: Separate Admin & Corporate Client portals with signed JWT session tokens.
- **Password Strength Evaluator**: Real-time strength meter (Weak, Medium, Strong) checking length, symbols, and uppercase characters.
- **Anti-Autofill Security**: Webkit security masking preventing browser password managers from force-filling saved credentials.

---

## 🛠️ Tech Stack & DevOps Infrastructure

| Domain | Technology / Tool Used | Purpose & Feature |
| :--- | :--- | :--- |
| **Frontend Core** | [Next.js 15.1 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/) | Server-Side Rendering (SSR) & Dynamic Route Optimization |
| **Authentication** | [JWT (HMAC SHA-256)](https://jwt.io/) | Secure Edge-compatible JSON Web Token session signing |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict Type safety (`tsc --noEmit`) & Interface definitions |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) & Vanilla CSS | Responsive design tokens & Dark/Light mode theme engine |
| **CI / CD Pipeline** | [Vercel Deployment Automation](https://vercel.com/) | Continuous integration, automatic previews & edge builds on `git push` |
| **Containerization** | [Docker](https://www.docker.com/) | Multi-stage production `Dockerfile` for Kubernetes / ECS deployment |
| **Quality & Linting** | [ESLint 9](https://eslint.org/) | Code quality auditing & standard formatting verification |
| **Hosting & Edge** | [Vercel Edge Network](https://vercel.com/) | Global CDN delivery, DNS management, SSL certification |

---

## 🐳 DevOps & Docker Deployment

LaborDesk includes a multi-stage production **`Dockerfile`** optimized for low-footprint container runtime.

```bash
# Build Docker Container Image
docker build -t labordesk:latest .

# Run Container Locally
docker run -p 3000:3000 labordesk:latest
```

---

## 🚀 Local Development Setup

### 1. Live Web Application
Access the production application live on Vercel:
👉 **[https://labor-desk.vercel.app](https://labor-desk.vercel.app)**

### 2. Clone & Run Locally
```bash
# Clone the repository
git clone https://github.com/Karthik18999/LaborDesk.git

# Navigate into project directory
cd LaborDesk

# Install dependencies
npm install

# Start local server
npm run dev
```

---

<div align="center">

Designed with ❤️ for **LaborDesk Workforce Technologies**

</div>
