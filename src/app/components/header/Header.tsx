import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import styled from '@emotion/styled';
import { links } from '../../constants';

const HeaderWrapper = styled.header`
  background-color: #4b5563;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Header: FunctionComponent = () => (
  <HeaderWrapper>
    <Container fixed>
      <List>
        {links.map(link => (
          <li key={link.name}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </List>
    </Container>
  </HeaderWrapper>
);
