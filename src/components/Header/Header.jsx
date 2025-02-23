// src/components/Header/Header.jsx
import { useState, useRef } from "react";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import SearchBox from "../SearchBox/SearchBox";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Link } from "react-router-dom";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { totalQuantity } = useSelector((state) => state.cart);
  const moreOptions = [
    { label: "My Account", href: "/account" },
    { label: "Orders", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Settings", href: "/settings" },
  ];

  // Click outside handler
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <header className="sticky top-0 bg-[#FDB813] py-3 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between lg:justify-start lg:gap-8">
          {/* Logo */}
          <div className="text-black font-semibold text-xl flex-shrink-0">
            Harmoni
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <Link to="/" className="text-black hover:text-gray-700">
              Home Page
            </Link>
            <Link to="/categories" className="text-black hover:text-gray-700">
              Categories
            </Link>
            <Link to="/contact" className="text-black hover:text-gray-700">
              Contact Us
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-black hover:text-gray-700 flex items-center gap-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                More Options
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {moreOptions.map((option) => (
                    <a
                      key={option.label}
                      href={option.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-grow lg:flex-grow-0 mx-4">
            <SearchBox />
          </div>

          {/* Cart and User Icons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Cart Icon */}
            <div className="relative cursor-pointer">
              <Link to="/cart" className="relative inline-block">
                <ShoppingCartIcon className="h-6 w-6 text-black" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity || 0}
                </span>
              </Link>
            </div>

            {/* User Account Icon */}
            <div className="relative cursor-pointer">
              <div className="rounded-full w-8 h-8 flex items-center justify-center">
                <UserCircleIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <SearchBox />
        </div>
      </div>
    </header>
  );
}

export default Header;
