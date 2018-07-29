import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import '../assets/css/styles.css';

// components
import PrimaryHeader from './components/PrimaryHeader';
import SecondaryHeader from './components/SecondaryHeader';

// pages
import Guard from './core/Guard';
import Feedback from './core/Feedback';
import Survey from './core/Survey';
import Admin from './core/Admin';

const routes = [
  {
    path: '/guard',
    main: () => <Guard />,
    header: () => <PrimaryHeader />
  },
  {
    path: '/feedback',
    main: () => <Feedback />,
    header: () => <PrimaryHeader />
  },
  {
    path: '/survey',
    main: () => <Survey />,
    header: () => <SecondaryHeader />
  },
  {
    path: '/admin',
    main: () => <Admin />,
    header: () => <PrimaryHeader />
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
            render={route.header}
          />
        ))}
        {routes.map((route, index) => (
          <Route
            key={index} // eslint-disable-line
            path={route.path}
            exact={route.exact}
            render={route.main}
          />
        ))}
        {routes.map((route, index) => (
          <Route
            key={index} // eslint-disable-line
            path={route.path}
            exact={route.exact}
            render={route.footer}
          />
        ))}
      </main>
    </Provider>
  </Router>
);

render(<App />, document.getElementById('root'));
