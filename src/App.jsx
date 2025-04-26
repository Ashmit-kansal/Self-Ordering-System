import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Menu from './Components/Menu';
import Contact from './Components/Contact';
import Cart from './Components/Cart';
import AdminLoginModal from './Components/AdminLoginModal';
import './index.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Admin login state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true); // Modal state

  return (
    <Router>
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
      />
      <Header isAdminLoggedIn={isAdminLoggedIn} />
      <Routes>
        {isAdminLoggedIn && (
          <>
            <Route
              path="/"
              element={<Home cart={cart} setCart={setCart} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} />}
            />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;