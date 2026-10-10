# Diabetes Prediction System — Clinical Health Risk Analytics Frontend

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.1-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.1-22c55e)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-grade, responsive healthcare analytics web application designed for non-invasive diabetes risk stratification and population health indicator analysis. Built using modern React 19, Vite, Tailwind CSS, Lucide icons, and Recharts, this application implements the complete **21-feature clinical survey schema** established by the CDC Behavioral Risk Factor Surveillance System (BRFSS 2015).

---

## 1. Design System & Palette

Engineered specifically with a minimal, trustworthy healthcare SaaS visual identity:

- **Primary Navy**: `#142B4A` — Navbars, primary CTA buttons, dominant titles
- **Deep Navy**: `#0B1F36` — Footer, card backgrounds, high-contrast badges
- **Mist Blue**: `#EAF2FA` — Active navigation states, section accents, subtle backgrounds
- **Soft Blue**: `#D8E7F5` — Borders, micro-indicators
- **White**: `#FFFFFF` — Primary elevated card surfaces
- **Main Text**: `#1F2937` — High-contrast readable typography
- **Secondary Text**: `#64748B` — Accessible survey helper labels and metadata
- **Borders**: `#E2E8F0` — Restrained borders and card dividers
- **Accent Teal**: `#2A9D8F` — Healthy indicators, success states, visual highlights
- **Warning Amber**: `#D97706` — Cautionary indicators, BMI overweight alerts, dev mock banners
- **Error Red**: `#DC2626` — High-risk stratification, cardiovascular risk factors, validation alerts

---

## 2. Project Architecture

```text
Diabetes-prediction-system/
├── data/
│   └── raw/
│       └── diabetes_binary_health_indicators_BRFSS2015.csv  # 253,680 records
├── frontend/
│   ├── public/
│   │   └── logo.svg                                        # Heartbeat ECG favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx                              # Reusable button with variants & loaders
│   │   │   │   ├── EmptyState.jsx                          # Zero-state illustration and CTA
│   │   │   │   ├── ErrorMessage.jsx                        # Diagnostic error banner with retry
│   │   │   │   ├── Footer.jsx                              # Navigation & clinical disclaimer
│   │   │   │   ├── LoadingState.jsx                        # Fullscreen, card, and skeleton loaders
│   │   │   │   ├── Navbar.jsx                              # Responsive nav, active states & auth menu
│   │   │   │   ├── PageContainer.jsx                       # Page layout wrapper with breadcrumbs
│   │   │   │   └── StatCard.jsx                            # Metric KPI summary cards
│   │   │   ├── dashboard/
│   │   │   │   ├── ChartCard.jsx                           # Responsive Recharts container
│   │   │   │   ├── HealthInsightCard.jsx                   # Risk stratification & clinical notes
│   │   │   │   ├── IndicatorBadge.jsx                      # Clinical binary flag chips
│   │   │   │   └── PredictionCard.jsx                      # Output risk banner & factor chips
│   │   │   ├── forms/
│   │   │   │   ├── FormSection.jsx                         # Grouped card sections A through D
│   │   │   │   ├── InputField.jsx                          # Accessible text & number inputs
│   │   │   │   ├── RadioGroup.jsx                          # Segmented options & radio buttons
│   │   │   │   ├── SelectField.jsx                         # Standardized dropdowns
│   │   │   │   └── ToggleField.jsx                         # Interactive clinical switch controls
│   │   │   └── layout/
│   │   │       ├── AppLayout.jsx                           # Layout shell (Navbar + Outlet + Footer)
│   │   │       └── ProtectedRoute.jsx                      # Route authentication guard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx                             # User session & credentials state
│   │   │   └── PredictionContext.jsx                       # Form draft, assessment & history state
│   │   ├── pages/
│   │   │   ├── Home.jsx                                    # Page 1: Landing page & interactive preview
│   │   │   ├── Predict.jsx                                 # Page 2: 21 CDC features survey + BMI calculator
│   │   │   ├── Results.jsx                                 # Page 3: Prediction result breakdown
│   │   │   ├── Dashboard.jsx                               # Page 4: Recharts population analytics
│   │   │   ├── Login.jsx                                   # Page 5: Analyst sign in & demo session
│   │   │   ├── Register.jsx                                # Page 6: Analyst registration & validation
│   │   │   └── NotFound.jsx                                # 404 Route recovery page
│   │   ├── services/
│   │   │   ├── api.js                                      # Centralized fetch client with timeout
│   │   │   ├── authService.js                              # Flask JWT auth integration + mock fallback
│   │   │   └── predictionService.js                        # CDC model caller + local persistence
│   │   ├── utils/
│   │   │   ├── cdcSchema.js                                # CDC BRFSS 2015 21-feature schema
│   │   │   ├── formatters.js                               # Human-readable labels & date formatters
│   │   │   └── validation.js                               # Form & credentials validation rules
│   │   ├── App.jsx                                         # Router configuration & scroll restoration
│   │   ├── main.jsx                                        # React root mounting
│   │   └── index.css                                       # Tailwind directives & healthcare styles
│   ├── .env.example
│   ├── .env
│   ├── index.html                                          # Inter font & branding meta tags
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js                                      # Path aliases & vendor chunk splitting
├── .env.example
├── check_dataset.py
├── package.json                                            # Root workspace scripts
└── README.md
```

---

## 3. CDC BRFSS 2015 Feature Schema

The system ingests all **21 input features** required by the CDC Diabetes Health Indicators model. The target column `Diabetes_binary` is excluded from user input.

| Section | Feature Key | Data Type | Permitted Values & Description |
| :--- | :--- | :--- | :--- |
| **Section A: Basic Info** | `Age` | Categorical (1–13) | 1=18-24, 2=25-29, 3=30-34, 4=35-39, ..., 13=80+ |
| | `Sex` | Binary | 0 = Female, 1 = Male |
| | `BMI` | Continuous | Body Mass Index in kg/m² (Typical range: 12.0 – 98.0) |
| | `GenHlth` | Ordinal (1–5) | 1 = Excellent, 2 = Very Good, 3 = Good, 4 = Fair, 5 = Poor |
| **Section B: Medical History** | `HighBP` | Binary | 0 = No, 1 = Diagnosed High Blood Pressure |
| | `HighChol` | Binary | 0 = No, 1 = Diagnosed High Blood Cholesterol |
| | `CholCheck` | Binary | 0 = No, 1 = Blood Cholesterol Checked within past 5 years |
| | `Stroke` | Binary | 0 = No, 1 = History of Stroke / CVA |
| | `HeartDiseaseorAttack` | Binary | 0 = No, 1 = History of CAD or Myocardial Infarction |
| | `DiffWalk` | Binary | 0 = No, 1 = Serious difficulty walking or climbing stairs |
| **Section C: Lifestyle** | `Smoker` | Binary | 0 = No, 1 = Smoked ≥100 cigarettes in lifetime |
| | `PhysActivity` | Binary | 0 = No, 1 = Any physical activity in past 30 days (excluding job) |
| | `Fruits` | Binary | 0 = No, 1 = Consumes fruit ≥1 time per day |
| | `Veggies` | Binary | 0 = No, 1 = Consumes vegetables ≥1 time per day |
| | `HvyAlcoholConsump` | Binary | 0 = No, 1 = Heavy alcohol consumption (Men ≥14/wk, Women ≥7/wk) |
| **Section D: Healthcare & Additional** | `AnyHealthcare` | Binary | 0 = No, 1 = Any healthcare coverage (insurance/Medicare/Medicaid) |
| | `NoDocbcCost` | Binary | 0 = No, 1 = Could not visit doctor in past 12m due to cost |
| | `MentHlth` | Integer (0–30) | Days of poor mental health in past 30 days |
| | `PhysHlth` | Integer (0–30) | Days of poor physical health/injury in past 30 days |
| | `Education` | Categorical (1–6) | 1 = Never attended, 2 = Elementary, 3 = Some HS, 4 = HS grad, 5 = Some college, 6 = College grad |
| | `Income` | Categorical (1–8) | 1 = <$10k, 2 = $10k-$15k, ..., 8 = ≥$75k |

---

## 4. Quick Start & Execution Commands

### Prerequisites
- Node.js (v18+ or v24+ recommended)
- npm (v9+)

### Installation & Execution from Workspace Root
You can run the application directly from the root workspace or from inside `frontend/`:

```powershell
# 1. Install dependencies
npm --prefix frontend install

# 2. Run the Vite development server
npm run dev
```

The application will be live at:
👉 **`http://localhost:5173`**

### Alternative: Commands inside `frontend/`
```powershell
cd frontend
npm install
npm run dev
```

### Production Build & Preview
```powershell
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Backend Integration Readiness

The frontend is fully decoupled and configured to integrate with a Flask machine learning backend via the centralized `src/services/api.js` client.

### Environment Configuration (`.env`)
```bash
# Flask Backend API Base URL
VITE_API_BASE_URL=http://127.0.0.1:5000/api

# Standalone development fallback (provides simulated assessment when backend is offline)
VITE_USE_MOCK_FALLBACK=true

# Request timeout in milliseconds
VITE_API_TIMEOUT_MS=10000
```

### Planned Backend API Endpoints

| Endpoint | Method | Expected Request Payload | Response Schema |
| :--- | :--- | :--- | :--- |
| `/api/predict` | `POST` | JSON object containing 21 CDC feature keys | `{ "prediction": 0 \| 1, "probability": 0.24, "risk_level": "Low Risk", "contributing_factors": [...], "model_version": "v1.0" }` |
| `/api/auth/login` | `POST` | `{ "email": "...", "password": "..." }` | `{ "token": "jwt_token", "user": { "id": "...", "name": "...", "email": "..." } }` |
| `/api/auth/register` | `POST` | `{ "name": "...", "email": "...", "password": "..." }` | `{ "token": "jwt_token", "user": { ... } }` |
| `/api/auth/me` | `GET` | Authorization: `Bearer <token>` | `{ "user": { "id": "...", "name": "...", "email": "..." } }` |
| `/api/assessments` | `GET` | Authorization: `Bearer <token>` | `[{ "id": "...", "assessmentDate": "...", "prediction": 0, "probability": 0.18, "inputs": { ... } }]` |

### Transparent Development / Mock Mode
When the Flask API server is not running, the application gracefully operates in **Development Mode**:
- `predictionService.js` executes a realistic, deterministic logistic inference algorithm modeling CDC BRFSS empirical weights.
- All mock assessments and sessions are visibly flagged with an amber **`DEVELOPMENT SIMULATED ASSESSMENT`** banner.
- Form inputs, results, and history are persisted in browser storage and seamlessly sync with the analytics dashboard.

---

## 6. Manual Testing Checklist

| Page / Feature | Test Procedure | Expected Outcome | Status |
| :--- | :--- | :--- | :---: |
| **Home (`/`)** | 1. Navigate to `/`.<br>2. Click "Start Health Assessment".<br>3. Click anchor links "How It Works" & "Features". | Hero, trust badges, workflow cards render cleanly. Buttons route properly to `/predict`. Smooth scrolls to sections. | ✅ Passed |
| **Form (`/predict`)** | 1. Navigate to `/predict`.<br>2. Clear required fields and click "Analyze Health Risk".<br>3. Open BMI Calculator, input 175 cm and 75 kg, click "Compute & Apply BMI".<br>4. Fill all 21 fields and submit. | Validation warnings display for empty/invalid fields. BMI computes to `24.5 kg/m²` (Normal). Form submits with loader overlay to `/results`. | ✅ Passed |
| **Results (`/results`)** | 1. Review results page after submission.<br>2. Check predicted category, model risk index, and factors.<br>3. Click "Edit Submitted Form". | Prediction card renders with risk breakdown. Indicator summary matches submitted values. Navigating back preserves form draft. | ✅ Passed |
| **Dashboard (`/dashboard`)** | 1. Navigate to `/dashboard`.<br>2. Check summary cards (Risk, BMI, Health, History).<br>3. Inspect Recharts (BMI distribution and protective factor adherence).<br>4. Click "New Assessment" and submit a second profile to verify the chronological trajectory line chart. | Charts render smoothly with custom tooltips. History tracking displays multi-session trendline. | ✅ Passed |
| **Login (`/login`)** | 1. Navigate to `/login`.<br>2. Enter email and password; toggle password show/hide.<br>3. Click "Sign In". | Eye toggle reveals/hides text. Authentication initiates session and redirects to dashboard with user avatar in Navbar. | ✅ Passed |
| **Register (`/register`)** | 1. Navigate to `/register`.<br>2. Test mismatching passwords & unchecking terms.<br>3. Submit valid account details. | Validation flags mismatched passwords and terms checkbox. Valid input creates session. | ✅ Passed |
| **404 Route (`/*`)** | 1. Navigate to an unknown URL like `/random-page`. | Displays professional "Clinical Route Not Located" 404 page with return buttons. | ✅ Passed |
| **Responsiveness** | 1. Test at 375px (Mobile), 768px (Tablet), and 1440px (Desktop). | Mobile hamburger drawer opens smoothly. Form sections collapse to single column. No horizontal overflow or action clipping. | ✅ Passed |

---

## 7. Clinical Disclaimer

> **IMPORTANT**: The predictions and analytics produced by this application are derived from epidemiological survey data (CDC BRFSS 2015) and statistical machine learning algorithms. They are intended strictly for educational, informational, and preventative screening demonstration purposes. They do not constitute formal medical diagnoses, clinical advice, or treatment regimens. Individuals should always consult certified physicians for clinical blood glucose diagnostic tests (e.g., HbA1c, fasting plasma glucose).

