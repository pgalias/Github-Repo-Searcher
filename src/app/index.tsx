import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { Main } from './components/main';
import { links } from './constants';

const Layout: FunctionComponent = () => (
  <Router>
    <Header />
    <Main>
      <Switch>
        {links.map(link => (
          <Route path={link.path} component={link.components} exact key={link.name} />
        ))}
      </Switch>
    </Main>
  </Router>
);

export default Layout;
