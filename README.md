# Manifold Systems

Company site for Manifold Systems — systems built around intelligent agents.

The site presents three open-source Rust projects:

- [Kamui](https://github.com/algonacci/kamui) — a provider-agnostic, repository-aware coding agent for the terminal, with every side effect gated behind your approval.
- [Kumo](https://github.com/algonacci/kumo) — a minimal personal agent gateway that pairs a private Telegram bot to a single owner and delegates coding work to Kamui.
- [Kage](https://github.com/algonacci/kage) — an engineering workflow orchestrator that drives coding agents you already have installed through plan, execute, test, and review.

Those three repositories live under their author's account. This GitHub organization holds the website repos (`kamui-web`, `kumo-web`, `kage-web`, `manifold-systems-web`), not the Rust projects themselves.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 — imported for its preflight reset only; the page's own styles are hand-written in `src/styles.css`
- Deployed on Vercel

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # production build
npm run preview   # preview the build locally
```

`npm run typecheck` runs TypeScript with no emit.

Deployment is handled by Vercel: pushes to `main` deploy to production, and pull requests get preview URLs.

---

A [Manifold Systems](https://github.com/ManifoldSystems) project.
