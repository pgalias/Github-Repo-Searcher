import React from 'react';
import { render, screen } from '@testing-library/react';
import { Main } from './Main';
import { Loader } from '../loader';

describe('Main component', () => {
  test('should render with text type children', () => {
    render(
      <Main>
        <p>foo</p>
      </Main>,
    );

    expect(screen.getByRole('main')).toMatchSnapshot();
  });

  test('should render with react component type children', () => {
    render(
      <Main>
        <Loader />
      </Main>,
    );

    expect(screen.getByRole('main')).toMatchSnapshot();
  });
});
