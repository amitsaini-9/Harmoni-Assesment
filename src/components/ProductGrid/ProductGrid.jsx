// src/components/ProductGrid/ProductGrid.jsx
import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ products, onOpenModal }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenModal={onOpenModal}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
