import React from 'react';
import SignInView from './components/SignInView';

/**
 * PUBLIC_INTERFACE
 * SignInPage provides a thin wrapper to render SignInView as a page route.
 * No additional layout is applied to avoid style interference.
 */
export default function SignInPage() {
  return <SignInView />;
}
