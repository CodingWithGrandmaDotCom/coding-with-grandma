# Coding with Grandma — iOS App

The native iOS app, built with [Capacitor](https://capacitorjs.com). Wraps the same `ide.html` the web version uses, and adds native Bluetooth LE flashing (iOS doesn't expose USB serial, so we use BLE to reach the ESP32).

**App Store price:** $0.99 one-time. No subscriptions, no ads, no accounts, no telemetry.

## First-time setup (on your MacBook)

You need:
- macOS with Xcode 15+ installed
- An Apple Developer Program membership ($99/year) for App Store distribution
- Node.js 18+ (`brew install node` if you don't have it)

```bash
# From the repo root:
git checkout ios-app                     # work on the ios-app branch
npm install                              # install Capacitor + plugin deps
npm run build:web                        # copy ide.html, index.html, 404.html → dist/
npx cap add ios                          # first time only — generates the ios/App/ Xcode project
npx cap sync ios                         # syncs dist/ + plugins into the Xcode project
npx cap open ios                         # opens Xcode
```

In Xcode:
1. Select a development team (your Apple Developer account)
2. Pick a simulator or connected device
3. Hit ▶ to build and run

## Day-to-day development

When you edit `ide.html` (shared with the web version):

```bash
npm run cap:sync    # runs build:web + cap sync in one step
```

Then hit ▶ in Xcode again.

## ESP32 flashing flow on iOS

Because iOS blocks USB serial access to apps, flashing is **two-stage** for iPhone users:

**Stage 1 — one-time, needs any computer with USB**
1. Wire up your ESP32
2. Open the web version (`https://codingwithgrandmadotcom.github.io/coding-with-grandma/`) on a laptop
3. Connect via USB, flash the **BLE Bootloader** firmware (shipped as a preset in the IDE)

**Stage 2 — forever after, from your iPhone**
1. Power the ESP32
2. Open the iPhone app
3. Tap **Connect via Bluetooth** → pick your ESP32
4. Write code → **Flash** sends firmware OTA over BLE to the running bootloader

Users can skip Stage 1 if they buy a pre-flashed board (future: bundle starter kits).

## Plugins in use

| Plugin | Purpose |
|---|---|
| `@capacitor/core` | Runtime |
| `@capacitor/ios` | iOS platform |
| `@capacitor-community/bluetooth-le` | BLE scan, connect, GATT read/write for ESP32 OTA |
| `@capacitor/camera` | Native camera capture for Snap & Code |
| `@capacitor/preferences` | iOS Keychain-backed secure storage for API keys |
| `@capacitor/status-bar` | Sunset palette for the status bar |
| `@capacitor/splash-screen` | Launch animation |

## App Store submission checklist

- [ ] Apple Developer Program membership active
- [ ] Bundle ID registered: `com.codingwithgrandma.app`
- [ ] App icon (1024x1024 master) + all required sizes
- [ ] Launch screen / splash
- [ ] Screenshots for 6.7", 6.5", 5.5" iPhone, 12.9" iPad Pro
- [ ] App description, keywords, support URL, privacy policy URL
- [ ] Privacy manifest (`PrivacyInfo.xcprivacy`) declaring: camera usage, Bluetooth usage, local storage
- [ ] `NSBluetoothAlwaysUsageDescription` + `NSBluetoothPeripheralUsageDescription` in Info.plist
- [ ] `NSCameraUsageDescription` in Info.plist
- [ ] Age rating: 4+
- [ ] Price: Tier 1 ($0.99)
- [ ] TestFlight beta with at least 2 testers before submitting
- [ ] App Review Guidelines self-audit (especially 4.2 — minimum functionality)

## Cloud builds (no Mac needed)

For CI or if you want to build from Windows:

- **EAS Build** (Expo's service, works with Capacitor) — ~$30/month
- **Codemagic** — generous free tier
- **GitHub Actions** with macOS runners — $8/hour

We can wire one up later. For now, local Mac builds are fine.
