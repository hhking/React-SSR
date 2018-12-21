import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import createStore from './store';
import routes from './routes';

const store = createStore(window.REDUX_DATA);

delete window.REDUX_DATA

const App = () => (
  <Provider store={store}>
    <Router>
      {renderRoutes(routes)}
    </Router>
  </Provider>
);

hydrate(<App />, document.getElementById("app"));