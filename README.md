# Coding with Grandma

### Turn your iPhone into an ESP32 programmer. **$0.99 once. Yours forever.**

[![iPhone app](https://img.shields.io/badge/iPhone-%240.99_one--time-ff8c42?style=for-the-badge)](./ROADMAP.md)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-v0.4-ff8c42)](./ROADMAP.md)
[![AI-native](https://img.shields.io/badge/AI-Ollama%20%7C%20Claude%20%7C%20Gemini%20%7C%20OpenAI-ffc857)](./README.md#whats-included)
[![Pages](https://img.shields.io/github/actions/workflow/status/CodingWithGrandmaDotCom/coding-with-grandma/pages.yml?branch=main&label=pages%20deploy)](https://codingwithgrandmadotcom.github.io/coding-with-grandma/)

**Snap a photo of your breadboard. AI writes the code. Flash your ESP32 wirelessly over Bluetooth.**
One-time purchase. No subscriptions. No accounts. No ads. No telemetry. Yours forever.

> **For makers, students, hobbyists, classrooms — and anyone who's always wanted to learn hardware but felt locked out by the tooling.**
> **iPhone app** — $0.99, one-time pay, on the App Store.
> **Web version** — open-source, Apache 2.0 licensed, self-host from this repo or use our hosted build.

## What's Included

**Coding with Grandma v0.4** (`ide.html`) — The full development environment:

- Monaco code editor (same engine as VS Code) with custom "sunset-dark" theme
- Multi-provider AI code generation — choose between:
  - Ollama (free, runs on your computer)
  - Claude (Anthropic)
  - Gemini (Google, free tier available)
  - OpenAI (GPT)
- **Browser-based firmware flashing** via esptool-js — pick a compiled `.bin` and flash your ESP32 directly, no Arduino IDE required
- **Save & Open** — download sketches as `.ino` files and reopen them later
- **Autosave** — your draft is preserved in the browser between sessions
- **Guided Lessons** — step-by-step walkthroughs teaching one concept at a time (Blink Basics, Button Controls LED, Hello WiFi, Mini Sensor Dashboard)
- **12 starter templates** with beginner-friendly comments:
  Blink LED, Button Input, WiFi Connect, Temperature, Servo,
  Web Server, OLED Display, NeoPixels, PIR Motion, Ultrasonic Distance,
  Bluetooth LE, and Analog Joystick
- Serial monitor with timestamped output
- One-click board connection via Web Serial API
- Tabbed sidebar: AI Assistant, Templates, Lessons, Settings
- API key management (stored locally, never shared)
- Code verification (checks for common mistakes)
- Mobile-responsive layout — works on tablets and phones
- Resizable panels and a professional dark interface with Lucide icons

**Prompt Builder** (`index.html`) — A simpler tool for beginners:

- Describe your project in plain English
- Pick your board and features
- Get a ready-to-use AI prompt for generating ESP32 code

## Quick Start

1. Open `ide.html` in Chrome or Edge (double-click it!)
2. Pick a starter template from the sidebar, try a guided lesson,
   or describe your project and click "Generate Code with AI"
3. Plug in your ESP32 via USB and click "Connect"
4. When you're ready to flash, compile your sketch (Arduino IDE →
   Sketch → Export Compiled Binary for now) and click "Flash" to
   upload it right from the browser

## Try It Online

GitHub Pages deployment ships with v0.4 — a live URL will go up as
soon as Pages is enabled in repo settings (`Settings → Pages → Source:
GitHub Actions`). The workflow is in `.github/workflows/pages.yml`.

## Project Status

See [ROADMAP.md](ROADMAP.md) for the full product vision including
camera-based hardware identification, visual circuit builder, 3D
collaboration, and on-device AI autonomy.

## License

See [LICENSE](LICENSE) for details.
