// src/pages/Cart/Cart.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";
import { TrashIcon } from "@heroicons/react/24/outline";

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 40; // Fixed shipping cost
  const total = subtotal + shipping;

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  // Handle remove item
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Add some items to your cart to see them here.
          </p>
          <a
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border-b last:border-b-0"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow ml-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">${item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and Remove Button */}
                <div className="flex flex-col items-end ml-4">
                  <span className="font-bold mb-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
