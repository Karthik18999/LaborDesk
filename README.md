<div align="center">

# 🏗️ LaborDesk — On-Demand Blue-Collar Workforce Management Platform

<p align="center">
  <b>Enterprise-grade workforce management platform connecting corporate infrastructure builders with physically verified, skilled blue-collar workers on-demand.</b>
</p>

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Deployment Status](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://labor-desk.vercel.app)

---

### 🌐 [Live Platform Demo ➔ labor-desk.vercel.app](https://labor-desk.vercel.app)

</div>

---

## 🌟 Overview

**LaborDesk** bridges the gap between large-scale corporate construction/industrial EPC firms and verified blue-collar laborers. Designed to solve physical labor supply chain bottlenecks, LaborDesk offers a dual-portal architecture featuring an **Enterprise Corporate Portal** for companies and a **Central Admin Operations Console** for physical registry management, candidate matching, and attendance auditing.

> 🔒 **Strict Access Policy:** Workers register physically in-person at central admin offices with Aadhaar verification. Blue-collar workers do not require online login accounts.

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
- **Strict Role-Based Authentication**: Separate Admin & Corporate Client portals with live email/password validation.
- **Password Strength Evaluator**: Real-time strength meter (Weak, Medium, Strong) checking length, symbols, and uppercase characters.
- **Anti-Autofill Security**: Webkit security masking preventing browser password managers from force-filling saved credentials.

---

## 🛠️ Tech Stack & DevOps Infrastructure

| Domain | Technology / Tool Used | Purpose & Feature |
| :--- | :--- | :--- |
| **Frontend Core** | [Next.js 15.1 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/) | Server-Side Rendering (SSR) & Dynamic Route Optimization |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict Type safety (`tsc --noEmit`) & Interface definitions |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) & Vanilla CSS | Responsive design tokens & Dark/Light mode theme engine |
| **CI / CD Pipeline** | [Vercel Deployment Automation](https://vercel.com/) | Continuous integration, automatic previews & edge builds on `git push` |
| **Containerization** | [Docker](https://www.docker.com/) | Multi-stage production `Dockerfile` for Kubernetes / ECS deployment |
| **Quality & Linting** | [ESLint 9](https://eslint.org/) | Code quality auditing & standard formatting verification |
| **Iconography & Charts** | [Lucide React](https://lucide.dev/) & [Recharts](https://recharts.org/) | Modern icons & enterprise analytics visualizers |
| **Hosting & Edge** | [Vercel Edge Network](https://vercel.com/) | Global CDN delivery, DNS management, SSL certification |

---

## 🐳 DevOps & Docker Deployment

LaborDesk includes a multi-stage production **`Dockerfile`** optimized for low-footprint container runtime.

### 1. Build Docker Container Image
```bash
docker build -t labordesk:latest .
```

### 2. Run Container Locally
```bash
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

## 📁 Repository Directory Structure

```text
LaborDesk/
├── src/
│   ├── app/
│   │   ├── admin/           # Central Admin Console routes & pages
│   │   ├── company/         # Corporate Client Portal routes & pages
│   │   ├── login/           # Authentication & Registration pages
│   │   ├── forgot-password/ # Password recovery page
│   │   ├── layout.tsx       # Root layout & theme providers
│   │   └── page.tsx         # Modern landing page
│   ├── components/
│   │   ├── landing/         # Hero, Features, Industries, FAQ, Contact
│   │   └── shared/          # Header, AdminSidebar, CompanySidebar, Toast
│   └── lib/
│       ├── store.tsx        # AppContext state manager & auth store
│       ├── mockData.ts      # Initial mock dataset (workers, companies)
│       └── types.ts         # TypeScript definitions & schemas
├── Dockerfile               # Multi-stage production Docker image definition
├── .dockerignore            # Container build exclusions
├── public/                  # Static assets & brand assets
├── package.json
└── README.md
```

---

<div align="center">

Designed with ❤️ for **LaborDesk Workforce Technologies**

</div>
