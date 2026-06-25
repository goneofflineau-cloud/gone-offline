# PRD — Mission Control (Gone Offline)

**Version:** 1.0  
**Date:** 11-06-2026  
**Owner:** Zoe Lai / Gone Offline  
**Build surface:** Claude Cowork  
**Build length:** ~5 hours  

---

## §1. Executive Summary

Mission Control is a personal AI operating system inside Claude Cowork that unifies the recurring operational work of Gone Offline into a single local workspace. It replaces scattered Google Sheets, manual Xero checks, and ad-hoc note-keeping with a data layer → workflow → interface stack that is always current and always local.

**Domains in this build:**

| Domain | Status | What it does |
|---|---|---|
| Content & Collabs | ✅ Fully built | Brand deal pipeline, content calendar, deliverable tracking, rate management |
| Finance & Revenue | ✅ Fully built | Revenue vs. FY26 $180K goal, invoice status, Xero pull, 3-stream tracking |
| Property | 📁 Placeholder | Folder skeleton ready; workflows deferred to next build window |
| Morning Brief | ✅ Always included | 7:30am daily digest from content + finance data layers |

**Interaction patterns used:**
- **Dashboard** — `dashboard.html`, always-on visual across both live domains
- **Brief/digest** — `briefs/brief-DD-MM-YYYY.md`, scheduled daily push at 7:30am AEST
- **Skills** — 4 on-demand slash commands covering collab checks, revenue snapshots, invoice status, and content ideas

**Why it fits 5 hours:** Two domains fully built with real schemas, refresh workflows, and skills. Property deferred cleanly as a placeholder — one future session activates it without restructuring anything. The architecture scales to 4 domains without changing the root shape.

---

## §2. Quick Start — Moving This Into Cowork

### Getting into Cowork (you do this)

1. Open **Claude Cowork** on your desktop.
2. Create a new project pointed at a local folder — use `~/cowork/` (or `~/Cowork/Mission Control/` if you prefer to keep it alongside this file).
3. Drop `PRD-mission-control.md` into that folder, or paste the contents of this file into the first Cowork message.
4. This is the first time Cowork touches this project — nothing is set up yet.

### Project instructions — paste this into the Cowork project's custom-instructions field

```
You are managing Mission Control — a personal AI operating system for Zoe Lai / Gone Offline.

Active domains: content (brand collabs, content calendar), finance (revenue tracking, Xero, FY26 goal).
Placeholder domain: property (folder exists, not yet built).

Local data layer: ~/cowork/ — all reads and writes go to local files only.
Connectors (Gmail, Google Calendar, Google Drive, Xero) are data sources only — never storage.

CRITICAL rules:
- inputs/ directories are human-maintained. NEVER overwrite any file inside any inputs/ folder.
- Nothing is sent externally, posted publicly, or written to Xero without Zoe's explicit go-ahead.
- All outputs are local drafts only.

Date format: DD-MM-YYYY everywhere — file names, data fields, display.
Timezone: Melbourne AEST/AEDT (UTC+10 standard, UTC+11 daylight saving).

Execution rule: build one block at a time, in order. After each block, report what was done and the done-check result, then wait for "go ahead" before the next block.
```

### How to run the build

When you paste this PRD into Cowork and say the start phrase, Cowork will:
1. Run **Block 0 (Setup)** first — verifying the Productivity plugin, running `/start`, and confirming connectors. Nothing else starts until setup is confirmed.
2. Build each subsequent block in order, reporting completion and waiting for your go-ahead before proceeding.
3. Never proceed past a block if a done-check fails.

### The first thing you say

> **"Start building — begin with Block 0."**

---

## §3. Goals and Non-Goals

### Goals
- Single local workspace that surfaces the state of Gone Offline's content pipeline and revenue without manual aggregation
- Morning brief that takes zero effort to produce
- On-demand skills for the 4 questions asked most often: what collabs are live, what's the revenue position, what invoices are outstanding, what content ideas are in the hopper
- Data layer that survives session restarts — all state is in local files, not model context

### Non-goals (this build)
- **Property domain workflows** — deferred. Placeholder folder only.
- **Auto-posting or scheduling to Instagram/TikTok** — never automated without explicit approval
- **Outbound comms** — no emails, DMs, or pitches sent automatically
- **Xero writes** — read-only. Invoice creation, categorisation, and any Xero mutation requires explicit approval
- **AECOM / corporate domain** — out of scope; too context-specific and not part of Gone Offline ops
- **Content production** (scripting, editing) — Mission Control is ops infrastructure, not a content studio
- **Google Ads / analytics pipelines** — future domain if needed
- **Web dashboard / public-facing view** — all outputs are local

---

## §4. Architecture Overview

### Three layers

```
Local files (~/cowork/)
    ↕ read/write
Cowork project (Claude + Productivity plugin)
    ↕ pull only
Connectors (Gmail, Google Calendar, Google Drive, Xero)
```

Connectors are **sources**, never storage. The data layer is entirely local plain files. If the folder lives inside a Dropbox or iCloud-synced directory, it gets cloud backup for free — but Cowork always reads and writes the local path.

### Interaction patterns and which workflows use them

| Pattern | Workflow | Trigger |
|---|---|---|
| Dashboard | `dashboard.html` | Always-on, opened any time |
| Brief/digest | Morning Brief | Scheduled 7:30am AEST daily |
| Skill | `/check-collabs` | On-demand |
| Skill | `/revenue-snapshot` | On-demand |
| Skill | `/invoice-status` | On-demand |
| Skill | `/content-ideas` | On-demand |

### Three-tier memory architecture

| Tier | File | Contents |
|---|---|---|
| 1 — Cross-cutting | `CLAUDE.md` (root) | People (brands, contacts, agents), terminology, shorthand, operational rules |
| 2 — Domain deep memory | `memory/content/`, `memory/finance/` | Collab history, brand notes, rate logic, revenue context |
| 3 — Domain voice/role | `content/CLAUDE.md`, `finance/CLAUDE.md` | Tone and role when working inside that domain |

### Key architectural decisions

See §9 Decision Log for full reasoning. Short version:
- **Local-first data** — connectors are unreliable session-to-session; local JSON is the stable state
- **Inputs/ never auto-overwritten** — rate card, targets, and notes are human truth; refresh only writes to data/
- **Xero read-only** — no mutations without explicit approval; finance data/ is a cached pull
- **DD-MM-YYYY throughout** — matches Zoe's locale (AU) and avoids ambiguity with US date formats in Drive files

---

## §5. The Data Layer

### Where it lives

`~/cowork/` — a local folder the Cowork project points at. All files below are local. Connectors pull data *into* this layer on refresh; they are never the source of truth.

### Full folder tree

```
~/cowork/
├── CLAUDE.md                        ← cross-cutting working memory: people, terminology, rules
├── TASKS.md                         ← Productivity plugin task list (auto-created by /start)
├── dashboard.html                   ← unified live dashboard (built in Block 4)
├── PRD-mission-control.md           ← this PRD, kept at root for reference
│
├── memory/                          ← Productivity plugin deep memory
│   ├── people.md                    ← brands, contacts, agents, managers — with context
│   ├── terminology.md               ← rates terminology, collab terms, internal shorthand
│   ├── content/
│   │   ├── collab-history.md        ← completed deals: brand, rate, usage, outcome
│   │   └── brand-notes.md           ← per-brand dos/don'ts, POC names, preferred formats
│   └── finance/
│       ├── stream-context.md        ← notes on each income stream's quirks and seasonality
│       └── fy26-notes.md            ← FY26 goal context, milestone markers
│
├── toolbox/                         ← custom skill source files (built in Block 4)
│   ├── check-collabs.md
│   ├── revenue-snapshot.md
│   ├── invoice-status.md
│   └── content-ideas.md
│
├── briefs/                          ← morning brief outputs
│   ├── brief-DD-MM-YYYY.md          ← today's brief (overwritten daily)
│   └── archive/                     ← past briefs: brief-DD-MM-YYYY.md (append-only)
│
├── content/                         ← Content & Collabs domain
│   ├── CLAUDE.md                    ← role: collab manager; tone: direct, numbers-first
│   ├── inputs/                      ← HUMAN-MAINTAINED — never auto-overwritten
│   │   ├── content-calendar.csv     ← upcoming posts: date, platform, brief, collab flag
│   │   └── rate-card.md             ← base rates, usage uplift logic, exclusivity tiers
│   ├── data/                        ← machine-refreshed on schedule
│   │   ├── collabs.json             ← active and recent brand deals (schema below)
│   │   └── pipeline.json            ← deals by stage: prospect → negotiating → confirmed → live → delivered → invoiced
│   └── outputs/                     ← generated artifacts
│       ├── collab-brief-DD-MM-YYYY.md    ← collab section of morning brief
│       └── content-ideas-DD-MM-YYYY.md   ← ideas output from /content-ideas skill
│
├── finance/                         ← Finance & Revenue domain
│   ├── CLAUDE.md                    ← role: finance analyst; tone: precise, goal-oriented
│   ├── inputs/                      ← HUMAN-MAINTAINED — never auto-overwritten
│   │   ├── fy26-targets.md          ← FY26 $180K goal breakdown by stream and month
│   │   └── stream-notes.md          ← notes on content rev, AECOM salary, property income
│   ├── data/                        ← machine-refreshed on schedule
│   │   ├── revenue.json             ← income by stream, month, and transaction (schema below)
│   │   └── invoices.json            ← invoice status pulled from Xero (schema below)
│   └── outputs/
│       ├── finance-brief-DD-MM-YYYY.md   ← finance section of morning brief
│       └── monthly-snapshot-MM-YYYY.md   ← monthly P&L summary
│
└── property/                        ← 📁 PLACEHOLDER — not built this session
    ├── CLAUDE.md                    ← stub only
    ├── inputs/
    ├── data/
    └── outputs/
```

### Data file schemas

#### `content/data/collabs.json`

```json
{
  "last_refreshed": "11-06-2026",
  "collabs": [
    {
      "id": "collab-001",
      "brand": "Wanderlust Hotels",
      "status": "live",
      "stage": "delivered",
      "brief_summary": "2-night stay at Daylesford property, 1x Reel + 3x Stories",
      "deliverables": ["1x Reel", "3x Stories"],
      "due_date": "15-06-2026",
      "fee_aud": 3500,
      "usage_rights": "6 months social",
      "exclusivity": "none",
      "invoice_sent": false,
      "invoice_id": null,
      "notes": "Usage rights to be confirmed in contract",
      "contact": "Sarah B <sarah@wanderlusthotels.com.au>"
    }
  ]
}
```

#### `content/data/pipeline.json`

```json
{
  "last_refreshed": "11-06-2026",
  "pipeline": [
    {
      "id": "pipe-001",
      "brand": "Mornington Estate",
      "stage": "negotiating",
      "format": "1x Reel + carousel",
      "proposed_fee_aud": 2800,
      "next_action": "Follow up on rate approval",
      "next_action_date": "13-06-2026",
      "notes": "They came in low — countered at 2800"
    }
  ]
}
```

#### `finance/data/revenue.json`

```json
{
  "last_refreshed": "11-06-2026",
  "fy": "FY26",
  "fy_goal_aud": 180000,
  "streams": {
    "content": {
      "ytd_aud": 42000,
      "monthly": [
        { "month": "07-2025", "amount_aud": 6500 },
        { "month": "08-2025", "amount_aud": 7200 }
      ]
    },
    "corporate": {
      "ytd_aud": 95000,
      "monthly": [
        { "month": "07-2025", "amount_aud": 7916 }
      ]
    },
    "property": {
      "ytd_aud": 18000,
      "monthly": [
        { "month": "07-2025", "amount_aud": 1500 }
      ]
    }
  },
  "total_ytd_aud": 155000
}
```

#### `finance/data/invoices.json`

```json
{
  "last_refreshed": "11-06-2026",
  "invoices": [
    {
      "invoice_id": "INV-0042",
      "brand": "Wanderlust Hotels",
      "amount_aud": 3500,
      "issued_date": "01-06-2026",
      "due_date": "30-06-2026",
      "status": "sent",
      "days_overdue": 0,
      "xero_status": "AUTHORISED",
      "notes": ""
    }
  ]
}
```

### Inputs vs. data

| File | Type | Who writes | Rule |
|---|---|---|---|
| `content/inputs/content-calendar.csv` | Input | Zoe | Never auto-overwritten |
| `content/inputs/rate-card.md` | Input | Zoe | Never auto-overwritten |
| `finance/inputs/fy26-targets.md` | Input | Zoe | Never auto-overwritten |
| `finance/inputs/stream-notes.md` | Input | Zoe | Never auto-overwritten |
| `content/data/collabs.json` | Data | Cowork (from Drive/manual) | Overwrite on refresh, preserve history in memory/ |
| `content/data/pipeline.json` | Data | Cowork (from Drive/manual) | Overwrite on refresh |
| `finance/data/revenue.json` | Data | Cowork (from Xero pull) | Overwrite on refresh |
| `finance/data/invoices.json` | Data | Cowork (from Xero pull) | Overwrite on refresh |

### Memory file contents

**`memory/people.md`** — one entry per brand/contact: name, role, email, relationship notes, last collab date.  
**`memory/terminology.md`** — rate tiers, collab stage definitions, platform shorthand (IG=Instagram, TT=TikTok), internal project codenames.  
**`memory/content/collab-history.md`** — completed deals with outcomes; used by `/check-collabs` and `/content-ideas` for context.  
**`memory/content/brand-notes.md`** — per-brand notes on tone, format preferences, POC quirks.  
**`memory/finance/stream-context.md`** — seasonality notes per stream (e.g. content revenue peaks Dec-Feb, property income is flat monthly).  
**`memory/finance/fy26-notes.md`** — milestone markers, target breakdown logic, any mid-year adjustments.

### Refresh strategy

| File | Source | Frequency | Method |
|---|---|---|---|
| `content/data/collabs.json` | Google Drive (collab tracker sheet) or manual | On-demand via `/check-collabs` | Full overwrite; prior state saved to memory if significant change |
| `content/data/pipeline.json` | Google Drive (collab tracker sheet) or manual | On-demand | Full overwrite |
| `finance/data/revenue.json` | Xero (read-only) | On-demand via `/revenue-snapshot`, or daily as part of morning brief | Full overwrite |
| `finance/data/invoices.json` | Xero (read-only) | On-demand via `/invoice-status`, or daily as part of morning brief | Full overwrite |
| `briefs/brief-DD-MM-YYYY.md` | Generated from data/ | Daily 7:30am AEST | Overwrite today's file; copy previous to archive/ |

---

## §6. Component Specifications

### Morning Brief

**Purpose:** Single daily document that surfaces what matters across both domains without opening anything manually.  
**Schedule:** 7:30am AEST daily (scheduled task).  
**Reads:** `content/data/collabs.json`, `content/data/pipeline.json`, `content/inputs/content-calendar.csv`, `finance/data/revenue.json`, `finance/data/invoices.json`, Google Calendar (today's events).  
**Writes:** `briefs/brief-DD-MM-YYYY.md` (overwrites), copies previous day's to `briefs/archive/`.  
**Output structure:**

```
# Brief — DD-MM-YYYY

## Today
- Calendar: [events from Google Calendar]
- Shoots or posts due today

## Collabs
- Live deliverables due this week
- Deals awaiting action (next_action_date ≤ today + 3 days)
- Invoices overdue or due within 7 days

## Revenue
- YTD total vs. FY26 goal ($180K): [amount] / $180,000 ([%])
- Content stream YTD: [amount]
- This month vs. same month last year (if data available)

## Pipeline
- Deals in negotiating or prospect stage
- Next actions due

## Flags
- Anything overdue, blocked, or needing a decision
```

---

### Content & Collabs — Data Refresh Workflow

**Purpose:** Keep `collabs.json` and `pipeline.json` current by pulling from the Google Drive collab tracker.  
**Reads:** Google Drive (collab tracker Google Sheet, specified in `content/CLAUDE.md`).  
**Writes:** `content/data/collabs.json`, `content/data/pipeline.json`.  
**CRITICAL:** Never writes to `content/inputs/`.  
**Trigger:** On-demand (called by `/check-collabs`) or manually.

---

### Finance & Revenue — Data Refresh Workflow

**Purpose:** Pull current invoice and revenue data from Xero into local JSON files.  
**Reads:** Xero (read-only) — invoice list, payment status, account transactions.  
**Writes:** `finance/data/revenue.json`, `finance/data/invoices.json`.  
**CRITICAL:** Never writes to `finance/inputs/`. Never creates, modifies, or deletes anything in Xero.  
**Trigger:** On-demand (called by `/revenue-snapshot` or `/invoice-status`) or as part of morning brief.

---

### Dashboard (`dashboard.html`)

**Purpose:** Always-on visual view of both domains. Open in browser; refreshes on reload.  
**Reads:** All `data/*.json` files, `briefs/brief-DD-MM-YYYY.md`.  
**Writes:** Nothing.  
**Panels:**

| Panel | Contents |
|---|---|
| Revenue | YTD bar vs. $180K goal; stream breakdown; content revenue trend |
| Collabs | Pipeline kanban (prospect → invoiced); deliverables due this week |
| Invoices | Outstanding invoices with days-to-due; overdue flagged red |
| Today | Today's calendar events + posts/shoots due today |
| Brief | Latest morning brief rendered inline |

---

### Skill: `/check-collabs`

**Purpose:** On-demand full collab status report — what's live, what's due, what needs action.  
**Reads:** `content/data/collabs.json`, `content/data/pipeline.json`, `memory/content/collab-history.md`.  
**Writes:** Nothing (read-only output to chat).  
**Output:** Structured status by stage, flagging anything overdue or needing a follow-up within 3 days.

---

### Skill: `/revenue-snapshot`

**Purpose:** Instant revenue position — YTD across all 3 streams vs. FY26 goal.  
**Reads:** `finance/data/revenue.json`, `finance/inputs/fy26-targets.md`.  
**Writes:** Nothing.  
**Output:** YTD total, per-stream breakdown, % of goal, projected year-end based on current run rate.

---

### Skill: `/invoice-status`

**Purpose:** Which invoices are outstanding, overdue, or approaching due date.  
**Reads:** `finance/data/invoices.json`.  
**Writes:** Nothing.  
**Output:** Grouped by status (overdue / due within 7 days / sent / paid); flags anything needing a follow-up.

---

### Skill: `/content-ideas`

**Purpose:** Generate on-brand content ideas using current collab context and calendar.  
**Reads:** `content/inputs/content-calendar.csv`, `content/data/collabs.json`, `memory/content/brand-notes.md`, `CLAUDE.md` (voice/niche context).  
**Writes:** `content/outputs/content-ideas-DD-MM-YYYY.md`.  
**Output:** 5–8 ideas, each with: platform, format, hook, collab angle (if applicable), suggested post window.

---

## §7. The Build Plan

| Block | What gets built | Who runs it | Output | Done when… |
|---|---|---|---|---|
| **Block 0** | **Setup:** verify Productivity plugin installed; run `/start`; confirm Gmail, Calendar, Drive, Xero connectors enabled | **Me** (guided by Cowork) | CLAUDE.md, TASKS.md, memory/, dashboard.html stubs at root | All 4 connectors confirmed active; `/start` output visible |
| **Block 1** | **Data layer:** full folder tree created; all `inputs/` files created with seed content; all `data/*.json` created with schema + example values; `memory/` files seeded | **Cowork** | Complete folder tree; all files readable | Every folder exists; `ls ~/cowork/` matches §5 tree exactly; JSON files are valid |
| **Block 2** | **Content domain:** `content/CLAUDE.md` written; data refresh workflow for `collabs.json` + `pipeline.json` built and tested; `/check-collabs` skill installed | **Cowork** | Working collab refresh; `/check-collabs` returns output | `/check-collabs` runs and returns a status report using data from `content/data/` |
| **Block 3** | **Finance domain:** `finance/CLAUDE.md` written; Xero pull workflow for `revenue.json` + `invoices.json` built and tested; `/revenue-snapshot` and `/invoice-status` skills installed | **Cowork** | Working Xero read; both skills return output | Both skills return output; no Xero writes have occurred |
| **Block 4** | **Morning brief + remaining skills:** brief template built and scheduled (7:30am AEST); `/content-ideas` skill installed; `toolbox/` source files written | **Cowork** | Scheduled morning brief; all 4 skills working | Brief runs on-demand and produces correctly structured `briefs/brief-DD-MM-YYYY.md`; all 4 skills callable |
| **Block 5** | **Polish:** `dashboard.html` built with all 5 panels; `memory/` files fully seeded from Zoe's known context; `property/` placeholder folder created with stub CLAUDE.md; root CLAUDE.md populated | **Cowork** | Working dashboard; memory seeded; property placeholder ready | Dashboard opens in browser and renders without errors; property folder exists |

### Cut order (if running behind)

1. `dashboard.html` full build → leave as stub (brief still works without it)
2. `/content-ideas` skill → defer to next session
3. Memory seeding (can be done incrementally over time)
4. Property placeholder → trivial, do last or skip

### Never cut

- Block 0 (Setup)
- Block 1 (Data layer — everything else depends on it)
- Morning brief (core daily value)
- `/check-collabs` and `/revenue-snapshot` (the two highest-frequency skills)

---

## §8. Setup Details and Copy-Paste Prompts

### Folder creation step (Block 1)

Cowork runs this as part of Block 1. Paste if needed:

```
Create the full folder tree for Mission Control at ~/cowork/ as specified in §5 of the PRD.
Create every folder. Then create each inputs/ file with seed content and each data/*.json file
with the schema and example values from §5. Create all memory/ files with their described contents.
CRITICAL: Do not write to any inputs/ file after initial creation — they are human-maintained.
Confirm by listing the full tree when done.
```

---

### Morning Brief prompt (scheduled, 7:30am AEST)

```
You are running the Mission Control morning brief for Zoe (Gone Offline).

Read the following files:
- ~/cowork/content/data/collabs.json
- ~/cowork/content/data/pipeline.json
- ~/cowork/content/inputs/content-calendar.csv
- ~/cowork/finance/data/revenue.json
- ~/cowork/finance/data/invoices.json

Also pull today's events from Google Calendar.

First, copy the existing ~/cowork/briefs/brief-[yesterday's date in DD-MM-YYYY].md
to ~/cowork/briefs/archive/ if it exists and is not already there.

Then write a new file: ~/cowork/briefs/brief-[today's date in DD-MM-YYYY].md

Structure it exactly as:

# Brief — [DD-MM-YYYY]

## Today
[Today's calendar events. Shoots, posts, or meetings.]

## Collabs
[Live deliverables due this week. Deals with next_action_date ≤ today + 3 days. Invoices overdue or due within 7 days.]

## Revenue
[YTD total vs. $180,000 FY26 goal. Per-stream breakdown. Projected year-end at current run rate.]

## Pipeline
[Deals in negotiating or prospect stage. Next actions due.]

## Flags
[Anything overdue, blocked, or needing a decision — be direct and specific.]

CRITICAL: Do not write to any inputs/ directory. Do not create, modify, or delete anything in Xero.
Output only the brief file. Confirm the file path when done.
```

---

### Content data refresh prompt (called by `/check-collabs`)

```
You are refreshing the content data layer for Mission Control.

Pull the current collab tracker from Google Drive (file name or path is in ~/cowork/content/CLAUDE.md).
Parse the active deals and pipeline stages.

Write the results to:
- ~/cowork/content/data/collabs.json (schema in §5 of PRD-mission-control.md)
- ~/cowork/content/data/pipeline.json (schema in §5 of PRD-mission-control.md)

Set last_refreshed to today's date in DD-MM-YYYY format.

CRITICAL: Do not write to ~/cowork/content/inputs/ or any other inputs/ directory.

Then produce a status report in chat:
- Deliverables due this week
- Deals needing action within 3 days (check next_action_date)
- Invoices not yet sent for delivered collabs
- Anything overdue

Be direct and specific. Flag anything that needs Zoe's attention today.
```

---

### Finance data refresh prompt (called by `/revenue-snapshot` and `/invoice-status`)

```
You are refreshing the finance data layer for Mission Control.

Pull from Xero (read-only):
1. Current invoice list with status, amounts, issue dates, due dates
2. Account transactions for the current financial year (FY26: 01-07-2025 to 30-06-2026),
   categorised by income stream where possible

Write the results to:
- ~/cowork/finance/data/invoices.json (schema in §5 of PRD-mission-control.md)
- ~/cowork/finance/data/revenue.json (schema in §5 of PRD-mission-control.md)

Set last_refreshed to today's date in DD-MM-YYYY format.

CRITICAL: Do not create, update, or delete anything in Xero. Read-only only.
CRITICAL: Do not write to ~/cowork/finance/inputs/ or any other inputs/ directory.

After writing the files, produce the requested output (snapshot or invoice status — as specified
by the skill that called this prompt).
```

---

### `/revenue-snapshot` skill prompt

```
Read ~/cowork/finance/data/revenue.json and ~/cowork/finance/inputs/fy26-targets.md.

Produce a revenue snapshot:
- Total YTD across all streams vs. $180,000 FY26 goal (amount + %)
- Per-stream breakdown: content, corporate, property
- Projected year-end if current run rate continues (simple linear projection)
- Gap to goal: how much more is needed and across how many months remaining in FY26

Be precise. Numbers in AUD. Dates in DD-MM-YYYY. No padding.
```

---

### `/invoice-status` skill prompt

```
Read ~/cowork/finance/data/invoices.json.

Produce an invoice status report grouped as:
1. OVERDUE — past due date, not paid
2. DUE WITHIN 7 DAYS — not yet overdue but close
3. SENT / AWAITING PAYMENT — sent, not yet due
4. PAID — for reference, last 30 days only

For each invoice: brand, amount (AUD), due date (DD-MM-YYYY), days overdue (if applicable).
Flag any that need a follow-up today.

Do not write to any file. Output to chat only.
```

---

### `/check-collabs` skill prompt

```
Read ~/cowork/content/data/collabs.json and ~/cowork/content/data/pipeline.json.
Also check ~/cowork/memory/content/collab-history.md for relevant context.

Produce a full collab status report:

LIVE & IN PROGRESS
[Active deals, deliverable status, due dates in DD-MM-YYYY, invoice status]

PIPELINE
[Deals by stage: prospect / negotiating / confirmed. Next actions and dates.]

NEEDS ACTION TODAY
[Anything overdue, due within 3 days, or blocking payment]

RECENTLY COMPLETED (last 30 days)
[Delivered + invoiced deals for context]

Be direct. Flag anything that needs Zoe's attention today. No padding.
```

---

### `/content-ideas` skill prompt

```
Read the following files:
- ~/cowork/content/inputs/content-calendar.csv (what's coming up)
- ~/cowork/content/data/collabs.json (active brand deals that need content)
- ~/cowork/memory/content/brand-notes.md (brand preferences)
- ~/cowork/CLAUDE.md (voice, niche, aesthetic)

Generate 5–8 content ideas. For each idea:
- Platform: Instagram or TikTok (or both)
- Format: Reel / Carousel / Story / Static
- Hook: the opening line or visual hook (1 sentence)
- Collab angle: which active brand deal this could serve (if any)
- Suggested window: best posting time based on content-calendar.csv gaps

Lean into the cinematic/romantic aesthetic. Voiceover-led for Reels. Moment-driven for carousels.
Victorian locations preferred unless a collab specifies otherwise.

Write the output to ~/cowork/content/outputs/content-ideas-[DD-MM-YYYY].md
Then summarise in chat.
```

---

## §9. Decision Log

| Decision | Choice made | Alternative considered | Reasoning |
|---|---|---|---|
| Data format for collabs and revenue | JSON | Google Sheets as live source | JSON is readable by Cowork without connector dependency; Drive sheet can feed it but isn't required. Resilient to connector downtime. |
| Date format | DD-MM-YYYY | ISO 8601 (YYYY-MM-DD) | Zoe's explicit preference; AU locale standard; avoids ambiguity with US-formatted files from brands |
| Xero access pattern | Read-only pull to local JSON | Direct Xero queries per skill | Local cache means skills run fast and offline; Xero writes blocked entirely to prevent accidental mutations |
| inputs/ write protection | Hard rule, mentioned in every prompt | Trust the workflow not to overwrite | Rate card and targets represent Zoe's judgment calls — machine refresh should never silently overwrite them |
| Property domain | Placeholder only | Thin build with 1–2 fields | 5-hour budget covers 2 full domains well; a thin property build would add surface area without adding value. Placeholder is cleaner. |
| Morning brief file naming | `brief-DD-MM-YYYY.md` (today's date overwrites) + archive copy | Append-only log | Overwrite keeps a predictable "today" path for dashboard; archive preserves history |
| Memory seeding | Seed from known context in Block 5 | Leave blank for Zoe to fill | Seeding from known context (brands, rates, voice) makes skills immediately useful without a manual setup step |
| Dashboard format | Single `dashboard.html` (local, browser-opened) | Cowork artifact (online) | Local file works offline and persists across sessions without relying on artifact hosting |
| Skill storage | `toolbox/*.md` files | Inline prompts only | Source files in toolbox/ mean skills can be edited, versioned, and re-installed without rebuilding from memory |
| Brief schedule trigger | Scheduled task at 7:30am AEST | Manual `/brief` command | 7:30am fits between wake-up and AECOM start; scheduled means it's ready before Zoe opens Cowork |
| Corporate/AECOM domain | Excluded | Included as thin domain | AECOM is a constrained, context-specific environment; its ops don't belong in Gone Offline's workspace |

---

## §10. Out of Scope / Future Work

### Deferred domains (placeholder folders created in this build)

**Property** (`~/cowork/property/`) — folder skeleton exists. Next build window adds:
- `data/properties.json` — loan balance, rental yield, LVR, last valuation per property
- `data/rental-ledger.json` — monthly rental income, vacancy flags
- Xero pull for property-related transactions
- Morning brief integration (property section)
- `/property-snapshot` skill

### Future domains (no folder yet; add without restructuring)

- **Pitches** — outbound brand pitch tracking, template library, follow-up scheduler
- **Analytics** — Instagram/TikTok performance data; post-performance vs. content calendar
- **Production** — shoot planning, equipment checklist, edit queue

### How the architecture scales

Adding a new domain is always: new `{domain}/` folder following the fixed pattern + new `memory/{domain}/` subfolder + new data schemas + new workflows + new skills. Root structure never changes. `dashboard.html` gets a new panel. Morning brief gets a new section. No restructuring required.

### What would force a re-architecture

- Switching from local files to a cloud-native data store (would require replacing all file reads/writes with API calls)
- Moving from Cowork to a different build surface
- Adding real-time multi-device sync as a hard requirement (current local-first design doesn't support concurrent writes)

---

*End of PRD — Mission Control v1.0*  
*Built for: Zoe Lai / Gone Offline | 11-06-2026*
