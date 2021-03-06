import React, { FunctionComponent, ReactElement } from 'react';
import styled from '@emotion/styled';
import Container from '@material-ui/core/Container';

const MainWrapper = styled.main`
  background-color: #f3f4f6;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
`;

export const Main: FunctionComponent<{ children: ReactElement }> = ({ children }) => (
  <MainWrapper>
    <Container fixed>{children}</Container>
  </MainWrapper>
);
