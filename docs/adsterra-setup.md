# Adsterra setup

Use only Native Banner or standard Banner for now. Do not add Popunder, Social Bar, or Interstitial scripts to this site.

## Environment variables

```env
NEXT_PUBLIC_ADSTERRA_NATIVE_SRC=
NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID=

NEXT_PUBLIC_ADSTERRA_DESKTOP_BANNER_SRC=https://www.highperformanceformat.com/990c69b703b175d4e350f1db4e92eb59/invoke.js
NEXT_PUBLIC_ADSTERRA_DESKTOP_BANNER_KEY=990c69b703b175d4e350f1db4e92eb59

NEXT_PUBLIC_ADSTERRA_MOBILE_BANNER_SRC=https://www.highperformanceformat.com/e88a96a414fbf4b7b15b2bf3f783b5b3/invoke.js
NEXT_PUBLIC_ADSTERRA_MOBILE_BANNER_KEY=e88a96a414fbf4b7b15b2bf3f783b5b3
```

`NEXT_PUBLIC_ADSTERRA_NATIVE_SRC` and `NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID` come from the Native Banner code in the Adsterra publisher dashboard.

For the current standard banner setup:

- desktop uses `728x90`
- mobile uses `320x50`
- the component loads only one size per viewport

## Placement policy

Ads are wired only into content pages:

- `/pro`
- `/pro/[slug]`
- `/crosshairs`
- `/crosshairs/dot`
- `/crosshairs/pro`
- `/guides`
- `/guides/[slug]`
- `/commands` and command detail pages

No ads should be placed in `/play/*` training pages.

## Legacy AdSense

AdSense is disabled unless `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is explicitly configured.
