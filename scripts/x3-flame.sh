#!/usr/bin/env bash
# X3 helper: pull the newest Hermes sampling profile saved by the "Profile" button in the
# Departures tab (release build, iOS simulator) and tell you how to open the flame graph.
# Usage: pnpm x3:flame   (boot the sim and tap Profile first)
set -euo pipefail

BID="${1:-org.reactjs.native.example.NativeHost}"

DATA="$(xcrun simctl get_app_container booted "$BID" data 2>/dev/null || true)"
if [ -z "$DATA" ]; then
  echo "No booted simulator with $BID found. Run the app first (pnpm exec rock run:ios --configuration Release --local)." >&2
  exit 1
fi

PROF="$(ls -t "$DATA/Library/Caches/"*.cpuprofile 2>/dev/null | head -1 || true)"
if [ -z "$PROF" ]; then
  echo "No .cpuprofile in the app cache yet. Open the Departures tab and tap \"Profile\", then re-run." >&2
  exit 1
fi

DEST="$(pwd)/x3-flame.cpuprofile"
cp "$PROF" "$DEST"
echo "Saved $DEST ($(wc -c < "$DEST" | tr -d ' ') bytes)"
echo
echo "Open the flame graph one of two ways:"
echo "  1. Go to https://www.speedscope.app and drag x3-flame.cpuprofile onto the page."
echo "  2. Or run:  pnpm exec speedscope \"$DEST\""
echo
echo "Look for useNativeProps / useStyleProps (the RSD per-element tax) and demandScore (generic JS)."
