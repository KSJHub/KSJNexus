# KSJ Nexus

**KSJ Nexus** is a compact desktop companion for KSJ projects.

The goal is simple: a small A5-style app that stays beside VS Code, Discord, browsers, or games so notes and tasks can be captured quickly and synced to the right project later.

## Product Direction

KSJ Nexus is an **app first**, not a website or full-screen dashboard.

Default mode should be:

- A5-sized
- draggable
- resizable
- quick to write into
- project-aware
- useful while working around other programs

A larger workspace can come later, but the compact companion is the core product.

## Principles

- **Structured** — clear folders, clear modules, clear responsibilities.
- **Minimal** — no feature unless it is useful now.
- **Scalable** — the foundation should support future desktop, sync, GitHub, VPS, and automation modules.

## Current Focus

Version `0.1` is the companion foundation stage.

It includes:

- React + Vite + TypeScript
- ESLint
- A5-style companion shell
- Quick note capture UI
- Project picker foundation
- Early feature folders
- Early task data module
- GitHub Pages auto-deploy workflow

## Source Structure

```text
src/
├── components/
│   └── layout/
├── data/
├── features/
│   ├── dashboard/
│   └── tasks/
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

## Planned Build Order

1. A5 companion layout
2. Quick note capture
3. Project picker
4. Task capture
5. Local saving
6. GitHub/project sync
7. Optional expanded workspace
8. Electron floating desktop app

## Development Rule

> If we do not need it today, we do not build it today.

This project should stay fast, clean, and intentional.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```
