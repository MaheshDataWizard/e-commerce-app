import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('You are now subscribed!');
    setEmail('');
  };

  return (
    <div className="relative bg-gray-100 py-16 px-4 sm:px-8 text-center overflow-hidden rounded-lg">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-100 via-white to-blue-100 opacity-30 -z-10"></div>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
        Join Our Fashion Club
      </h2>
      <p className="text-gray-600 mb-8 text-sm sm:text-base">
        Subscribe now to get 20% off on your first purchase and updates on new arrivals.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full sm:flex-1 border-b-2 border-gray-400 focus:border-black outline-none py-3 px-4 text-gray-800 placeholder-gray-500 transition-all"
        />
        <button
          type="submit"
          className="bg-black text-white px-8 py-3 sm:py-4 font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors"
        >
          Subscribe
        </button>
      </form>

      <p className="text-gray-500 text-xs mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsLetterBox;
