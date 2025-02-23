import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

function ProductModal({ isOpen, onClose, product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    onClose();
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="relative z-50"
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 rounded-lg p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <DialogTitle
                      id="product-modal-title"
                      className="text-2xl font-bold mb-4"
                    >
                      {product.title}
                    </DialogTitle>

                    {/* Price and Rating */}
                    <div id="product-modal-description" className="mb-4">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        ${product.price}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating?.rate || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-500">
                          ({product.rating?.count || 0} Reviews)
                        </span>
                      </div>
                      <div className="text-green-500 text-sm mt-2">
                        In Stock
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={decrementQuantity}
                        className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>

                    {/* Buy Now Button */}
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ProductModal;
