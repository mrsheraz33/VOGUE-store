import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HiSearch, HiArrowRight } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingPolicy from './pages/ShippingPolicy';

const API_URL = 'https://vogue-backend-ibwc.onrender.com';

// Section Header
const SectionHeader = ({ label, title, subtitle, highlight }) => (
  <div className="text-center mb-14 lg:mb-20">
    <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">{label}</span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4 text-gray-900">{title} <span className="text-gray-400">{highlight}</span></h2>
    <p className="text-gray-500 max-w-xl mx-auto text-lg">{subtitle}</p>
    <div className="w-20 h-1.5 bg-gray-900 mx-auto mt-6 rounded-full" />
  </div>
);

// WhatsApp Float
const WhatsAppFloat = () => (
  <motion.a
    href="https://wa.me/923000381569?text=Hi,%20I%20want%20to%20order"
    target="_blank" rel="noopener noreferrer"
    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }}
    whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
    style={{ animation: 'whatsappPulse 2s infinite' }}
  >
    <FaWhatsapp className="w-8 h-8 text-white" />
  </motion.a>
);

// Main Website
const MainWebsite = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, products]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <style>{`
        @keyframes whatsappPulse {
          0%,100%{box-shadow:0 6px 24px rgba(37,211,102,0.4)}
          50%{box-shadow:0 6px 40px rgba(37,211,102,0.7),0 0 0 20px rgba(37,211,102,0)}
        }
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:8px}
        ::-webkit-scrollbar-track{background:#f1f1f1}
        ::-webkit-scrollbar-thumb{background:#111;border-radius:10px}
      `}</style>
      <Navbar />
      <HeroSlider />
      <section id="shop" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader label="Our Collection" title="Trending" highlight="Sneakers" subtitle="Find your perfect pair" />
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search by product name..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all" />
            </div>
          </div>
          {loading ? (
            <div className="text-center py-20"><div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-400">Loading...</p></div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
            </div>
          )}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20"><HiSearch className="w-16 h-16 text-gray-200 mx-auto mb-4" /><p className="text-gray-400 text-lg">No products found.</p></div>
          )}
        </div>
      </section>
      <WhyChooseUs />
      <Footer />
      <WhatsAppFloat />
      <ProductModal />
    </div>
  );
};

// App
const App = () => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={adminToken ? <AdminDashboard onLogout={() => { setAdminToken(null); localStorage.removeItem('adminToken'); }} /> : <AdminLogin onLogin={(token) => { setAdminToken(token); localStorage.setItem('adminToken', token); }} />} />
          <Route path="/*" element={<MainWebsite />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;