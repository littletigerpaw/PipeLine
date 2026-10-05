import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import type { CartItem, Product } from './types';
import './App.css';

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Mouse',
    description: 'Precision control for everyday work.',
    price: 29.99,
    imageUrl:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    description: 'Tactile keys with a compact layout.',
    price: 89.99,
    imageUrl:
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: '4K Monitor',
    description: 'Crisp visuals with vibrant color accuracy.',
    price: 249.99,
    imageUrl:
      'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=900&q=80',
  },
];

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY ?? '';

async function fetchProductImage(query: string): Promise<string | null> {
  if (!accessKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      results?: Array<{ urls?: { regular?: string } }>;
    };

    return data.results?.[0]?.urls?.regular ?? null;
  } catch {
    return null;
  }
}

function App() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      const updatedProducts = await Promise.all(
        fallbackProducts.map(async (product) => {
          const imageUrl = await fetchProductImage(product.name);

          return {
            ...product,
            imageUrl: imageUrl || product.imageUrl,
          };
        }),
      );

      if (isMounted) {
        setProducts(updatedProducts);
      }
    };

    void loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId: number) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <div className="storefront">
      <header className="topbar">
        <div>
          <p className="eyebrow">Firebase Commerce</p>
          <h1>Shop Smart</h1>
        </div>
        <div className="header-actions">
          <div className="cart-summary" aria-live="polite">
            <span>{totalItems} item{totalItems === 1 ? '' : 's'} in cart</span>
          </div>
          {cartItems.length > 0 && (
            <button
              type="button"
              className="primary-button"
              onClick={() => setShowCheckout((current) => !current)}
            >
              {showCheckout ? 'Keep shopping' : 'Checkout'}
            </button>
          )}
        </div>
      </header>

      {showCheckout ? (
        <CheckoutForm
          items={cartItems}
          total={totalPrice}
          onBack={() => setShowCheckout(false)}
        />
      ) : (
        <>
          <main className="catalog-layout">
            <section className="catalog" aria-label="Product catalog">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </section>

            <Cart
              items={cartItems}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onCheckout={() => setShowCheckout(true)}
            />
          </main>

          <footer className="totals">
            <span>Order total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
