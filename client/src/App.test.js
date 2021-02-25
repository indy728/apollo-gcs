import { render, screen } from '@testing-library/react';
import App from './App';

test('renders meatport', () => {
  render(<App />);
  const linkElement = screen.getByText(/meatport/i);
  expect(linkElement).toBeInTheDocument();
});
