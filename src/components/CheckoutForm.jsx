import { useMemo, useState } from 'react';

function CheckoutForm({ items, total, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [submitted, setSubmitted] = useState(false);

  const shippingCost = useMemo(
    () => (shippingMethod === 'expedited' ? 18.99 : 6.99),
    [shippingMethod],
  );

  const grandTotal = total + shippingCost;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <div>
          <p className="eyebrow">Secure checkout</p>
          <h2>Complete your order</h2>
        </div>
        <button type="button" className="secondary-button" onClick={onBack}>
          Back to cart
        </button>
      </div>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Shipping information</h3>

            <div className="form-row">
              <label>
                Full name
                <input type="text" name="fullName" placeholder="Jordan Smith" required />
              </label>
              <label>
                Email address
                <input type="email" name="email" placeholder="jordan@example.com" required />
              </label>
            </div>

            <label>
              Street address
              <input type="text" name="address" placeholder="123 Market Street" required />
            </label>

            <div className="form-row">
              <label>
                City
                <input type="text" name="city" placeholder="Austin" required />
              </label>
              <label>
                State
                <input type="text" name="state" placeholder="Texas" required />
              </label>
            </div>

            <div className="form-row">
              <label>
                ZIP code
                <input type="text" name="zip" placeholder="78701" required />
              </label>
              <label>
                Country
                <input type="text" name="country" placeholder="United States" required />
              </label>
            </div>

            <div className="shipping-options">
              <h4>Shipping speed</h4>
              <label>
                <input
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                />
                Standard shipping - 5 to 7 days ($6.99)
              </label>
              <label>
                <input
                  type="radio"
                  name="shippingMethod"
                  value="expedited"
                  checked={shippingMethod === 'expedited'}
                  onChange={() => setShippingMethod('expedited')}
                />
                Expedited shipping - 2 to 3 days ($18.99)
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Payment details</h3>

            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                Credit card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="crypto"
                  checked={paymentMethod === 'crypto'}
                  onChange={() => setPaymentMethod('crypto')}
                />
                Crypto / Bitcoin
              </label>
            </div>

            {paymentMethod === 'card' ? (
              <div className="payment-fields">
                <label>
                  Cardholder name
                  <input type="text" name="cardName" placeholder="Jordan Smith" required />
                </label>
                <label>
                  Card number
                  <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" required />
                </label>
                <div className="form-row">
                  <label>
                    Expiration
                    <input type="text" name="expiry" placeholder="MM/YY" required />
                  </label>
                  <label>
                    CVV
                    <input type="text" name="cvv" placeholder="123" required />
                  </label>
                </div>
              </div>
            ) : (
              <div className="payment-fields">
                <label>
                  Wallet address
                  <input type="text" name="cryptoAddress" placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" required />
                </label>
                <label>
                  Network
                  <select name="cryptoNetwork" defaultValue="bitcoin">
                    <option value="bitcoin">Bitcoin</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="solana">Solana</option>
                    <option value="litecoin">Litecoin</option>
                  </select>
                </label>
              </div>
            )}
          </div>

          <button type="submit" className="primary-button full-width">
            Place Order
          </button>
          {submitted && (
            <p className="checkout-success">Your order has been placed successfully.</p>
          )}
        </form>

        <aside className="checkout-summary" aria-label="Order summary">
          <h3>Order summary</h3>

          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <span>Qty: {item.quantity}</span>
                </div>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>${shippingCost.toFixed(2)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CheckoutForm;
