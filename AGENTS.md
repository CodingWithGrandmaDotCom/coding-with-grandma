# AGENTS.md

Instructions for AI coding agents (Google Antigravity, Cursor,
Claude Code, Aider, etc.) working on this repository.

## Project summary

Coding with Grandma (ESP32 Edition) is a 100% browser-based development platform for ESP32
microcontrollers. The goal is to let makers, hobbyists, kids, and
students go from idea to working firmware with zero installs, powered
by AI assistance at every step.

This is a self-contained Arduino competitor. Everything runs in the
browser. Do not reference or depend on Arduino IDE, PlatformIO, or
any external IDE in user-facing code or documentation.

## Key files

- `ide.html` — The full IDE (Monaco editor, serial monitor, AI
  panel, templates, Web Serial board communication)
- `index.html` — Beginner-friendly prompt builder landing page
- `ROADMAP.md` — Full product vision and phased development plan
- `AGENTS.md` — This file (instructions for AI tools)

## Repository layout

- `firmware/` — ESP32 C/C++ source (starter templates and examples)
- `software/` — IDE application source (currently all in ide.html)
- `docs/` — Design notes, architecture, user guides
- `examples/` — Sample ESP32 sketches and reference projects

## Tech stack

- **Frontend**: Vanilla HTML/CSS/JavaScript (single-file for now)
- **Code editor**: Monaco Editor v0.45 (loaded from CDN)
- **Icons**: Lucide Icons (loaded from unpkg CDN)
- **Board communication**: Web Serial API (Chrome/Edge)
- **Flashing**: esptool-js v0.5.x (loaded as ES module from unpkg) — user provides a compiled `.bin`; we flash at offset `0x10000` by default
- **Hosting**: GitHub Pages via `.github/workflows/pages.yml` (Actions-based deploy; needs `Settings → Pages → Source: GitHub Actions`)
- **AI integration**: Multi-provider support (v0.2+):
  - Ollama (local, free) — streaming via /api/generate
  - Claude API (Anthropic) — via /v1/messages
  - Gemini API (Google) — via generativelanguage.googleapis.com
  - OpenAI API (GPT) — via /v1/chat/completions
- **Settings storage**: `localStorage` key `cwg-settings` (browser-local, no backend)
- **Autosave storage**: `localStorage` key `cwg-autosave` (the current sketch draft)

## Conventions

- Keep the IDE as a single HTML file (`ide.html`) until it grows
  too large to manage. Then split into modules.
- All user-facing text should be written for beginners. Assume zero
  prior coding or electronics experience.
- Code templates should include detailed comments explaining every
  line in plain English.
- Never require users to install software or leave the browser.
- Do not reference Arduino IDE, PlatformIO, or external tools in
  user-facing content. This is a self-contained platform.

## Coding standards

- Prefer clear, readable code over clever one-liners.
- Add comments explaining *why*, not *what*.
- Keep functions small and focused.
- Test in both Chrome and Edge before committing UI changes.

## Commit message format

Use short, descriptive commit messages in the imperative mood:
- `Add WiFi template to IDE`
- `Fix serial monitor disconnect bug`
- `Update landing page with IDE link`

## What NOT to do

- Do **not** add build tools, bundlers, or package managers yet.
  Keep it simple: vanilla HTML/CSS/JS loaded from CDN.
- Do **not** commit credentials, WiFi passwords, or API keys.
- Do **not** modify `LICENSE` without explicit approval.
- Do **not** make changes outside this repository.
