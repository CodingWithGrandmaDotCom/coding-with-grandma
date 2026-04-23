# CLAUDE.md — Coding with Grandma (ESP32 Edition)

## Project Overview

An ESP32 development platform shipping in two forms:

- **Web version** (`ide.html`) — open-source, Apache 2.0, runs in any Chromium browser. USB flashing via Web Serial API. Lives at the hosted GitHub Pages URL and can be self-hosted from a fork.
- **iPhone app** (`ios/`, in progress) — native Capacitor-wrapped version on the App Store at **$0.99 one-time**. Uses Bluetooth LE for wireless flashing (iOS doesn't expose USB serial). No subscriptions, no ads, no accounts, no telemetry.

AI-powered code generation with 4 providers (Ollama / Claude / Gemini / OpenAI). Self-contained Arduino competitor.

"Coding with Grandma" is a working name (will be rebranded later).

## Repo

Open-source under Apache 2.0. Public at `https://github.com/CodingWithGrandmaDotCom/coding-with-grandma`. Pushes can happen via GitHub Desktop or CLI (credential in keyring via `gh auth login`).

## Current State (v0.4 — as of April 2026)

### What's shipped

- **ide.html** (1,448 lines) — The main product. Single-file browser IDE:
  - Monaco Editor v0.45 with custom "sunset-dark" theme
  - Multi-provider AI code gen: Ollama (free/local streaming), Claude API, Gemini API, OpenAI API
  - Web Serial API serial monitor (Chrome/Edge) with timestamps
  - 8 starter templates: Blink, Button, WiFi, Temperature, Servo, Web Server, OLED, NeoPixels
  - Tabbed sidebar: AI Assistant, Templates, Settings
  - Settings persisted in localStorage (key: `cwg-settings`)
  - Code verification (checks for missing setup/loop, Serial.begin)
  - Lucide icons, responsive panels, resizable bottom panel

- **index.html** (606 lines) — Landing page / beginner prompt builder
  - Step-by-step UI: pick board → describe project → select features → generate prompt
  - Links to ide.html

### Color palette ("San Diego Sunset")

```
--bg-deep:     #0B1628   (deep ocean navy)
--bg-panel:    #0F1F3D   (dark navy)
--orange:      #FF8C42   (primary accent — sunset orange)
--gold:        #FFC857   (secondary — sunset gold)
--coral:       #FF6B6B   (tertiary — coral pink)
--blue:        #4A9EFF   (ocean blue)
--green:       #2ECC71   (success)
--text:        #FFFFFF   (pure white — high contrast)
--text-dim:    #B8C9E0   (soft blue-white)
--border:      #1E3A5F   (steel blue)
```

### What's NOT built yet

**Phase 1 remaining (priority):**
- esptool-js integration for browser-based firmware upload
- GitHub Pages deployment for live demo URL
- Project save/load (localStorage export/import of sketches)
- Mobile-responsive layout improvements
- Library manager (search and include ESP32 libraries)

**Future phases (see ROADMAP.md):**
- Phase 2: Camera-based hardware identification
- Phase 3: Visual drag-and-drop circuit builder
- Phase 4: 3D collaboration + project sharing
- Phase 5: On-device AI + autonomy (ESP32 + Ollama on phone)

## Architecture

### Web version (`ide.html`)

Single HTML file. No build tools. No server. No npm in production. Intentional choice for max portability.

### iOS app (`ios/` — in progress on branch `ios-app`)

Capacitor 5+ wrapping the same `ide.html`. Uses npm for the iOS subproject only; the shared HTML stays CDN-loaded. BLE plugin replaces Web Serial on iOS. Camera plugin replaces getUserMedia on iOS. Keychain (via Capacitor Preferences secure option) replaces localStorage for API keys on iOS.

### CDN dependencies (web)
```
Monaco Editor: cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/
Lucide Icons:  unpkg.com/lucide@0.263.1/dist/umd/lucide.min.js
```

### Key patterns in ide.html
- `generateWithAI()` dispatches to provider-specific functions based on `currentProvider`
- `buildSystemPrompt()` / `buildUserPrompt()` shared across all providers
- `extractCode(text)` handles markdown fences and raw code detection
- Claude API uses `anthropic-dangerous-direct-browser-access: true` header for browser-direct calls
- Settings stored as JSON in localStorage key `cwg-settings`
- Monaco theme registered as `sunset-dark` via `monaco.editor.defineTheme()`
- Templates stored as string literals in a `templates` object

### Browser requirements
- Chrome or Edge (Web Serial API)
- Ollama running locally at http://localhost:11434 for free AI

## File Map

```
ide.html              ← THE PRODUCT (main IDE, 1448 lines)
index.html            ← Landing page / prompt builder (606 lines)
CLAUDE.md             ← This file (Claude Code instructions)
AGENTS.md             ← Instructions for all AI coding tools
README.md             ← Project overview + quick start
ROADMAP.md            ← Phased product vision (6 phases)
LICENSE               ← License file
.gitattributes        ← * text=auto (LF/CRLF normalization)
.gitignore            ← ESP32-appropriate ignores
firmware/             ← Future: precompiled MicroPython + BLE bootloader binaries
docs/                 ← Future: design notes, architecture diagrams, user guides
examples/             ← Future: standalone multi-file sample projects
ios/                  ← Capacitor iOS project (ios/App/ generated on MacBook)
scripts/              ← Build tooling (build-web.mjs)
```

## Conventions

- **Web version is a single HTML file** (`ide.html`) until it's unmanageable, then split into modules
- **Vanilla JS in the web version** — no frameworks, no build tools, no npm in `ide.html`. npm is OK inside `ios/` only.
- **Beginner-first language** — assume zero coding/electronics experience
- **Self-contained** — never reference Arduino IDE, PlatformIO, or external tools in user-facing content
- **New files:** use `YYYY-MM-DD-descriptive-name` format
- **Commit messages:** short, imperative mood (`Add WiFi template`, `Fix serial disconnect bug`)

## What NOT to do

- Don't add build tools, bundlers, or package managers to `ide.html`. Keep the web version vanilla and CDN-loaded.
- Don't commit credentials, WiFi passwords, or API keys
- Don't reference Arduino IDE or PlatformIO in user-facing content
- Don't modify LICENSE without explicit approval
- Don't commit commercial/business planning documents — those live outside the repo in `Coding with Grandma Business/`
- Don't introduce subscription pricing, ads, or telemetry anywhere. iPhone app is strictly $0.99 one-time.
