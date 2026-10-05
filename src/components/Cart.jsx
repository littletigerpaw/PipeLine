function Cart({ items, onIncrease, onDecrease, onCheckout }) {
  return (
    <aside className="cart-panel" aria-label="Shopping cart">
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <div className="cart-item-details">
                  <strong>{item.name}</strong>
                  <span>${item.price.toFixed(2)}</span>
                </div>

                <div className="quantity-control">
                  <button
                    type="button"
                    className="qty-button"
                    aria-label="decrease quantity"
                    onClick={() => onDecrease(item.id)}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="qty-button"
                    aria-label="increase quantity"
                    onClick={() => onIncrease(item.id)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {onCheckout && (
            <button type="button" className="primary-button full-width" onClick={onCheckout}>
              Proceed to checkout
            </button>
          )}
        </>
      )}
    </aside>
  );
}

export default Cart;
