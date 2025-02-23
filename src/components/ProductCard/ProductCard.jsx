import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

function ProductCard({ product, onOpenModal }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  // Handle keyboard interaction
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenModal(product);
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div
      onClick={() => onOpenModal(product)}
      onKeyDown={handleKeyPress}
      tabIndex="0"
      role="button"
      aria-label={`View details of ${product.title}`}
      className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2"
    >
      <div className="relative">
        {product.isNew && (
          <span
            className="absolute top-2 left-2 bg-[#00FF85] text-xs px-2 py-1 rounded"
            role="badge"
            aria-label="New Product"
          >
            NEW
          </span>
        )}
        <div className="aspect-w-1 aspect-h-1 bg-white p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain"
            loading="lazy"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-1">{product.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="text-[#FF6B00] font-bold"
              aria-label={`Price: $${product.price}`}
            >
              ${product.price}
            </span>
            <div
              className="flex items-center"
              aria-label={`Rated ${product.rating?.rate} out of 5 stars`}
            >
              <div className="flex" aria-hidden="true">
                {renderStars(product.rating?.rate || 0)}
              </div>
              <span className="text-gray-500 text-sm ml-1">
                ({product.rating?.count || 0} Reviews)
              </span>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label={`Add ${product.title} to cart`}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
