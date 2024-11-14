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

  return (
    <div className="container mx-auto p-4 flex flex-col custom-md:flex-row custom-md:gap-4">
      <div className="sidebar w-full custom-md:w-64 p-4">
        <SearchBox onSearch={handleSearch} />
        <MenuFilters onFilter={handleFilter} />
      </div>
      <div className="main-content flex-1 custom-md:w-7/12 p-4 pr-0">
        <div className="hidden custom-sm:block">
          <Offers onApplyCoupon={setAppliedCoupon} />
        </div>
        <MenuItems items={filteredItems} cart={cart} setCart={setCart} />
      </div>
    </div>
  );
};

export default Home;