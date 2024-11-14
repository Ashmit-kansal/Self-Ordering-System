import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import backgroundImage from '../assets/di.jpeg'; // Adjust the path if necessary

const Offers = ({ onApplyCoupon }) => {
  const handleViewCoupon = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    alert(`Coupon code ${couponCode} copied to clipboard!`);
    onApplyCoupon(couponCode);
  };

  return (
    <div className="text-center mb-4">
      <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
      <div
        className="carousel-background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false} showIndicators={false}>
          <div className="p-4 bg-gray-100 bg-opacity-75 rounded">
            <h3 className="text-xl font-semibold">Order above ₹599</h3>
            <p className="mb-2">Get 10% discount</p>
            <button
              onClick={() => handleViewCoupon('DISCOUNT10')}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
            >
              View Coupon
            </button>
          </div>
          <div className="p-4 bg-gray-100 bg-opacity-75 rounded">
            <h3 className="text-xl font-semibold">Order above ₹999</h3>
            <p className="mb-2">Get 20% discount</p>
            <button
              onClick={() => handleViewCoupon('DISCOUNT20')}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
            >
              View Coupon
            </button>
          </div>
          <div className="p-4 bg-gray-100 bg-opacity-75 rounded">
            <h3 className="text-xl font-semibold">Order above ₹1999</h3>
            <p className="mb-2">Get 25% discount</p>
            <button
              onClick={() => handleViewCoupon('DISCOUNT25')}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
            >
              View Coupon
            </button>
          </div>
          <div className="p-4 bg-gray-100 bg-opacity-75 rounded">
            <h3 className="text-xl font-semibold">Order above ₹2999</h3>
            <p className="mb-2">Get 27% discount</p>
            <button
              onClick={() => handleViewCoupon('DISCOUNT27')}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
            >
              View Coupon
            </button>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Offers;