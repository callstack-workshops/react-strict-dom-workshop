#!/usr/bin/env bash
set -uo pipefail

if ! command -v mise >/dev/null 2>&1; then
  printf 'BLOCKED  mise is not installed. Run scripts/bootstrap.sh first.\n'
  exit 1
fi

want_node="$(awk -F'"' '/^node /{print $2}' mise.toml)"
want_ruby="$(awk -F'"' '/^ruby /{print $2}' mise.toml)"
want_java_major="$(awk -F'"' '/^java /{print $2}' mise.toml | grep -oE '[0-9]+' | head -1)"
want_pnpm="$(awk -F'pnpm@' '/corepack use/{print $2}' mise.toml | tr -d '"')"
want_xcode="$(cat .xcode-version 2>/dev/null || echo unset)"

fail=0
check() {
  if [ "$2" != "$3" ]; then
    printf 'BLOCKED  %-12s expected %s, found %s\n' "$1" "$2" "$3"
    fail=1
  else
    printf 'ok       %-12s %s\n' "$1" "$3"
  fi
}

got_node="$(node -v 2>/dev/null | tr -d 'v' || echo missing)"
check "node" "$want_node" "$got_node"

got_pnpm="$(pnpm -v 2>/dev/null || echo missing)"
check "pnpm" "$want_pnpm" "$got_pnpm"

got_ruby="$(ruby -e 'print RUBY_VERSION' 2>/dev/null || echo missing)"
check "ruby" "$want_ruby" "$got_ruby"

got_java_major="$(java -version 2>&1 | awk -F'"' '/version/{split($2,a,"."); print a[1]}')"
check "jdk(major)" "$want_java_major" "${got_java_major:-missing}"

got_xcode="$(xcodebuild -version 2>/dev/null | awk '/Xcode/{print $2}')"
check "xcode" "$want_xcode" "${got_xcode:-missing}"

android_home="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
if [ -z "$android_home" ] || [ ! -d "$android_home" ]; then
  printf 'BLOCKED  %-12s ANDROID_HOME / ANDROID_SDK_ROOT not set to a valid SDK directory\n' "android-sdk"
  fail=1
else
  printf 'ok       %-12s %s\n' "android-sdk" "$android_home"
fi

if [ -f apps/native-host/ios/Podfile.lock ]; then
  want_pods="$(awk '/^COCOAPODS:/{print $2}' apps/native-host/ios/Podfile.lock)"
  got_pods="$( (cd apps/native-host/ios && bundle exec pod --version) 2>/dev/null || echo missing)"
  check "cocoapods" "$want_pods" "$got_pods"
fi

if [ "$fail" -ne 0 ]; then
  printf '\nEnvironment check failed. Fix every BLOCKED row before starting.\n'
  exit 1
fi
printf '\nAll versions match. You are clear to start.\n'
