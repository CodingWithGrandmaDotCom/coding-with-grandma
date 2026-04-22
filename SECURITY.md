# Security Policy

## Supported Versions

Coding with Grandma ships as a single HTML file (`ide.html`). The latest version on the `main` branch is always the supported version.

## Reporting a Vulnerability

**Please do not file public GitHub issues for security vulnerabilities.** Security reports exposed in public issues can be exploited before a fix is available.

Instead, please report security issues privately via one of:

1. **GitHub Security Advisories** — open a private advisory in the **Security** tab of this repository: `Security → Advisories → Report a vulnerability`. This is the preferred channel.
2. **Private email** — contact the maintainer through the email listed on their GitHub profile.

Please include:

- A clear description of the issue
- Steps to reproduce
- Impact (what an attacker could do)
- Any suggested fix, if you have one

You'll receive acknowledgment within a reasonable timeframe and updates as the fix progresses.

## Scope

This project is a browser-based IDE. Relevant security concerns include:

- **API key handling** — keys are stored only in browser `localStorage` and never transmitted except directly to the provider (Anthropic, Google, OpenAI, or a local Ollama server). Any leak of keys via the IDE should be reported.
- **XSS in user input** — AI-generated code is inserted into the editor via `setValue()`, which is safe. Any path that lets AI output escape sandboxing into the page DOM should be reported.
- **Web Serial abuse** — the IDE can only connect to serial ports the user explicitly selects. Any bypass of the user-consent flow is a concern.
- **Firmware flashing safety** — `esptool-js` writes to the user's physical board. Any path that flashes unintended firmware without user initiation should be reported.

## Out of Scope

- Issues with third-party services (Ollama, Anthropic, Google, OpenAI)
- Physical access attacks
- Bugs in upstream dependencies (Monaco, esptool-js, etc.) — please report those upstream

## Thank You

Security researchers who report valid issues will be credited in the release notes unless they prefer to remain anonymous.
