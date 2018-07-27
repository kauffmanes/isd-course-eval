import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import '../assets/css/styles.css';

// components
import PrimaryHeader from './components/PrimaryHeader';
import SecondaryHeader from './components/SecondaryHeader';
import PrimaryFooter from './components/PrimaryFooter';
import SecondaryFooter from './components/SecondaryFooter';

// pages
import Guard from './core/Guard';
import Feedback from './core/Feedback';
import Survey from './core/Survey';

const routes = [
  {
    path: '/guard',
    main: () => <Guard />,
    header: () => <PrimaryHeader />,
    footer: () => <PrimaryFooter />
  },
  {
    path: '/feedback',
    main: () => <Feedback />,
    header: () => <PrimaryHeader />,
    footer: () => <PrimaryFooter />
  },
  {
    path: '/survey',
    main: () => <Survey />,
    header: () => <SecondaryHeader />,
    footer: () => <SecondaryFooter />
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
