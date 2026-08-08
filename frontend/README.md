# 🎨 Frontend Tier — LaborDesk

The **Frontend Tier** powers the client-side user interface for both the **Corporate Client Portal** and **Central Admin Operations Console**.

---

## 📁 UI Component Architecture

```text
frontend/
├── components/
│   ├── landing/            # Landing page hero, features, industries, FAQ, contact
│   └── shared/             # Header bar, AdminSidebar, CompanySidebar, Toast notifications
├── store/                  # React AppContext store & state management
├── styles/                 # Global CSS design tokens, HSL themes, glassmorphism
└── README.md
```

---

## 🌟 Key Features
- **Responsive Dual-Portal Layouts**: Tailored navigation sidebars for Admin (`/admin`) and Company (`/company`).
- **Interactive Workflow Stepper**: Dynamic progress stepper for tracking worker matching & site arrival.
- **Dynamic Theme Engine**: Dark/Light mode toggle with CSS custom properties.
- **Anti-Autofill Login Form**: Custom Webkit text security for password fields preventing browser password auto-fill.
