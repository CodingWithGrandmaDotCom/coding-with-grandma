# Coding with Grandma Product Roadmap

## Vision

Coding with Grandma is a development platform for ESP32 microcontrollers that
meets users where they are:

- **iPhone app — $0.99 one-time.** Snap a photo of your breadboard, let AI write the code, flash over Bluetooth. One purchase, yours forever. App Store distribution.
- **Web version — open-source, self-hostable.** Runs in any Chromium browser. Uses Web Serial for USB flashing on desktop. Licensed Apache 2.0 — fork it, host it, change it.

Same IDE, two platforms. No Arduino IDE. No complicated setup. No subscriptions, no ads, no accounts, no telemetry.

The platform is designed to be accessible to kids, students, makers, and anyone
who wants to learn electronics and programming without being intimidated by
traditional tools.

Long-term, Coding with Grandma is a self-contained competitor to Arduino IDE,
built for browsers and iPhones, powered by AI.

---

## Phase 0 — Prompt Builder (DONE)

**Status: Complete**

A single-page web tool that helps beginners generate AI prompts for
ESP32 projects. Users describe what they want in plain English, pick
their board, and get a ready-to-paste prompt.

What it proves:
- The "describe it, build it" workflow works
- Beginners can use it without any prior knowledge
- Runs in a browser with zero setup

---

## Phase 1 — Browser-Based Code Editor + Flasher

**Status: v0.4 shipped — near completion**

A web-based code editor that can write code to an ESP32 board
plugged into the user's computer via USB. No software installs.

Key features:
- Monaco code editor with syntax highlighting (DONE)
- One-click "Connect" button using Web Serial API (DONE)
- Browser-based firmware flashing via esptool-js (DONE, v0.4 — .bin upload)
- Project save / open as `.ino` files with autosave (DONE, v0.4)
- Built-in serial monitor with timestamped output (DONE)
- Multi-provider AI code generation: Ollama, Claude, Gemini, OpenAI (DONE)
- 12 starter templates for common projects (DONE, v0.4)
- Guided Lessons mode with step-by-step walkthroughs (DONE, v0.4)
- Mobile-responsive layout (DONE, v0.4)
- GitHub Pages deployment workflow (DONE, v0.4 — needs Pages enabled in repo settings)
- Settings panel with API key management (DONE)
- Code verification for common mistakes (DONE)

Technical approach:
- Web Serial API for direct USB communication from the browser
- esptool-js (v0.5.x) loaded from unpkg as an ES module for flashing firmware
- Monaco Editor (same engine as VS Code) for code editing
- All client-side — no server needed, hosted on GitHub Pages via Actions

Remaining for Phase 1:
- In-browser firmware compilation (currently users compile in Arduino
  IDE via "Export Compiled Binary", then flash the `.bin` from our IDE).
  Target approach: spin up a lightweight arduino-cli compile service
  or port the ESP32 Arduino core toolchain to WebAssembly.
- Library manager (search, install, include)
- Full cross-browser QA on tablets

---

## Phase 1.25 — MicroPython as Default ("no compile" mode)

**Status: Approved direction — 2026-04-23. Infrastructure shipped, spike pending.**

Strategic pivot: the #1 friction point for beginners is "compile, wait, flash, debug, wait again." MicroPython eliminates this entirely. Users flash the MicroPython interpreter to their ESP32 once (USB, 30 sec), and from then on code runs instantly as Python text sent over Serial / Bluetooth LE.

**Why this matters:**
- Python is a genuinely better teaching language than Arduino C++ — plain-English errors, readable syntax
- No compile wait — iterate in seconds, not minutes
- Instant REPL feedback — type `led.value(1)` and watch it work
- Makes the iPhone app dramatically simpler: send Python text over BLE = done (no in-browser compiler needed)
- MicroPython on ESP32 is an existing, stable, maintained project — not speculative tech

**Shipped (v0.5 prep):**
- Language toggle in the IDE top bar: Python (default, sunset-gradient when active) vs. Arduino C++
- AI system prompts rewritten to generate heavily-commented MicroPython by default (with a "TEACH while you code" baked in)
- 6 heavily-commented Python starter templates: Blink, Button, WiFi, NeoPixel, Temperature, Web Server
- Monaco editor switches language live on toggle; preference persisted
- Welcome modal rewritten around Python-first with QR-onboarding preview

**Remaining:**
- Remaining 6 Python templates (PIR, Ultrasonic, BLE, Joystick, Servo, OLED)
- Hardware spike: actually flash MicroPython to a real ESP32 and send `led.value(1)` over serial
- First-time setup wizard: guided MicroPython firmware flash via web (USB from desktop)
- Over-the-air Python text delivery over BLE (the iPhone app path — Phase 1.5)
- GitHub Actions cloud compile for the Arduino C++ side (Phase 1.5b)

**Deferred (no longer critical):**
- WASM cross-compiler for in-browser C++ compilation → Phase 2.5 moonshot (still interesting as a headline feature, but not blocking anything now)

---

## Phase 1.5 — iPhone App ($0.99 one-time)

**Status: In progress (scaffold branch `ios-app`)**

Ship the same IDE as a native iPhone app on the App Store. Charge $0.99 one-time
for App Store distribution and the convenience of a phone-native experience.
The open-source web version remains free to self-host — the iPhone price covers
Apple's recurring developer tax and funds continued development.

Why iPhone first (not Android): our target audience (classrooms, parents + kids,
American makers) skews heavily iPhone. Android version is a later phase.

Key features:
- **Capacitor-based** wrapper around the existing `ide.html` — maximum code reuse
- **Bluetooth LE flashing** (replaces Web Serial, which iOS doesn't expose):
  - One-time: user flashes a small BLE bootloader to their ESP32 from any computer
  - Forever after: the iPhone app does OTA firmware updates wirelessly over BLE
  - The USB flash path remains available in the web version
- **Native camera integration** for Snap & Code (faster than browser camera access)
- **iOS keychain** for API key storage (Gemini, Claude, OpenAI) — more secure than `localStorage`
- **App Store listing** with screenshots, description, privacy policy, Apple Developer Program enrollment
- **Cloud builds via EAS or Codemagic** for publishing from any OS (MacBook is needed for local development, cloud is needed for CI)

Technical approach:
- Capacitor 5+ wrapping `ide.html` as the native WebView content
- `@capacitor-community/bluetooth-le` plugin for BLE
- Platform detection in `ide.html`: Capacitor runtime → use BLE; otherwise → use Web Serial
- Shared code base: ~90% of the IDE is identical on web and iOS
- Android port follows after iOS stabilizes

Pricing principle:
- **$0.99 one-time.** Not a subscription. Not a "lite" version. The user owns the app forever.
- Future Pro features (cloud sync, advanced templates, priority AI) would be optional in-app upgrades, never required for the core experience.

---

## Phase 2 — Visual Hardware Identification

**Status: Future**

Use the device camera to identify ESP32 boards and connected
components automatically.

Key features:
- Point your camera at your board and the app identifies it
- Component recognition for common sensors, displays, motors
- Automatic pin mapping based on identified hardware
- Works on phones and tablets via browser camera access

---

## Phase 3 — Visual Circuit Builder

**Status: Future**

Drag-and-drop breadboard circuit designer built into the browser.

Key features:
- Visual breadboard with drag-and-drop components
- Wiring assistant showing where to connect each wire
- Real-time error checking for short circuits and wrong pins
- Auto-generates code based on the circuit design
- Shareable circuits via link

---

## Phase 4 — 3D Collaboration + Project Sharing

**Status: Future**

Shared 3D workspace for real-time collaborative hardware design.

Key features:
- 3D view of boards, breadboards, and components
- Real-time collaboration (like Google Docs for hardware)
- Project gallery to browse and remix other people's builds
- Export designs for 3D printing enclosures
- Embed drone footage or photos of physical builds

---

## Phase 5 — On-Device AI + Autonomy

**Status: Future / Experimental**

Enable ESP32 projects to use local AI models (like Ollama on a
phone) for autonomous decision-making without cloud dependency.

Key features:
- ESP32 sends sensor data to local AI model over WiFi/BLE
- AI processes data and sends commands back to the board
- No cloud needed — everything runs locally
- Pre-built templates for obstacle avoidance, line following,
  voice commands, and object tracking
- Works with drones, robots, cars, and any mobile platform

---

## Principles

1. Works anywhere: web version runs in any Chromium browser with no install; iPhone app is a one-time download. No friction either way.
2. Beginner-first: if a 10-year-old can't figure it out, simplify.
3. Self-contained: don't send users to other tools. Build it in.
4. Open and shareable: the web version is open-source. Projects are easy to share and remix.
5. AI-native: AI isn't a bolt-on, it's the foundation.
6. Simple pricing: iPhone app is $0.99 one-time — no subscriptions, no ads, no accounts, no telemetry. Web version is free and self-hostable.

---

*Last updated: 2026-04-22*
