# Workshop pre-flight (do this 2 to 3 days before, not the morning of)

The setup is reproducible but slow in one place: downloading Xcode. Doing this a few days early means that if something is off, we can fix it before the room is waiting. You are only done when the final check prints a clean, all-green result.

Budget 1 to 3 hours, most of it unattended while Xcode downloads. You need to be at the keyboard only for the first few minutes (to enter a couple of passwords and kick off the Android install) and at the very end (to confirm the check passed).

## Before you start

Confirm all of these first. The check at the end cannot fix these for you.

- **macOS Tahoe 26.3 or newer.** The pinned Xcode (26.5) requires it. Check via the Apple menu, About This Mac. If you are older, update in System Settings first; that update is itself slow, so start it now.
- **Apple Silicon Mac** (M-series).
- **An Apple ID, signed in.** Free is fine. It is required to download Xcode.
- **At least 60 GB free disk.** Xcode, its simulators, Android Studio with the SDK and NDK, and the project dependencies add up.
- **A solid internet connection.** Conference wifi on the day is not it.

## Steps

**1. Install Apple Command Line Tools** (this is what gives you `git`). Skip if you already have it.

```bash
xcode-select --install
```

**2. Install Android tooling.** Bootstrap installs Xcode for you, but not Android, so set this part up by hand first.

- Install Android Studio:

```bash
brew install --cask android-studio
```

- Open Android Studio once and complete the Setup Wizard. It installs the SDK, platform-tools, and an emulator image.
- Point your shell at the SDK:

```bash
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
```

- **Open a new terminal** so those take effect.
- Accept the SDK licenses, either in Android Studio's SDK Manager, or on the command line:

```bash
yes | sdkmanager --licenses
```

- In Android Studio's Device Manager, create a virtual device (any recent Pixel on API 36). You need it to run the Android app.

You do not install the NDK or build-tools yourself; the project pulls the exact versions it needs.

**3. Clone the repo and enter it.**

```bash
git clone https://github.com/callstack-workshops/react-strict-dom-workshop
cd react-strict-dom-workshop
```

**4. Run the one-shot setup.**

```bash
./scripts/bootstrap.sh
```

In the first few minutes it will install Homebrew if you do not already have it, then ask for your **Mac password** once (for `sudo`) and your **Apple ID** (to download Xcode). Enter those, complete the two-factor prompt on your phone if asked, then you can walk away. From there it will, in order: install the toolchain managers, pin Node, the JDK, Ruby, and pnpm, download and select the workshop's Xcode (the long part), install the JavaScript and iOS dependencies, and run a first Android build to warm the caches.

If it stops on the Xcode download, just run `./scripts/bootstrap.sh` again. It picks up where it left off.

**5. Activate mise in your shell.** Bootstrap pinned the toolchain, but the pinned versions only take effect in your terminal once mise is activated. Add it, then open a new terminal:

```bash
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
```

If you use bash, add `eval "$(mise activate bash)"` to `~/.bash_profile` instead.

**6. Confirm you are green.** When `bootstrap.sh` finishes it runs the check automatically. You can re-run it any time:

```bash
mise run doctor
```

You are ready only when every line reads `ok` and it prints `You are clear to start.` It should look like this:

```
ok       node         22.22.0
ok       pnpm         10.33.0
ok       ruby         3.2.9
ok       jdk(major)   17
ok       xcode        26.5
ok       android-sdk  /Users/you/Library/Android/sdk
ok       cocoapods    1.15.2

All versions match. You are clear to start.
```

**7. Boot the app on each platform** to prove a clean run end to end.

Web:

```bash
pnpm nx dev @workshop/web
```

Native, in two terminals. First start Metro:

```bash
cd apps/native-host && pnpm start --reset-cache
```

Then in a second terminal, run each platform. iOS uses a simulator that Xcode provides; Android uses the emulator you created in step 2.

```bash
cd apps/native-host && pnpm rock run:ios
cd apps/native-host && pnpm rock run:android
```

**8. If anything shows `BLOCKED` or fails:** copy the full output of `mise run doctor`, plus your macOS version and Mac model, and post it in the #getyourguide-callstack-trainings Slack channel. Do this at least 2 days out so we have time to sort it before the workshop.

## Common snags

- **`git: command not found`** — run step 1.
- **Stuck below the required macOS** — update macOS first; the pinned Xcode will not install on an older OS.
- **xcodes keeps asking for your Apple ID or shows a 2FA prompt** — expected. Approve the prompt on your phone and let it continue.
- **`android-sdk` shows BLOCKED, or the Android build fails** — make sure Android Studio's SDK is installed and `ANDROID_HOME` is set (step 2), then open a new terminal so the env applies before re-running.
- **`sdkmanager: command not found`** — the command-line tools are not on your PATH; accept licenses through Android Studio's SDK Manager UI instead.
- **`rock run:android` cannot find a device** — start the emulator you created in Device Manager first, or plug in a physical device.
- **Android boots to a blank white screen right after you added a native dependency** — on this stack the native glue is generated at build time, and an incremental Android build can leave it half-written with no error in the log (a JS bug would show a red screen, not white). Do a clean rebuild: from the repo root run `(cd apps/native-host/android && ./gradlew clean)`, then `cd apps/native-host && pnpm rock run:android` again. iOS does not hit this; a fresh `pod install` covers it there.
- **Commands use the wrong Node or pnpm version** — you skipped step 5; activate mise and open a new terminal.
- **Out of disk mid-download** — free up space; Xcode needs headroom to unpack after downloading.
- **You already have an App Store Xcode** — leave it; use the one this setup installs so your version matches everyone else's. Do not switch versions manually.
