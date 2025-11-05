This folder contains the CSS copy of the Figma Sign In screen for CRA bundling.

Important:
- The source of truth for assets remains at project root /assets/.
- Runtime paths within the SignInView markup reference /assets/... served from public/.
- Global common tokens are included via /assets/common.css (loaded by a <link> tag injected in src/index.js and also linked from public/index.html).
- The screen-specific CSS is duplicated here strictly for CRA import ordering; do not edit measurements.
