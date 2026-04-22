#!/usr/bin/env node
// scripts/build-web.mjs
//
// Copies the web-facing files into dist/ for Capacitor to bundle into the iOS app.
// The web version (served from GitHub Pages) uses the files at the repo root directly;
// this build is only for the native iOS app bundle.
//
// What we include: the HTML entry points. Everything else (README, LICENSE, etc.)
// is not relevant inside a native app.
//
// Usage: node scripts/build-web.mjs

import { mkdir, copyFile, rm, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const FILES_TO_BUNDLE = [
  'ide.html',
  'index.html',
  '404.html'
];

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function build() {
  // Clean dist/
  if (await exists(DIST)) {
    await rm(DIST, { recursive: true, force: true });
  }
  await mkdir(DIST, { recursive: true });

  // Copy each file
  for (const rel of FILES_TO_BUNDLE) {
    const src = join(ROOT, rel);
    const dst = join(DIST, rel);
    if (!(await exists(src))) {
      console.warn(`  ⚠ Skipping missing file: ${rel}`);
      continue;
    }
    await copyFile(src, dst);
    console.log(`  ✓ ${rel}`);
  }

  console.log(`\nBuilt dist/ with ${FILES_TO_BUNDLE.length} file(s).`);
}

build().catch((e) => {
  console.error('Build failed:', e);
  process.exit(1);
});
