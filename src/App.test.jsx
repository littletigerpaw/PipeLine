import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('updates the cart when a product is added', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

    expect(screen.getByText(/1 item in cart/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /wireless mouse/i })).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveTextContent('Wireless Mouse');
    expect(screen.getByRole('listitem')).toHaveTextContent('$29.99');
  });
});
