import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import MenuFilters from './MenuFilters';
import Offers from './Offers';
import MenuItems from './MenuItems';

const Home = ({ cart, setCart, appliedCoupon, setAppliedCoupon }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [category, setCategory] = useState('burger');

  useEffect(() => {
    fetchMenuItems(category);
  }, [category]);

  const fetchMenuItems = async (category) => {
    try {
      const response = await fetch(
        `https://selffoodbackend.onrender.com/api/v1/user/products/category/${category}`
      );
      const data = await response.json();
      if (data.success) {
        setMenuItems(data.data);
        setFilteredItems(data.data);
      } else {
        console.error('Failed to fetch data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setFilteredItems(
      menuItems.filter((item) =>
        item.productName.toLowerCase().includes(query)
      )
    );
  };

  const handleFilter = (category) => {
    setCategory(category);
  };

  const handleAddToCart = (item) => {
    if (cart.length >= 10 && !cart.some((cartItem) => cartItem._id === item._id)) {
      alert('You can only add up to 10 different items to the cart.');
      return;
    }
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      if (existingItem.quantity < 5) {
        setCart(
          cart.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        alert('You can only add up to 5 of each item.');
      }
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col custom-md:flex-row custom-md:gap-4">
      <div className="sidebar w-full custom-md:w-64 p-4">
        <SearchBox onSearch={handleSearch} />
        <MenuFilters onFilter={handleFilter} />
      </div>
      <div className="main-content flex-1 custom-md:w-7/12 p-4 pr-0">
        <div className="hidden custom-sm:block">
          <Offers onApplyCoupon={handleApplyCoupon} />
        </div>
        <MenuItems items={filteredItems} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default Home;