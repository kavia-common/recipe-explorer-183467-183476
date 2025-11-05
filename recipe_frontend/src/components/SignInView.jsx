import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * SignInView renders the Figma-extracted Sign In screen with pixel-perfect fidelity.
 * Implementation notes:
 * - Exact HTML structure and IDs/classes are preserved.
 * - A local "sandbox" wrapper resets inherited styles to prevent reflow differences.
 * - The Figma JS (assets/sign-in-11-235.js) is appended so behaviors execute on mount.
 * - Images are referenced with /assets/figmaimages/... and are expected to resolve from public.
 * - Global common.css is injected by index.js; we import the screen CSS to ensure correct specificity.
 * - A dev-only overlay toggle renders screen_11-235.png at 50% opacity for quick visual comparisons.
 */

/* screen-specific CSS, loads after app styles and uses strong ID selectors for specificity */
import '../assets/sign-in-11-235.css';

export default function SignInView() {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const [overlay, setOverlay] = useState(false);

  const isDev = useMemo(() => {
    return (process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV) !== 'production';
  }, []);

  useEffect(() => {
    // Ensure common tokens are available (defensive; index.js already injects)
    const link = document.querySelector('link[data-common-css="true"]');
    if (!link) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = '/assets/common.css';
      l.setAttribute('data-common-css', 'true');
      document.head.appendChild(l);
    }

    // Load the Figma behavior script so focus states and submit stub work.
    const script = document.createElement('script');
    script.src = '/assets/sign-in-11-235.js';
    script.async = true;
    scriptRef.current = script;
    document.body.appendChild(script);

    return () => {
      if (scriptRef.current) {
        try {
          document.body.removeChild(scriptRef.current);
        } catch {
          // ignore if already removed
        }
        scriptRef.current = null;
      }
    };
  }, []);

  // CSS isolation wrapper styles. Avoid margins/padding that could shift absolute children.
  const sandboxStyle = {
    fontFamily: "'Poppins', 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
    lineHeight: 'normal',
    fontSize: 'initial',
    background: 'transparent',
    display: 'grid',
    placeContent: 'center',
    minHeight: 'calc(100vh - 64px)', // leave room for navbar height without altering inner screen offsets
    padding: 0, // zero to avoid affecting centering - full-bleed within viewport center
  };

  return (
    <div style={{ position: 'relative' }}>
      {isDev && (
        <div style={{ position: 'fixed', top: 80, right: 12, zIndex: 60 }}>
          <button
            type="button"
            onClick={() => setOverlay(v => !v)}
            className="primary-btn"
            aria-label="Toggle Figma overlay"
            title="Toggle Figma overlay"
          >
            {overlay ? 'Hide Overlay' : 'Show Overlay'}
          </button>
        </div>
      )}

      {/* Visual diff overlay - dev only. Full overlap on the screen bounds with 50% opacity. */}
      {isDev && overlay && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            display: 'grid',
            placeContent: 'center',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          <div style={{ position: 'relative', width: 375, height: 812, borderRadius: 30, overflow: 'hidden' }}>
            <img
              alt="Figma overlay"
              src="/assets/screen_11-235.png"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5, objectFit: 'cover' }}
            />
          </div>
        </div>
      )}

      <div
        className="figma-sandbox"
        style={sandboxStyle}
        ref={containerRef}
      >
        {/* Exact, static JSX mirroring sign-in-11-235.html body content */}
        <div id="screen-sign-in-11-235" role="main" aria-label="Sign In screen">
          {/* Titttle group */}
          <div id="grp-13-110" className="group" aria-hidden="false">
            <p id="txt-12-29">Hello,</p>
            <p id="txt-12-30">Welcome Back!</p>
          </div>

          {/* Forgot Password */}
          <div id="grp-12-91" className="group">
            <a id="txt-12-94" href="#" aria-label="Forgot Password?">Forgot Password?</a>
          </div>

          {/* Button Google */}
          <div id="btn-13-35" className="group" role="button" aria-label="Sign in with Google" tabIndex={0}>
            <img id="rect-13-36" src="/assets/figmaimages/figma_image_13_36.svg" alt="" />
            <div id="cmp-13-48" className="component" aria-hidden="true">
              <img id="ico-13-39" src="/assets/figmaimages/figma_image_13_39.svg" alt="" />
              <div id="ico-13-40"></div>
              <div id="ico-13-41"></div>
              <img id="ico-13-42" src="/assets/figmaimages/figma_image_13_42.svg" alt="" />
            </div>
          </div>

          {/* Button Facebook */}
          <div id="btn-13-49" className="group" role="button" aria-label="Sign in with Facebook" tabIndex={0}>
            <div id="rect-13-50"></div>
            <div id="grp-13-58" className="group" aria-hidden="true">
              <div id="grp-13-59" className="group">
                <div id="ico-13-60"></div>
                <img id="ico-13-61" src="/assets/figmaimages/figma_image_13_58.svg" alt="facebook" />
                <div id="ico-13-62"></div>
              </div>
            </div>
          </div>

          {/* CTA subtext */}
          <p id="txt-13-67">Don’t have an account? Sign up</p>

          {/* Or line group */}
          <div id="grp-12-139" className="group" aria-hidden="true">
            <div id="line-12-141"></div>
            <div id="line-12-140"></div>
            <p id="txt-12-142">Or Sign in With</p>
          </div>

          {/* Input field - Email */}
          <div id="cmp-30-585" className="component" role="group" aria-label="Email input">
            <div id="rect-I30-585-30-298"></div>
            <label id="lbl-I30-585-30-301" htmlFor="input-email">Email</label>
            <input id="input-email" type="email" placeholder="Enter Email" aria-label="Email" />
            <span id="ph-I30-585-30-300" aria-hidden="true">Enter Email</span>
          </div>

          {/* Input field - Password */}
          <div id="cmp-30-590" className="component" role="group" aria-label="Password input">
            <div id="rect-I30-590-30-298"></div>
            <label id="lbl-I30-590-30-301" htmlFor="input-password">Enter Password</label>
            <input id="input-password" type="password" placeholder="Enter Password" aria-label="Password" />
            <span id="ph-I30-590-30-300" aria-hidden="true">Enter Password</span>
          </div>

          {/* Big Button Sign In */}
          <button id="btn-54-668" type="button" aria-label="Sign In">
            <span id="txt-I54-668-53-624">Sign In</span>
            <div id="cmp-I54-668-53-625" className="component" aria-hidden="true">
              <div id="rect-I54-668-53-625-139-3256"></div>
              <div id="bool-I54-668-53-625-139-3257">
                <div id="stroke-1"></div>
                <div id="stroke-3"></div>
              </div>
            </div>
          </button>

          {/* Status Bar */}
          <div id="cmp-13-71" className="component" aria-hidden="true">
            <div id="symbols" className="frame">
              <div id="battery" className="group">
                <div id="battery-rect" className="bool">
                  <img id="batt-306" src="/assets/figmaimages/figma_image_13_71_128_306.svg" alt="" />
                  <img id="batt-307" src="/assets/figmaimages/figma_image_13_71_128_307.svg" alt="" />
                </div>
                <div id="battery-inner"></div>
              </div>
              <div id="cell" className="bool">
                <img id="cell-311" src="/assets/figmaimages/figma_image_13_71_128_311.svg" alt="" />
                <img id="cell-312" src="/assets/figmaimages/figma_image_13_71_128_312.svg" alt="" />
                <img id="cell-313" src="/assets/figmaimages/figma_image_13_71_128_313.svg" alt="" />
                <img id="cell-314" src="/assets/figmaimages/figma_image_13_71_128_314.svg" alt="" />
              </div>
              <div id="wifi" className="bool"></div>
            </div>
            <div id="time" className="frame" aria-label="time">
              <span id="time-text">19:27</span>
            </div>
          </div>

          {/* Home Indicator */}
          <div id="cmp-42-614" className="component" aria-hidden="true">
            <div id="home-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
