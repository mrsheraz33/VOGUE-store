import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiShoppingBag, HiUserCircle } from 'react-icons/hi';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const links = ['Home', 'Shop', 'Why Us'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="lg:mx-0 mx-auto flex items-center gap-3">
            <img src="/logo.png" alt="VOGUE" className="h-45 w-auto object-contain" />
          </a>


          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <a key={link} href={link === 'Home' ? '/' : `/#${link.toLowerCase().replace(' ', '-')}`} className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin')}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-200 transition-all"
              title="Admin Panel"
            >
              <HiUserCircle className="w-5 h-5" />
            </button>

            <a href="/#shop" className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg">
              <HiShoppingBag className="w-4 h-4" /> Shop Now
            </a>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-gray-900">
              {mobileOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-5 py-4 flex flex-col gap-3">
              {links.map(link => (
                <a key={link} href={link === 'Home' ? '/' : `/#${link.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2 text-lg font-semibold">
                  {link}
                </a>
              ))}
              <button onClick={() => { setMobileOpen(false); navigate('/admin'); }} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full">
                <HiUserCircle className="w-5 h-5" /> Admin Panel
              </button>
              <a href="/#shop" className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-full">
                <HiShoppingBag className="w-4 h-4" /> Shop Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;