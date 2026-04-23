# firmware/

Firmware artifacts that run directly on the ESP32.

Current use: none yet — the IDE at `/ide.html` currently ships code to boards
via esptool-js or (planned) over BLE; the code itself is generated fresh every
session.

Planned use once the MicroPython-first path lands: precompiled MicroPython
firmware binaries that the IDE can flash to a user's board on first-time setup.
May also hold a tiny BLE-bootloader build for the iPhone-app Bluetooth OTA path.
