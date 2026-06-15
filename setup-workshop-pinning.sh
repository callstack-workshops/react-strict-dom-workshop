#!/usr/bin/env bash
set -euo pipefail

NODE_VERSION="22.22.0"
PNPM_VERSION="10.33.0"
JAVA_VERSION="zulu-17"
RUBY_VERSION="3.2.9"
XCODE_VERSION="26.5"

for _v in NODE_VERSION RUBY_VERSION XCODE_VERSION; do
  if [[ "${!_v}" == FILL_* ]]; then
    printf 'ABORT  %s is still a placeholder. Fill it and re-run.\n' "$_v" >&2
    _abort=1
  fi
done
if [ "${_abort:-0}" = 1 ]; then
  exit 1
fi

mkdir -p scripts

cat > mise.toml <<EOF
[tools]
node = "$NODE_VERSION"
java = "$JAVA_VERSION"
ruby = "$RUBY_VERSION"

[settings]
experimental = true

[env]
_.path = ["./node_modules/.bin"]

[hooks]
postinstall = "corepack enable && corepack use pnpm@$PNPM_VERSION"

[tasks.doctor]
run = "./scripts/doctor.sh"

[tasks.setup]
run = "./scripts/bootstrap.sh"
EOF

printf '%s\n' "$XCODE_VERSION" > .xcode-version

if [ ! -f .npmrc ]; then
  printf '%s\n' "engine-strict=true" > .npmrc
fi

cat > scripts/doctor.sh <<'DOCTOR'
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
DOCTOR
chmod +x scripts/doctor.sh

cat > scripts/bootstrap.sh <<'BOOT'
#!/usr/bin/env bash
set -euo pipefail

if ! command -v brew >/dev/null 2>&1; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

brew list mise >/dev/null 2>&1 || brew install mise
brew list watchman >/dev/null 2>&1 || brew install watchman
brew list xcodes >/dev/null 2>&1 || brew install xcodesorg/made/xcodes

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
BOOT
chmod +x scripts/bootstrap.sh

printf '\nWrote: mise.toml, .xcode-version, .npmrc, scripts/doctor.sh, scripts/bootstrap.sh\n'
printf 'Next: review the values, commit, then run ./scripts/bootstrap.sh\n'
