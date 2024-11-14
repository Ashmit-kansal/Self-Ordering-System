import React from 'react';

const MenuItems = ({ items, onAddToCart }) => {
  const truncateDescription = (description, maxLength) => {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + '...';
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
            <p className="text-gray-700 mb-2 flex-grow">
              {truncateDescription(item.description, 100)}
            </p>
            <div className="mt-auto">
              <p className="text-lg font-bold mb-2">₹{item.price}</p>
              <button
                onClick={() => onAddToCart(item)}
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition duration-300 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;