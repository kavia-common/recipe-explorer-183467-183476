# Sign In Screen Rendering Notes

- Global tokens come from /assets/common.css, injected at runtime by index.js.
- The screen-specific CSS is:
  - Imported in SignInView.jsx for CRA bundling (src/assets/sign-in-11-235.css)
  - Also linked from /assets/sign-in-11-235.css when route is /sign-in for extra specificity and to match original cascade.
- The SignInView isolates app-wide styles via a "sandbox" wrapper and uses exact IDs/structure from assets/sign-in-11-235.html.
- Dev Overlay:
  - In non-production builds, a "Show Overlay" button appears to toggle /assets/screen_11-235.png at 50% opacity centered above the canvas.
  - Controlled by REACT_APP_NODE_ENV or NODE_ENV !== 'production'.
