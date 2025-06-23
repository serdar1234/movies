import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import TabsBlock from '.';

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function mockMatchMedia() {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
    };
});

test('my first test', () => {
  render(<TabsBlock />);
  const foo = screen.getByText(/search/i);
  expect(foo).toBeInTheDocument();
});
