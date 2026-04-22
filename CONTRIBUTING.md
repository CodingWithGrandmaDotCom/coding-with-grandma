# Contributing to Coding with Grandma

Thanks for wanting to help! This project aims to make hardware programming approachable for everyone — especially beginners, kids, classrooms, and anyone new to electronics.

## Quick Start for Contributors

1. **Fork** the repo on GitHub
2. **Clone** your fork locally
3. Open `ide.html` in Chrome or Edge — that's the whole product
4. Make changes, test in-browser
5. **Commit** with a short imperative message (e.g., `Add WiFi template`)
6. **Push** to your fork and open a **Pull Request**

No build step. No npm install. No toolchain setup. This is by design — see **Principles** below.

## Ground Rules

### Principles (don't break these)

1. **Works anywhere.** The web version runs in any Chromium browser — no install. The iPhone app is a one-time download from the App Store. No friction either way.
2. **Beginner-first.** If a 10-year-old can't figure it out, simplify it.
3. **Self-contained.** Don't send users to Arduino IDE or any other tool. Build it in.
4. **Open and shareable.** Projects should be easy to share and remix.
5. **AI-native.** AI isn't a bolt-on — it's the foundation.
6. **Simple pricing.** iPhone app is $0.99 one-time — no subscriptions, no ads, no accounts, no telemetry. Web version is open-source (Apache 2.0) and self-hostable free. That's the whole deal.

### Technical conventions

- **Web version (`ide.html`)**: single HTML file, vanilla JS, CDN-loaded (Monaco, Lucide, esptool-js). No build step. No npm in the web product itself.
- **iOS app (`ios/`)**: built with [Capacitor](https://capacitorjs.com) — wraps the same `ide.html` source and adds native plugins for Bluetooth (replaces Web Serial on iOS, which doesn't expose USB), camera, and App Store distribution. The iOS subproject uses npm; this is OK *inside the `ios/` folder only* — the shared `ide.html` stays vanilla.
- **Platform detection** in `ide.html` — a small runtime check swaps the "Connect" flow between Web Serial (desktop) and BLE (iOS).
- **Never reference** Arduino IDE, PlatformIO, or other external tools in user-facing content.
- **Plain-English comments** in starter templates — explain every concept as if to a beginner.
- **No hardcoded secrets.** API keys go in browser `localStorage` / iOS keychain only, never in the repo.

See `AGENTS.md` for the full style guide used by AI coding agents working on this project.

## Good First Contributions

- **New starter templates** — add an Arduino-style sketch to the `templates` object in `ide.html`. Beginner-commented.
- **New guided lessons** — step-by-step walkthroughs for a single concept.
- **UI polish** — theme tweaks, iconography, mobile layout improvements.
- **Accessibility** — keyboard navigation, screen reader support, color contrast checks.
- **Bug reports** — especially serial-monitor or flashing glitches on specific ESP32 variants.

## What NOT to Contribute (without discussion first)

- Adding a build tool, bundler, or package manager
- Splitting `ide.html` into many files before it's genuinely unmanageable
- Changes to `LICENSE`
- Framework switches (React, Vue, Svelte, etc.)

Open an issue first if you want to propose any of these.

## Code Style

- Prefer clear, readable code over clever one-liners.
- Comments explain *why*, not *what*. Well-named variables handle the *what*.
- Keep functions small and focused.
- Test in both **Chrome** and **Edge** before committing UI changes (both use Chromium, but the Web Serial permission flow differs in small ways).

## Commit Messages

Short, imperative, present tense:

- `Add Snap & Code tab with camera + Gemini vision`
- `Fix serial monitor disconnect bug on Windows`
- `Update landing page link to new IDE`

## License

By contributing, you agree that your contributions will be licensed under the same **Apache License 2.0** that covers the rest of the project. See `LICENSE`.
