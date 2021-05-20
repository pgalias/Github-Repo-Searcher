import React from 'react';
import { screen, render } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader component', () => {
  test('should render loader', () => {
    render(<Loader />);

    expect(screen.getByRole('alert')).toMatchSnapshot();
  });
});
