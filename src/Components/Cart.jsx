import React, { useState, useEffect } from 'react';
import Offers from './Offers';
import ReceiptModal from './ReceiptModal';

const Cart = ({ cart, setCart, appliedCoupon, setAppliedCoupon }) => {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [gst, setGst] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);

    let newDiscount = 0;
    if (appliedCoupon === 'DISCOUNT10' && newTotal > 599) {
      newDiscount = newTotal * 0.1;
    } else if (appliedCoupon === 'DISCOUNT20' && newTotal > 999) {
      newDiscount = newTotal * 0.2;
    }
    setDiscount(newDiscount);

    const gstRate = 0.18;
    const newGst = newTotal * gstRate;
    setGst(newGst);
  }, [cart, appliedCoupon]);

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

  const handleApplyCoupon = () => {
    if (coupon === 'DISCOUNT10' && total > 599) {
      setAppliedCoupon('DISCOUNT10');
      alert('Coupon applied! You saved 10%');
    } else if (coupon === 'DISCOUNT20' && total > 999) {
      setAppliedCoupon('DISCOUNT20');
      alert('Coupon applied! You saved 20%');
    } else {
      alert('Invalid coupon or order amount not sufficient');
    }
  };

  const handleConfirmOrder = async () => {
    const orderData = {
      items: cart.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price
      })),
      discountPrice: discount,
      totalPrice: total,
      paybillAmount: total - discount + gst,
      gstAmount: gst,
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

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Order response:', responseData);
      if (responseData.success) {
        setOrderDetails(orderData.items);
        setIsModalOpen(true);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
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
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="font-semibold">Total before GST: ₹{total.toFixed(2)}</p>
        <p className="font-semibold">Discount: ₹{discount.toFixed(2)}</p>
        <p className="font-semibold">GST: ₹{gst.toFixed(2)}</p>
        <p className="font-semibold">Total: ₹{(total - discount + gst).toFixed(2)}</p>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
        >
          Apply Coupon
        </button>
        <button
          onClick={handleConfirmOrder}
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition duration-300 ease-in-out"
        >
          Confirm Order
        </button>
      </div>
      <div className="mt-8">
        <Offers onApplyCoupon={(couponCode) => setCoupon(couponCode)} />
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

export default Cart;