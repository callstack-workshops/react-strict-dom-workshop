#!/usr/bin/env bash
set -euo pipefail

if ! command -v brew >/dev/null 2>&1; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

brew list mise >/dev/null 2>&1 || brew install mise
brew list watchman >/dev/null 2>&1 || brew install watchman

eval "$(mise activate bash)"
mise install
mise trust >/dev/null 2>&1 || true

pnpm install --frozen-lockfile

if [ -f .xcode-version ] && command -v xcodes >/dev/null 2>&1; then
  xcodes install "$(cat .xcode-version)"
  sudo xcodes select "$(cat .xcode-version)"
fi

if [ -f apps/native-host/Gemfile ]; then
  ( cd apps/native-host && bundle install )
fi

if [ -f apps/native-host/ios/Podfile ]; then
  ( cd apps/native-host/ios && bundle exec pod install )
fi

if [ -f apps/native-host/android/gradlew ]; then
  ( cd apps/native-host/android && ./gradlew assembleDebug )
fi

./scripts/doctor.sh
