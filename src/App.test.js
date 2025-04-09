import { render, screen } from '@testing-library/react';
import App from './App';

test('Group 12, Erika Ortiz ID 456980', () => {
  render(<App />);
  const linkElement = screen.getByText(/Group 12, Erika Ortiz ID 456980/i);
  expect(linkElement).toBeInTheDocument();
});
