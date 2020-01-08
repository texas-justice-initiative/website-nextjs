import React from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';

/*
async function fetchData(url) {
  const res = await fetch(url);
  const params = await res.json();
  return params;
}
*/

const initGA = () => {
  ReactGA.initialize('UA-119932656-2');
};

const LogPageView = () => {
  console.log(window.location.pathname);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  initGA();
  LogPageView();
});

export default class GoogleAnalytics extends React.Component {
  componentDidMount() {
    initGA();
    LogPageView();
  }

  render() {
    return null;
  }
}
