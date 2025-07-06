import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import TabsBlock from '.';

describe('Tab block component', () => {
  test('renders "search" text', () => {
    // Arrange
    render(<TabsBlock />);

    // Act
    const foo = screen.getByText('search', { exact: false });
    // const foo = screen.getByText(/search/i);
    // get function throws an error if not found, query doesn't, find returns a promise
    // Assert
    expect(foo).toBeInTheDocument();
  });

  it('has an element with button role', () => {
    render(<TabsBlock />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

  test('button click works', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          adult: false,
          backdrop_path: '/ktTqUdHpKTg5a5EbZqg1OW8aPl8.jpg',
          genre_ids: [99],
          id: 153410,
          original_language: 'en',
          original_title: 'Kiss',
          overview:
            'An hour-long paean to the art of the kiss featuring fourteen couples, from passionate participants to lethargic lovers, engaging in the intimate act.',
          popularity: 0.5146,
          poster_path: '/2PCxc68q6vP9uyEHkGUNUAnSHk9.jpg',
          release_date: '1963-12-31',
          title: 'Kiss',
          video: false,
          vote_average: 4.6,
          vote_count: 33,
        },
      ],
    });
    render(<TabsBlock />);

    const inputField = screen.getByPlaceholderText('type to search', { exact: false });
    await userEvent.type(inputField, 'kiss');

    const btn = screen.getAllByRole('button');
    const btnSearch = btn.filter((b) => b.classList.contains('ant-input-search-button'));

    expect(btnSearch).not.toHaveLength(0);
    // await userEvent.click(btnSearch[0]);
    // screen.debug();
    // const movie = await findByText('Kiss', { exact: false, timeout: 10000 });
    // expect(movie).toBeInTheDocument();
  });
});

describe('Events suit', () => {
  it('fireEvent test with checkbox', () => {
    const handleChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={handleChange} />);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it('input focus test', () => {
    const { getByTestId } = render(<input type="text" data-testid="foobar" />);
    const inputT = getByTestId('foobar');
    expect(inputT).not.toHaveFocus();
    inputT.focus();
    expect(inputT).toHaveFocus();
  });

  it('userEvent test with checkbox', async () => {
    const handleChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={handleChange} />);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    await userEvent.dblClick(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });
});
