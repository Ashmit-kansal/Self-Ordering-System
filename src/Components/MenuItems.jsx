import React, { useState } from 'react';

const MenuItems = ({ items, cart, setCart }) => {
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
    setAddedItems({ ...addedItems, [item._id]: true });
  };

  const handleQuantityChange = (item, delta) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + delta;
      if (newQuantity > 0 && newQuantity <= 5) {
        setCart(
          cart.map(cartItem =>
            cartItem._id === item._id ? { ...cartItem, quantity: newQuantity } : cartItem
          )
        );
      } else if (newQuantity > 5) {
        alert('You can only add up to 5 of each item.');
      } else {
        setCart(cart.filter(cartItem => cartItem._id !== item._id));
        setAddedItems({ ...addedItems, [item._id]: false });
      }
    }
  };

  const getQuantity = (item) => {
    const cartItem = cart.find(cartItem => cartItem._id === item._id);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="grid grid-cols-2 custom-md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map(item => (
        <div
          key={item._id}
          className="border border-gray-300 rounded-lg overflow-hidden shadow-lg flex flex-col"
        >
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-auto h-48 object-cover"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2">{item.productName}</h3>
            <p className="text-gray-700 mb-2 flex-grow hidden custom-md:block">
              {item.description}
            </p>
            <div className="mt-auto">
              <p className="text-lg font-bold mb-2">₹{item.price}</p>
              {addedItems[item._id] ? (
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{getQuantity(item)}</span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition duration-300 ease-in-out"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;