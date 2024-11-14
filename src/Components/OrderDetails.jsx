import React, { useState, useEffect } from 'react';
import ReceiptModal from './ReceiptModal';

const OrderDetails = ({ cart, setCart, onConfirmOrder }) => {
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const handleApplyCoupon = () => {
    if (coupon === 'DISCOUNT10' && total > 599) {
      setDiscount(total * 0.1);
      alert(`Coupon applied! You saved ₹${(total * 0.1).toFixed(2)}`);
    } else if (coupon === 'DISCOUNT20' && total > 999) {
      setDiscount(total * 0.2);
      alert(`Coupon applied! You saved ₹${(total * 0.2).toFixed(2)}`);
    } else if (coupon === 'DISCOUNT25' && total > 1999) {
      setDiscount(total * 0.25);
      alert(`Coupon applied! You saved ₹${(total * 0.25).toFixed(2)}`);
    } else if (coupon === 'DISCOUNT27' && total > 2999) {
      setDiscount(total * 0.27);
      alert(`Coupon applied! You saved ₹${(total * 0.27).toFixed(2)}`);
    } else {
      alert('Invalid coupon or order amount not sufficient');
    }
  };

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

  const handleConfirmOrder = async () => {
    const orderData = {
      items: cart.map(item => ({
        productName: item.productName,
        quantity: item.quantity
      })),
      discountPrice: discount,
      totalPrice: total,
      paybillAmount: total - discount
    };

    console.log('Order Data:', JSON.stringify(orderData, null, 2));

    try {
      const response = await fetch('https://selffoodbackend.onrender.com/api/v1/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      console.log('Response data:', data);
      if (data.success) {
        // Include price in orderDetails for the modal
        const detailedOrderDetails = cart.map(item => ({
          productName: item.productName,
          quantity: item.quantity,
          price: item.price
        }));
        setOrderDetails(detailedOrderDetails);
        setIsModalOpen(true);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="p-4 w-full md:w-80">
      <h2 className="text-2xl font-bold mb-4">My Order</h2>
      <div className="p-4 bg-gray-100 rounded">
        {cart.length === 0 ? (
          <p className="text-gray-500">No item selected</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center pb-2 mb-2 border-b border-gray-300 last:border-b-0 last:mb-0"
            >
              <div>
                <p className="font-semibold">{item.productName}</p>
                <p>₹{item.price}</p>
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
        <p className="font-semibold mt-4">Discount: ₹{discount.toFixed(2)}</p>
        <p className="font-semibold">Total: ₹{(total - discount).toFixed(2)}</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full mb-2"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md
              hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out w-full"
          >
            Apply Coupon
          </button>
        </div>
        <button
          onClick={handleConfirmOrder}
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2 px-4 rounded-lg shadow-md
            hover:from-orange-500 hover:to-orange-700 transition duration-300 ease-in-out mt-4 w-full"
        >
          Confirm Order
        </button>
      </div>
      <ReceiptModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        orderDetails={orderDetails}
        discount={discount}
      />
    </div>
  );
};

export default OrderDetails;