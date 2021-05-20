import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import styled from '@emotion/styled';
import { links } from '../../constants/navigation';

const HeaderWrapper = styled.header`
  background-color: #4b5563;
  color: #f9fafb;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  text-align: center;
  a {
    color: inherit;
  }
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
