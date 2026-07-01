# KSJ Nexus

**KSJ Nexus** is a compact desktop companion for KSJ projects.

The goal is simple: a personal-size notepad app that stays beside VS Code, Discord, browsers, or games so notes and tasks can be captured quickly and synced to the right project later.

## Product Direction

KSJ Nexus is an **app first**, not a website or full-screen dashboard.

Default mode should be:

- personal notepad sized
- narrow and easy to keep beside other apps
- draggable
- resizable
- quick to write into
- project-aware
- useful while working around other programs

A larger workspace can come later, but the compact notepad companion is the core product.

## Principles

- **Structured** — clear folders, clear modules, clear responsibilities.
- **Minimal** — no feature unless it is useful now.
- **Scalable** — the foundation should support future desktop, sync, GitHub, VPS, and automation modules.

## Current Focus

Version `0.3.2` is the personal-size notepad stage.

It includes:

- React + Vite + TypeScript
- Electron desktop shell
- ESLint
- Personal-size notepad window
- Hidden default Electron menu
- Quick note capture UI
- Project picker foundation
- Early feature folders
- Early task data module
- GitHub Pages auto-deploy workflow

## Source Structure

```text
electron/
└── main.js

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

1. Personal-size notepad layout
2. Native Electron polish
3. Quick note capture
4. Project picker
5. Task capture
6. Local saving
7. GitHub/project sync
8. Optional expanded workspace

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

Use `npm run dev` to launch the local Vite server and the Electron desktop app together.
