import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const categories = [
    'burger',
    'pizza',
    'beverage',
    'Chinese Special',
    'South indian',
    'Punjabi Special',
    'Desserts',
    'Sandwiches'
  ];

  useEffect(() => {
    fetchAllMenuItems();
  }, []);

  const fetchAllMenuItems = async () => {
    const allItems = [];
    for (const category of categories) {
      try {
        const response = await fetch(`https://selffoodbackend.onrender.com/api/v1/user/products/category/${category}`);
        const data = await response.json();
        if (data.success) {
          allItems.push(...data.data);
        } else {
          console.error(`Failed to fetch data for category ${category}:`, data.message);
        }
      } catch (error) {
        console.error(`Error fetching menu items for category ${category}:`, error);
      }
    }
    setMenuItems(allItems);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Full Menu</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg flex flex-col"
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{item.productName}</h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <p className="text-lg font-bold mt-auto">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;