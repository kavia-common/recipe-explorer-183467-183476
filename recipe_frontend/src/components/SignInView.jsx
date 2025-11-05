import React, { useEffect, useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * SignInView renders the Figma-extracted Sign In screen with pixel-perfect fidelity.
 * Implementation notes:
 * - We inject the exact HTML structure and IDs/classes from assets/sign-in-11-235.html (body content only).
 * - We add a local "sandbox" wrapper that resets inherited styles to prevent reflow differences.
 * - We dynamically append the Figma JS (assets/sign-in-11-235.js) so focus/submit behaviors execute.
 * - Images are referenced with the exact figmaimages/ paths used in the HTML. We copy those to public.
 * - Global common.css is imported from index.js, while this component specifically imports sign-in CSS to ensure order.
 */

/* We import the screen-specific CSS here to keep styles scoped to this view and
   ensure it loads after app styles. Since CRA bundles CSS, this preserves specificity.
   Note: Global token vars are provided by public/assets/common.css, injected by index.js at runtime. */
import '../assets/sign-in-11-235.css';

/**
 * The raw inner HTML from assets/sign-in-11-235.html, specifically the body content under #screen-sign-in-11-235.
 * We preserve exact structure and IDs to avoid any layout shifts.
 * IMPORTANT:
 * - Paths to images are exactly as in the Figma HTML (figmaimages/...).
 * - The surrounding sandbox container isolates font, line-height, and resets that could affect measurements.
 */
export default function SignInView() {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    // Dynamically load the Figma behavior script so focus states and submit stub work.
    const script = document.createElement('script');
    script.src = '/assets/sign-in-11-235.js';
    script.async = true;
    scriptRef.current = script;
    document.body.appendChild(script);

    // Cleanup on unmount
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

  return (
    <div
      className="figma-sandbox"
      /* Sandbox explains:
       * - Prevent inherited fonts/line-height from app theme from changing Figma pixels
       * - Do not wrap the screen element in additional boxes that could cause reflow.
       */
      style={{
        // Reset to match the extraction assumptions from common.css
        fontFamily: "'Poppins', 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
        lineHeight: 'normal',
        fontSize: 'initial',
        background: 'transparent',
        display: 'grid',
        placeContent: 'center',
        minHeight: 'calc(100vh - 64px)', // leave room if navbar exists, but it won't affect inner screen positioning
        padding: 16,
      }}
      ref={containerRef}
    >
      {/* This is the exact markup from assets/sign-in-11-235.html, body content only.
          Note: We keep the same IDs and the exact figmaimages/ refs.
          IMPORTANT: These image assets are made available under /assets/figmaimages via copy to public.
       */}
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
          {/* The original HTML references an SVG file for rect; if missing, we can keep <div> with same styles.
              However, to preserve pixel-perfect layout we keep an <img> as in original. */}
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
  );
}
