# AGENTS.md

Instructions for AI coding agents (Google Antigravity, Cursor,
Claude Code, Aider, etc.) working on this repository.

## Project summary

Coding with Grandma is a development platform for ESP32 microcontrollers that
ships in two forms:

- **Web version** (`ide.html`) — runs in any Chromium browser. Open-source,
  Apache 2.0. USB flashing via Web Serial API.
- **iOS app** (`ios/`, branch `ios-app`) — native iPhone/iPad app, $0.99
  one-time on the App Store. Wraps `ide.html` via Capacitor. Uses Bluetooth LE
  for wireless flashing (iOS doesn't expose USB serial to apps).

The goal is to let makers, hobbyists, kids, and students go from idea to
working firmware with minimum friction — powered by AI assistance at every step.

This is a self-contained Arduino competitor. Do not reference or depend on
Arduino IDE, PlatformIO, or any external IDE in user-facing code or documentation.

## Key files

- `ide.html` — The full IDE (Monaco editor, serial monitor, AI
  panel, templates, Web Serial board communication)
- `index.html` — Beginner-friendly prompt builder landing page
- `ROADMAP.md` — Full product vision and phased development plan
- `AGENTS.md` — This file (instructions for AI tools)

## Repository layout

- `ide.html` + `index.html` + `404.html` — the web IDE (single-file) and landing page, served by GitHub Pages
- `firmware/` — precompiled firmware artifacts (planned: MicroPython + BLE bootloader binaries)
- `examples/` — standalone multi-file sample projects (one subfolder each)
- `docs/` — design notes, architecture diagrams, user guides
- `ios/` — Capacitor-wrapped iPhone app (`ios/App/` generated on Mac via `npx cap add ios`)
- `scripts/` — build tooling (e.g. `build-web.mjs` copies web files to `dist/` for iOS bundling)
- `.github/workflows/pages.yml` — auto-deploy to GitHub Pages on every push to main

## Tech stack

### Web version (`ide.html`)

- **Frontend**: Vanilla HTML/CSS/JavaScript (single-file for now)
- **Code editor**: Monaco Editor v0.45 (loaded from CDN)
- **Icons**: Lucide Icons (loaded from unpkg CDN)
- **Board communication**: Web Serial API (Chrome/Edge)
- **Flashing**: esptool-js v0.5.x (loaded as ES module from unpkg) — user provides a compiled `.bin`; we flash at offset `0x10000` by default
- **Hosting**: GitHub Pages via `.github/workflows/pages.yml` (Actions-based deploy)
- **AI integration**: Multi-provider (v0.2+) — Ollama (local), Claude, Gemini, OpenAI
- **Settings storage**: `localStorage` key `cwg-settings`; autosave at `cwg-autosave`

### iOS app (`ios/`)

- **Framework**: [Capacitor](https://capacitorjs.com) 5+ — wraps `ide.html` as a native WebView app
- **Package manager**: npm (scoped to the `ios/` subtree only — web version stays CDN-only)
- **Bluetooth**: `@capacitor-community/bluetooth-le` — replaces Web Serial for USB-free iOS flashing
- **Camera**: `@capacitor/camera` — native capture for Snap & Code
- **Secure storage**: iOS Keychain via `@capacitor/preferences` (secure option) — API keys never land in localStorage on iOS
- **Build**: MacBook Pro for local dev (`npx cap open ios` → Xcode); EAS Build or Codemagic for CI
- **Distribution**: App Store at $0.99 one-time
- **ESP32 flash path**: (1) user flashes a BLE bootloader once via USB from any computer; (2) iPhone app does OTA firmware updates over BLE forever after

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

- Do **not** add build tools, bundlers, or npm dependencies to the **web version** (`ide.html`). Keep it vanilla HTML/CSS/JS loaded from CDN. npm is allowed only inside `ios/`.
- Do **not** break feature parity between web and iOS unnecessarily. Platform-specific paths (Web Serial vs. BLE) are OK; diverging UX is not.
- Do **not** commit credentials, WiFi passwords, or API keys.
- Do **not** modify `LICENSE` without explicit approval.
- Do **not** make changes outside this repository.
- Do **not** introduce subscription pricing, ads, or telemetry. The iPhone app is strictly $0.99 one-time.
