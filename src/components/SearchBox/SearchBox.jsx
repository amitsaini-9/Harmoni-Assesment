import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleCategorySelect = (category) => {
    setSearchTerm(category);
    setShowDropdown(false);
    navigate(`/categories/${encodeURIComponent(category)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    // Check if the search term matches any category
    const matchedCategory = categories.find((category) =>
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchedCategory) {
      navigate(`/categories/${encodeURIComponent(matchedCategory)}`);
    } else {
      toast.error("No matching category found");
      navigate("/categories");
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };
  return (
    <div
      ref={dropdownRef}
      className="relative w-full md:w-[300px] lg:w-[400px] xl:w-[500px]"
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="What are you looking for?"
          className="w-full px-4 py-2 pr-10 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </form>

      {/* Categories Dropdown */}
      {showDropdown && !error && categories.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg z-50 p-4 text-center">
          Loading categories...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute w-full mt-1 bg-red-50 rounded-md shadow-lg z-50 p-4 text-center text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
