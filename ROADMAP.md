# Coding with Grandma Product Roadmap

## Vision

Coding with Grandma is a 100% browser-based development platform for ESP32
microcontrollers. No installs, no Arduino IDE, no complicated setup.
Open a webpage, describe what you want to build, and go from idea to
working hardware — all in one place.

The platform is designed to be accessible to kids, students, makers,
and anyone who wants to learn electronics and programming without
being intimidated by traditional tools.

Long-term, Coding with Grandma is a self-contained competitor to Arduino
IDE, built entirely for the browser and powered by AI.

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

1. Browser-first: Everything runs in the browser. No installs.
2. Beginner-first: If a 10-year-old can't figure it out, simplify.
3. Self-contained: Don't send users to other tools. Build it in.
4. Open and shareable: Projects should be easy to share and remix.
5. AI-native: AI isn't a bolt-on, it's the foundation.

---

*Last updated: 2026-04-20*
