import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main menu title', () => {
  render(<App />);
  expect(screen.getByText('Menu')).toBeInTheDocument();
});