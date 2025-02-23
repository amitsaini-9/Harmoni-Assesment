// src/pages/Home/Home.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Hero from "../../components/Hero/Hero";
import DiscoverSection from "../../components/DiscoverSection/DiscoverSection";
import ProductModal from "../../components/ProductModal/ProductModal";

function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  // Add these state variables for modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Add these handlers for modal
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <DiscoverSection />
      <main className="container mx-auto px-4 py-8">
        {/* Pass the handleOpenModal to ProductGrid */}
        <ProductGrid products={items} onOpenModal={handleOpenModal} />

        {/* Add the ProductModal component */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      </main>
    </div>
  );
}

export default Home;
