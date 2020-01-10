import React from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';

const initGA = () => {
  ReactGA.initialize('UA-119932656-2');
};

const LogPageView = url => {
  ReactGA.set({ page: url });
  ReactGA.pageview(url);
};

Router.events.on('routeChangeStart', url => {
  initGA();
  LogPageView(url);
});

export default class GoogleAnalytics extends React.Component {
  componentDidMount() {
    const url = window.location.pathname;
    initGA();
    LogPageView(url);
  }

  render() {
    return null;
  }
}
