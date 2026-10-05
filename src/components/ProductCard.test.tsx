import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  it('renders product details and handles add-to-cart actions', async () => {
    const user = userEvent.setup();
    const onAdd = jest.fn();
    const product = {
      id: 1,
      name: 'Wireless Mouse',
      description: 'Precision control for everyday work.',
      price: 29.99,
    };

    render(<ProductCard product={product} onAdd={onAdd} />);

    expect(screen.getByText(/wireless mouse/i)).toBeInTheDocument();
    expect(screen.getByText(/\$29\.99/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
