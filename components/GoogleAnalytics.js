'use client';

import { useEffect } from 'react';
import router from 'next/router';
import ReactGA from 'react-ga';

const initGA = () => {
  ReactGA.initialize('UA-119932656-1');
};

const LogPageView = (url) => {
  ReactGA.set({ page: url });
  ReactGA.pageview(url);
};

/**
 * Next.js no longer pre-renders router.events and therefore accessing it
 * now needs to occur through the useEffect hook.
 *
 * Next.js documentation: https://nextjs.org/docs/upgrading#update-usage-of-routerevents
 */
export default function GoogleAnalytics() {
  useEffect(() => {
    const handleRouteChange = (url) => {
      initGA();
      LogPageView(url);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return null;
}
