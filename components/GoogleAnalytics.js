import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-119932656-2');
};

export const LogPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
