import ReactGA from 'react-ga';

export const initGA = analyticsID => {
  console.log(analyticsID);
  ReactGA.initialize(analyticsID);
};

export const LogPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
