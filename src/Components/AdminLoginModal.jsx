import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Dummy API response for testing
    const dummyAdmin = { username: 'admin', password: 'admin123' };

    if (username === dummyAdmin.username && password === dummyAdmin.password) {
      setError('');
      onLoginSuccess(); // Notify parent component of successful login
      onClose(); // Close the modal
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Admin Login"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </Modal>
  );
};

export default AdminLoginModal;