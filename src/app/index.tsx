import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { Header } from './components/header';
import { Main } from './components/main';
import { links } from './constants/navigation';
import { RepositoryProvider } from './contexts/repository/provider';

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Layout: FunctionComponent = () => (
  <RepositoryProvider>
    <Router>
      <Wrapper>
        <Header />
        <Main>
          <Switch>
            <Route path="/" exact>
              <Redirect to={links[0].path} />
            </Route>
            {links.map(link => (
              <Route path={link.path} component={link.component} exact sensitive={false} key={link.name} />
            ))}
          </Switch>
        </Main>
      </Wrapper>
    </Router>
  </RepositoryProvider>
);

export default Layout;
