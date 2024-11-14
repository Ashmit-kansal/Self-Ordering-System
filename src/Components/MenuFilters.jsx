import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faPizzaSlice, faCoffee, faUtensils, faIceCream, faBreadSlice, faDrumstickBite, faCookie } from '@fortawesome/free-solid-svg-icons';

const MenuFilters = ({ onFilter }) => {
  const categories = [
    { name: 'burger', icon: faHamburger },
    { name: 'pizza', icon: faPizzaSlice },
    { name: 'beverage', icon: faCoffee },
    { name: 'Chinese Special', icon: faUtensils },
    { name: 'South indian', icon: faBreadSlice },
    { name: 'Punjabi Special', icon: faDrumstickBite },
    { name: 'Desserts', icon: faIceCream },
    { name: 'Sandwiches', icon: faCookie }
  ];

  const formatCategoryName = (category) => {
    return category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="grid grid-cols-2 custom-sm:grid-cols-4 custom-md:grid-cols-1 gap-4">
      {categories.map((category, index) => (
        <button
          key={category.name}
          onClick={() => onFilter(category.name)}
          className="flex items-center bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
        >
          <FontAwesomeIcon icon={category.icon} className="mr-2" />
          {formatCategoryName(category.name)}
        </button>
      ))}
    </div>
  );
};

export default MenuFilters;