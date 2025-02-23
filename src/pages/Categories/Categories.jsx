// src/pages/Categories/index.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../../redux/slices/productSlice";
import { toast } from "react-hot-toast";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductModal from "../../components/ProductModal/ProductModal";

function Categories() {
  const { categoryName } = useParams(); // Changed from category to categoryName
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || null
  );
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  // Fetch categories and initial products
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories");
        toast.error("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle initial product loading and category changes
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        if (categoryName) {
          await dispatch(fetchProductsByCategory(categoryName)).unwrap();
          setSelectedCategory(categoryName);
        } else {
          await dispatch(fetchProducts()).unwrap();
          setSelectedCategory(null);
        }
      } catch (err) {
        toast.error(`Failed to load ${categoryName || "all"} products`);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [categoryName, dispatch]);
  if (status === "loading") {
    return (
      <div
        className="flex items-center justify-center min-h-[400px]"
        role="status"
        aria-label="Loading products"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage message={error} retry={() => dispatch(fetchProducts())} />
    );
  }
  // Handle category selection
  const handleCategoryClick = (category) => {
    if (category) {
      navigate(`/categories/${encodeURIComponent(category)}`);
    } else {
      navigate("/categories");
    }
  };

  // Handle modal open
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`p-6 rounded-lg shadow-md text-center transition-all
            ${
              !selectedCategory
                ? "bg-[#FDB813] text-white"
                : "bg-white hover:bg-gray-50"
            }`}
        >
          <h3 className="text-lg font-semibold">All Products</h3>
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`p-6 rounded-lg shadow-md text-center transition-all
              ${
                selectedCategory === category
                  ? "bg-[#FDB813] text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
          >
            <h3 className="text-lg font-semibold capitalize">{category}</h3>
          </button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {(isLoading || status === "loading") && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Products Section */}
      {!isLoading && !error && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedCategory
                ? `${
                    selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  } Products`
                : "All Products"}
            </h2>
            <span className="text-gray-600">{items.length} products</span>
          </div>

          <ProductGrid products={items} onOpenModal={handleOpenModal} />
          <ProductModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            product={selectedProduct}
          />

          {/* Empty State */}
          {items.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Categories;
