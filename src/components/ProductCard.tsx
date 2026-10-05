import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <img
        className="product-image"
        src={product.imageUrl}
        alt={`${product.name} product`}
        loading="lazy"
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>

      <div className="product-meta">
        <span className="price">${product.price.toFixed(2)}</span>
        <button type="button" onClick={() => onAdd(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
