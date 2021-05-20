import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { links } from '../../constants/navigation';

describe('Header component', () => {
  test('should contain links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(links.length);
  });
});
