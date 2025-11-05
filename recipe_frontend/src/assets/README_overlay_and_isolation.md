# Sign In Screen: Isolation, Load Order, and QA Overlay

This project renders the Figma Sign In screen pixel-perfect at route /sign-in.

Loading strategy:
1) Global tokens/reset: /assets/common.css is linked in public/index.html via <link data-common-css="true"> and defensively injected from src/index.js on client transitions.
2) Screen CSS: /assets/sign-in-11-235.css is conditionally linked in public/index.html only when the path is /sign-in before first paint; src/index.js also injects it on client transitions.
3) Script: /assets/sign-in-11-235.js is appended on mount and removed on unmount so focus styles and button animation run without errors.

Isolation:
- The Router wraps /sign-in inside a hard sandbox: #signin-sandbox with all: initial; font-smoothing is set, and we re-apply the desired font-family to the subtree.
- Navbar is not rendered on /sign-in to guarantee full-bleed canvas with no external margins/padding.
- The actual canvas uses IDs and structure identical to assets/sign-in-11-235.html and is centered at 375x812 with a 30px corner radius.

QA overlay:
- In non-production builds, a toggle button appears at the top-right to overlay /assets/screen_11-235.png at 50% opacity precisely over the canvas to check offsets, font sizes, letter spacing, and line heights.

Note:
- Do not alter measurements in assets/sign-in-11-235.css. If adjustments are necessary, modify app-level interference or increase selector specificity rather than changing the exported values.
