# React Strict DOM Workshop

A monorepo workshop building one cross-platform booking experience with React Strict DOM:
the same component code runs on web (Next.js) and native (React Native, iOS and Android).

This assumes a working React Native Mac, which you have if you ship RN day to day:
Xcode and the iOS simulator, Android Studio with an emulator, and Ruby for CocoaPods.
If a machine is not set up yet, do the one-time setup in `PREFLIGHT.md` first.

## Versions are pinned

The repo pins its toolchain (Node, pnpm, Ruby, the JDK) in `mise.toml`, pins Xcode in
`.xcode-version`, and sets `engine-strict=true` in `.npmrc`. A mismatched Node or pnpm fails the
install rather than warning you. If you use mise, `cd` into the repo and you are switched to the
pinned versions automatically. If not, run `mise install`, or match the versions by hand.

## Install dependencies

```
pnpm install
```

That is the JavaScript side. iOS CocoaPods are installed for you on the first `rock run:ios` below,
so you do not run `pod install` by hand. Android resolves what it needs at build time.

## Run the web app

```
pnpm nx dev @workshop/web
```

Open the local URL it prints. You should see the booking dashboard.

## Run the native app

Use two terminals. First start Metro:

```
cd apps/native-host && pnpm start --reset-cache
```

Then, in a second terminal, run a platform:

```
cd apps/native-host && pnpm rock run:ios
cd apps/native-host && pnpm rock run:android
```

The first iOS run installs pods and builds from source, so it takes a few minutes; later runs are
fast. If that run stops on a CocoaPods error, run `pod install` once in `apps/native-host/ios` and
rerun.