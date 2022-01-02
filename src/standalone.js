/* eslint-disable prefer-destructuring */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { DispatcherFactory } from '@tbiegner99/home-automation-app-helpers';
import rootReducer from './reducers/rootReducer';
import KareokeMain from './pages/Kareoke';

const store = createStore(rootReducer);
DispatcherFactory.setDispatchingStrategy(store);

const Main = (props) => (
  <Provider store={store}>
    <KareokeMain shouldHandleDefaultRoute {...props} />
  </Provider>
);

ReactDOM.render(<Main />, document.body);
