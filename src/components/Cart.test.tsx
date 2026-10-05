import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from './Cart';

describe('Cart', () => {
  it('shows item quantity and calls the increase handler', async () => {
    const user = userEvent.setup();
    const onIncrease = jest.fn();
    const onDecrease = jest.fn();
    const items = [
      {
        id: 1,
        name: 'Wireless Mouse',
        price: 29.99,
        quantity: 2,
      },
    ];

    render(
      <Cart
        items={items}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />,
    );

    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText(/^2$/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /increase quantity/i }));

    expect(onIncrease).toHaveBeenCalledTimes(1);
    expect(onIncrease).toHaveBeenCalledWith(1);
  });
});
