# Real Estate Analysis Chatbot

AI-assisted platform for exploring rich real-estate datasets through natural-language conversations. Users can ask research-style questions, compare localities, export data, and view AI-generated summaries, charts, and tables—all powered by a React + Django stack.

## Table of Contents
1. [Architecture](#architecture)
2. [Core Features](#core-features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Project Setup](#project-setup)
6. [Environment Variables](#environment-variables)
7. [Loading the Dataset](#loading-the-dataset)
8. [Running the App](#running-the-app)
9. [API & Frontend Usage](#api--frontend-usage)
10. [Testing Guide](#testing-guide)
11. [Deployment Notes](#deployment-notes)
12. [Troubleshooting](#troubleshooting)

## Architecture

```
┌────────────┐      REST/JSON       ┌──────────────────────────┐
│ React +    │ <------------------> │ Django REST API          │
│ Vite UI    │                     │ (RealEstateDataProcessor) │
└────────────┘                     └──────────────┬───────────┘
       │                                         │
       │ WebSocket-ready Axios client            │ Pandas + DB (SQLite/Postgres)
       ▼                                         ▼
┌────────────────────────────────────────────────────────────────┐
│  RealEstateData (DB)  ← management command ←  Excel/GoogleSheet │
└────────────────────────────────────────────────────────────────┘
```

## Core Features
- 🧠 **NLP-driven queries** with automatic locality/year extraction and filter suggestions.
- 📈 **Chart.js visualizations** for prices, absorption, demand, and inventory metrics.
- 📊 **Data tables** with currency/number formatting and export-ready rows.
- 🤖 **OpenAI-powered summaries** (optional) for polished market commentary.
- ⬇️ **Data export endpoint** (CSV/XLSX) wired to the frontend download button.
- ⚙️ **Management command** to ingest Google Sheet/Excel data into the `RealEstateData` model.
- ✅ **Regression tests** covering data import and analysis filters.

## Tech Stack
| Layer      | Tools |
|------------|-------|
| Frontend   | React 18, Vite, Bootstrap 5, Chart.js, Axios, Framer Motion |
| Backend    | Django 4.2, Django REST Framework, pandas 2.x, OpenAI SDK |
| Data layer | SQLite (dev) / PostgreSQL (prod ready), RealEstateData model |
| Tooling    | Python 3.10+, Node 18+, npm, pytest/Django test runner |

## Prerequisites
- Node.js **18+** and npm
- Python **3.10+** with `pip`
- (Optionally) an OpenAI API key for AI summaries
- Excel/CSV file or Google Sheet URL containing the real-estate dataset

## Project Setup

### 1. Clone & create virtual env
```bash
git clone <repo_url>
cd real_estate_chatbot
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
```

### 2. Backend dependencies
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
```

### 3. Frontend dependencies
```bash
cd ../frontend
npm install
```

## Environment Variables
Create `backend/.env` (or export in shell):
```env
OPENAI_API_KEY=sk-your-key            # optional but required for AI summaries
REAL_ESTATE_DATA_URL=https://docs.google.com/...  # default Google Sheet CSV export
EXCEL_FILE_PATH=backend/data/real_estate_data.xlsx
```
Frontend environment (optional) lives in `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Loading the Dataset
Use the dedicated management command to populate the `RealEstateData` model:
```bash
cd backend
python manage.py import_real_estate_data --file data/real_estate_data.xlsx --truncate
# or fetch directly from Google Sheets
python manage.py import_real_estate_data --url "$REAL_ESTATE_DATA_URL" --truncate
```
Flags:
- `--file PATH` : local Excel/CSV file
- `--url URL`   : remote CSV/Google Sheet export
- `--truncate`  : wipe existing rows before import

The command handles numeric cleaning, date parsing, and bulk inserts.

## Running the App
1. **Backend API**
   ```bash
   cd backend
   python manage.py runserver 0.0.0.0:8000
   ```

2. **Frontend (Vite dev server)**
   ```bash
   cd frontend
   npm run dev -- --host
   ```

Visit `http://localhost:5173` and start chatting. The frontend proxies API calls to `http://localhost:8000/api` during development.

## API & Frontend Usage
- `/api/analyze/` – accepts `query`, `locality`, `year_from`, `year_to`, `property_type`.
- `/api/localities/` – returns available `final_location` values for filters.
- `/api/sample-queries/` – starter prompts displayed in the UI.
- `/api/export/` – POST with filters + `format` (csv|excel) to download dataset slices. Frontend `exportAnalysis` helper handles blob download. 

**UI Flow**
1. Landing screen seeds chat with welcome + sample queries.
2. User submits question; frontend shows spinner + messages.
3. Backend returns summary, chart datasets, table rows, metadata, and optional AI badge.
4. Users can click “Download Data” to receive CSV/XLSX using the above export endpoint.

## Testing Guide
Run from a clean virtual environment to cover regression cases (data import + filter logic):
```bash
cd backend
python manage.py test
```
The suite seeds in-memory datasets, executes the management command against fixtures, and asserts API filtering behavior. Extend with `--pattern="tests_*.py"` for granular control.

## Deployment Notes
- Build production frontend bundle:
  ```bash
  cd frontend
  npm run build
  ```
- Collect backend static assets (if serving via Django):
  ```bash
  cd backend
  python manage.py collectstatic
  ```
- Configure gunicorn/uvicorn + reverse proxy (Nginx) and point it at `core.wsgi`.
- Set environment variables (especially `OPENAI_API_KEY` and database credentials) in your hosting provider.

> Dockerfiles are not included yet—add them if you prefer containerized deployments.

## Troubleshooting
| Symptom | Fix |
|---------|-----|
| White screen on frontend | Check browser console; ensure backend `runserver` is running and `VITE_API_BASE_URL` points to it. |
| `RealEstateAnalysisView` errors on startup | Confirm migrations + data import succeeded and env vars are set. |
| Export download fails | Verify backend `/api/export/` response status and that filters/format are provided. |
| AI summary missing | Ensure `OPENAI_API_KEY` is valid; server logs will show initialization failures. |

## Sample Queries
- “Analyze real estate trends in Wakad.”
- “Compare average sale price between Wakad and Hinjewadi for 2020–2023.”
- “Show commercial absorption rates for Pune CBD.”

Enjoy exploring the data! Feel free to extend the serializers, add new visualizations, or integrate more ML-driven insights.
