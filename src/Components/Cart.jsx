import React from 'react';
import Offers from './Offers';

const Cart = ({ cart, setCart, onConfirmOrder, appliedCoupon }) => {
  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0 && newQuantity <= 5) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: newQuantity } : cartItem
        )
      );
    } else if (newQuantity > 5) {
      alert('You can only add up to 5 of each item.');
    } else {
      setCart(cart.filter((cartItem) => cartItem._id !== item._id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      <div className="p-4 bg-gray-100 rounded">
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in the cart</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center pb-2 mb-2 border-b border-gray-300 last:border-b-0 last:mb-0"
            >
              <div className="flex items-center">
                <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover rounded mr-4" />
                <div>
                  <p className="font-semibold">{item.productName}</p>
                  <p>{item.description}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item, -1)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item, 1)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Offers onApplyCoupon={() => {}} />
      <button
        onClick={onConfirmOrder}
        className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2 px-4 rounded-lg shadow-md
          hover:from-orange-500 hover:to-orange-700 transition duration-300 ease-in-out mt-4 w-full"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Cart;