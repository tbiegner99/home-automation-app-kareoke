/* eslint-disable prefer-destructuring */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import singleSpaReact from 'single-spa-react';
import { DispatcherFactory } from '@tbiegner99/ui-app-components';
import rootReducer from './reducers/rootReducer';
import KareokeMain from './pages/Kareoke';

const store = createStore(rootReducer);
DispatcherFactory.setDispatchingStrategy(store);

const Main = (props) => (
  <Provider store={store}>
    <KareokeMain shouldHandleDefaultRoute {...props} />
  </Provider>
);

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Main,
  errorBoundary(/* err, info, props */) {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
  }
});

const navConfig = [
  {
    type: 'action',
    icon: 'hamburger',
    event: 'show-playlist'
  }
];

const setupNav = () => {
  const evt = new CustomEvent('nav-update', { detail: { config: navConfig } });
  window.dispatchEvent(evt);
};

const clearNav = () => {
  const evt = new CustomEvent('nav-clear');
  window.dispatchEvent(evt);
};

const navMountListener = () => {
  setupNav();
};

const listenForNavMount = () => {
  window.addEventListener('nav-mounted', navMountListener);
};

const cleanupNavListener = () => {
  window.removeEventListener('nav-mounted', navMountListener);
};

export const bootstrap = reactLifecycles.bootstrap;
export const mount = (props) => {
  setupNav();
  listenForNavMount();

  return reactLifecycles.mount(props);
};

export const unmount = async (props) => {
  clearNav();
  cleanupNavListener();
  return reactLifecycles.unmount(props);
};
