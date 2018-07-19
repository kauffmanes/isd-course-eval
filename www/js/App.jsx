import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import '../assets/css/styles.css';

// templates
import Guard from './Guard';

const routes = [
    {
        path: '/guard',
        main: () => <Guard />
    },
    {
        path: '/',
        exact: true,
        main: () => <Redirect to="/guard" />
    }
];

const App = () => (
  <Router>
    <Provider store={store}>
      <main>
        {routes.map((route, index) => (
          <Route
            key={index} // eslint-disable-line
            path={route.path}
            exact={route.exact}
            render={route.main}
          />
        ))}
      </main>
    </Provider>
  </Router>
);

render(<App />, document.getElementById('root'));
