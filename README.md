# 🪦 Lil' Graveyard

A simple tool to track abandoned projects, uncover why they didn’t work out, and help you restart them with practical next steps.

---

## 🎯 Purpose

Developers start projects all the time and rarely finish them.

Project Graveyard helps users:
- Track unfinished projects
- Identify patterns in abandonment
- Reduce scope and restart intelligently
- Actually ship something (for once)

---

## 🧩 Core Features

### 1. Add Project
Users can create a project entry with:
- Name
- Description
- Tags (e.g. "web", "game", "AI")
- Start date
- Last worked date (auto-updated or manual)

Optional:
- GitHub repo link
- Notes

---

### 2. Project Status

Each project has a status:
- 🟢 Active
- 🟡 Paused
- 🔴 Abandoned

Possibly-
Auto-status logic (optional):
- No activity for X days → Paused
- No activity for Y days → Abandoned

---

### 3. Cause of Death ☠️

When marking a project as abandoned, user selects a reason:
- Lost interest
- Too complex
- Started something new
- Burnout
- Poor planning
- Other (custom)

---

### 4. Dashboard

Overview of all projects:
- Total projects
- Active vs Abandoned ratio
- Average project lifespan
- Most common "cause of death"

Visuals:
- Simple charts (bar/pie)
- Timeline of project activity

---

### 5. Project Detail Page

Displays:
- Full project info
- Timeline (created → last worked → abandoned)
- Notes / progress logs

---

### 6. Resurrection Mode 🔁

Allows users to revive a project.

System generates:
- ONE small next step
  - Example: "Set up basic project structure"
  - NOT: "Finish authentication system"

Optional:
- User can override or edit the suggestion

---

### 7. Activity Log

Users can log small updates:
- "Added login UI"
- "Set up database"

Used to:
- Track progress
- Power timeline visuals

---

### 8. Stats & Insights

Automatically generated insights:
- Average time before abandonment
- Most common failure stage
- Projects per category
- Peak productivity times

Optional "Roast Mode":
- Light humor insights
  - "You quit most projects after 2 days"

---

## 🖥️ UI / UX Design

### Design Style
- Clean, minimal
- Slight cyberpunk influence (dark mode, neon accents)
- Focus on readability and fast interaction
- Graves - pixel style?

---

### Main Screens

#### 1. Dashboard
- Project summary cards
- Stats section
- "Add Project" button (prominent)

---

#### 2. Project List
- Scrollable list/grid
- Filter by:
  - Status
  - Tags
- Sort by:
  - Last updated
  - Date created

---

#### 3. Project Detail
- Header (name, status)
- Timeline section
- Notes / logs
- "Resurrect" button

---

#### 4. Add Project Modal
- Simple form
- Fast input (low friction)

---

## 🏗️ Tech Stack (Suggested)

### Frontend
- React / Next.js
- Tailwind CSS
- Component library (optional)

### Backend
- Supabase (DB + Auth)
OR
- Node.js + Express + PostgreSQL

### Other
- GitHub API (optional integration)
- Chart library (Recharts / Chart.js)

---

## 📊 Metrics & Insights

Project Graveyard provides data-driven insights to help users understand their project habits and improve completion rates.

---

### 🔥 Core Metrics

#### Main Cause of Death
- The most common reason projects are abandoned
- Displayed with percentage breakdown

Example:
> Lost Interest (42%)

---

#### Average Project Lifespan
- Average time between project start and last activity
- Helps identify how long projects typically last

---

#### Abandonment Rate
- Percentage of projects marked as abandoned

Formula: abandoned/total projects * 100

---

#### Active vs Abandoned Ratio
- Visual comparison of active, paused, and abandoned projects

---

### 🧠 Behavioral Insights

#### Drop-off Point
- Identifies when users most often abandon projects

Example:
> Most projects are abandoned after 2–3 days

---

#### Failure Stage
- Determines the stage where projects typically fail:
  - Planning
  - Setup
  - Core Development
  - Polishing

---

#### Most Problematic Category
- Identifies which project tags/categories are most frequently abandoned

Example:
> "AI" projects have the highest abandonment rate

---

### ⏱️ Time-Based Metrics

#### Projects Started Per Time Period
- Number of projects started per week/month

---

#### Projects Completed Per Time Period
- Tracks completion trends over time

---

#### Longest Surviving Project
- Project with the longest active duration

---

#### Fastest Abandoned Project
- Project with the shortest lifespan

---

### 🔁 Recovery Metrics

#### Revival Rate
- Percentage of abandoned projects that are revisited

---

#### Successful Revivals
- Projects that transitioned from abandoned back to active and received updates

---

#### Average Steps to Restart
- Average number of logged actions after revival

---

### 😏 Optional Insight Messages

Lightweight, personality-driven insights based on user behavior:

- "You start more projects than you finish"
- "Most of your activity happens on day one"
- "You tend to abandon projects early in development"


---

### 🧱 Data Considerations

- Track cause_of_death as an enum or categorized string
- Store timestamps for:
  - project creation
  - last activity
  - status changes
- Aggregate metrics periodically or compute on demand

## 📊 Data Model (Simplified)

### Project
- id
- name
- description
- status
- start_date
- last_worked_date
- cause_of_death
- repo_link
- created_at

### ActivityLog
- id
- project_id
- message
- created_at

---

## 🚀 MVP Scope

Must-have:
- Add/edit projects
- Status tracking
- Cause of death
- Basic dashboard
- Project detail page

Nice-to-have:
- Resurrection Mode
- Stats & charts
- GitHub integration

---

## 🔮 Future Features

- AI-generated next steps (smarter resurrection)
- Social sharing (compare stats with friends)
- Public project graveyards
- Import from GitHub automatically
- Streak system for active projects

---

## ⚠️ Design Principles

- Reduce friction (fast input, minimal forms)
- Encourage small actions
- Avoid overwhelming users
- Be honest, but helpful

---

## 💀 Uh-Oh

If this app becomes another abandoned project,
it should automatically add itself to the graveyard.