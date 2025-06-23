import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import TabsBlock from '.';

test('my first test', () => {
  // Arrange
  render(<TabsBlock />);

  // Act
  const foo = screen.getByText(/search/i);
  // get function throws an error if not found, query doesn't, find returns a promise

  // Assert
  expect(foo).toBeInTheDocument();
});
