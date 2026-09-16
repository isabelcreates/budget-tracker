# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server (hot reload, default http://localhost:5173)
- `npm run build` — production build (output in `dist/`)
- `npm run preview` — serve the production build locally

There is no test suite and no linter configured in this project.

## Architecture

Single-page React 18 + Vite app (JSX, no TypeScript, no router). All state lives client-side.

- `src/main.jsx` — entry point, mounts `App`.
- `src/App.jsx` — top-level layout; owns no state itself, just wires `useExpenses` into the three main components (`ExpenseForm`, `ExpenseList`, `MonthlySummary`).
- `src/hooks/useExpenses.js` — single source of truth for expense data. Persists to `localStorage` under the key `budget-tracker-expenses`, loading it lazily on mount and writing back on every change via `useEffect`. There is no backend; all persistence is local to the browser.
- `src/utils/categories.js` — the fixed list of expense categories (id/label/color). `getCategory(id)` falls back to the last category ("Sonstiges") if the id is unknown.
- `src/utils/formatters.js` — `Intl`-based formatters for currency (EUR, `de-DE` locale) and dates; also `todayIso()` for default date values.
- `src/components/` — presentational components (`ExpenseForm`, `ExpenseList`, `MonthlySummary`, `CategoryBadge`), each taking data/callbacks as props from `App`.

UI copy and labels are in German (`de-DE`); keep new user-facing strings consistent with that.

Expense shape: `{ id, amount, category, description, date }` where `date` is an ISO date string (`YYYY-MM-DD`) and `category` is a category id from `categories.js`.

## Git workflow

After making changes to this project, always commit them with a clear, descriptive commit message and push to the `origin` remote (GitHub) — this keeps a saved version of the project at all times. This is pre-authorized: no need to ask for confirmation before committing or pushing to `origin`. Still never force-push, rewrite history, or push if it would overwrite unrelated remote work without checking first.
