<div align="center">

# 🏗️ LaborDesk — On-Demand Blue-Collar Workforce Management Platform

<p align="center">
  <b>Enterprise-grade workforce management platform connecting corporate infrastructure builders with physically verified, skilled blue-collar workers on-demand.</b>
</p>

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
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

## 🏢 Central Hub Office Locations

| Office Type | Address & Location | Contact Information |
| :--- | :--- | :--- |
| 📍 **Bengaluru Corporate Hub** | **7th Floor, Prestige Trade Tower**, Palace Road, High Grounds, Bengaluru, Karnataka - 560001 | 📞 **Helpline:** +91 80 4567 8900<br>📱 **Mobile:** +91 98800 12345 |
| 🏢 **Central Admin Hub** | **Tower B, 7th Floor, Cyber Park**, Sector 62, Noida, Uttar Pradesh - 201309 | ✉️ **Email:** `support@labordesk.in` |

---

## 🛠️ Technology Architecture

| Layer | Technology Used |
| :--- | :--- |
| **Framework** | [Next.js 15.1 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5 (Strict Null Checking)](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) with Vanilla CSS custom utilities |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Analytics Charts** | [Recharts](https://recharts.org/) |
| **Deployment** | [Vercel Edge Network](https://vercel.com/) |

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 2. Installation & Setup
```bash
# Clone the repository
git clone https://github.com/Karthik18999/LaborDesk.git

# Navigate into project directory
cd LaborDesk

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the platform.

### 4. Build for Production
```bash
npm run build
npm run start
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
├── public/                  # Static assets & brand assets
├── package.json
└── README.md
```

---

<div align="center">

Designed with ❤️ for **LaborDesk Workforce Technologies**

</div>
