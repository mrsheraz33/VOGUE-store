import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  HiMenu, HiX, HiShoppingBag, HiStar, HiTruck, HiBadgeCheck, 
  HiArrowRight, HiEye, HiSearch, HiLocationMarker, HiMail, 
  HiClock, HiCash, HiChevronLeft, HiChevronRight, HiPhotograph,
  HiUserCircle
} from 'react-icons/hi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaMoneyBillWave } from 'react-icons/fa';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

// ============================================
// CONTEXT
// ============================================
const StoreContext = createContext();
const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const orderViaWhatsApp = (product) => {
    const msg = `Hi, I want to order:%0A%0AProduct: ${product.name}%0ACategory: ${product.category}%0APrice: Rs. ${product.price.toLocaleString()}%0AColor: ${product.color}%0A%0APlease confirm availability.`;
    window.open(`https://wa.me/923249620969?text=${msg}`, '_blank');
  };

  return (
    <StoreContext.Provider value={{ selectedProduct, isModalOpen, openModal, closeModal, orderViaWhatsApp }}>
      {children}
    </StoreContext.Provider>
  );
};

// ============================================
// Image Slider Component
// ============================================
const ImageSlider = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        <HiPhotograph className="w-12 h-12 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative aspect-square overflow-hidden bg-gray-50">
      <img 
        src={images[currentIndex]} 
        alt={`${productName} - ${currentIndex + 1}`} 
        className="w-full h-full object-cover transition-transform duration-700" 
        loading="lazy" 
      />
      
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={prevSlide} className="p-2 bg-white/90 rounded-full text-gray-900 hover:bg-white shadow-lg transition-all">
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="p-2 bg-white/90 rounded-full text-gray-900 hover:bg-white shadow-lg transition-all">
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button 
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 rounded-full text-white text-xs flex items-center gap-1">
        <HiPhotograph className="w-3 h-3" />
        {images.length}
      </div>
    </div>
  );
};

// ============================================
// Navbar with Admin Button
// ============================================
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const links = ['Home', 'Shop', 'Why Us'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="VOGUE" className="h-14 w-auto object-contain" />
          </a>
          
          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Admin Button */}
            <button
              onClick={() => navigate('/admin')}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-200 transition-all"
              title="Admin Panel"
            >
              <HiUserCircle className="w-5 h-5" />
            </button>

            <a href="#shop" className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg">
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
                <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2 text-lg font-semibold">
                  {link}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); navigate('/admin'); }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full"
              >
                <HiUserCircle className="w-5 h-5" /> Admin Panel
              </button>
              <a href="#shop" className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-full">
                <HiShoppingBag className="w-4 h-4" /> Shop Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ============================================
// Hero Slider
// ============================================
const HeroSlider = () => {
  const heroImages = [
    'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1597248881519-db089d3744a5?w=1920&h=1080&fit=crop',
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
      {heroImages.map((img, i) => (
        <img 
          key={i}
          src={img} 
          alt={`Slide ${i + 1}`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`} 
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-white tracking-widest uppercase">New Collection 2025</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-6 text-white">
          Step Into <span className="text-white/90">Style</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Trendy & affordable sneakers in Pakistan. Cash on Delivery available nationwide.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <a href="#shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all text-lg shadow-2xl">
            <HiShoppingBag className="w-5 h-5" /> Shop Now <HiArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-white w-8' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
};

// ============================================
// Product Card with VIEW button
// ============================================
const ProductCard = ({ product, index }) => {
  const { openModal, orderViaWhatsApp } = useStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-2xl transition-all duration-500"
    >
      <ImageSlider images={product.images} productName={product.name} />
      <div className="p-5">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 4) ? 'text-yellow-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">({product.rating || '4.5'})</span>
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
        <h3 className="text-base font-bold mt-1 mb-1 text-gray-900 group-hover:text-gray-600 transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-black text-gray-900">Rs. {product.price.toLocaleString()}</span>
          <div className="flex gap-2">
            {/* VIEW BUTTON */}
            <button 
              onClick={() => openModal(product)} 
              className="p-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
              title="View Details"
            >
              <HiEye className="w-4 h-4" />
            </button>
            {/* ORDER BUTTON */}
            <button onClick={() => orderViaWhatsApp(product)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg">
              <HiShoppingBag className="w-4 h-4" /> Order
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// Section Header
// ============================================
const SectionHeader = ({ label, title, subtitle, highlight }) => (
  <div className="text-center mb-14 lg:mb-20">
    <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">{label}</span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4 text-gray-900">{title} <span className="text-gray-400">{highlight}</span></h2>
    <p className="text-gray-500 max-w-xl mx-auto text-lg">{subtitle}</p>
    <div className="w-20 h-1.5 bg-gray-900 mx-auto mt-6 rounded-full" />
  </div>
);

// ============================================
// Product Modal
// ============================================
const ProductModal = () => {
  const { selectedProduct, isModalOpen, closeModal, orderViaWhatsApp } = useStore();
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  useEffect(() => {
    if (selectedProduct) {
      setModalImageIndex(0);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const images = selectedProduct.images || [];

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-10 p-2.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all">
              <HiX className="w-5 h-5" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-gray-50">
                {images.length > 0 ? (
                  <>
                    <img src={images[modalImageIndex]} alt={selectedProduct.name} className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
                    {images.length > 1 && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-between px-2">
                          <button onClick={() => setModalImageIndex(prev => (prev - 1 + images.length) % images.length)} className="p-2 bg-white/90 rounded-full text-gray-900 hover:bg-white shadow-lg">
                            <HiChevronLeft className="w-5 h-5" />
                          </button>
                          <button onClick={() => setModalImageIndex(prev => (prev + 1) % images.length)} className="p-2 bg-white/90 rounded-full text-gray-900 hover:bg-white shadow-lg">
                            <HiChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((img, i) => (
                            <button key={i} onClick={() => setModalImageIndex(i)} className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === modalImageIndex ? 'border-gray-900' : 'border-white/50'}`}>
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <HiPhotograph className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-6 lg:p-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{selectedProduct.category}</span>
                <h2 className="text-2xl lg:text-3xl font-black mt-1 mb-3 text-gray-900">{selectedProduct.name}</h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{selectedProduct.description || selectedProduct.desc || 'Premium quality footwear.'}</p>
                <p className="text-4xl font-black text-gray-900 mb-5">Rs. {selectedProduct.price.toLocaleString()}</p>
                {selectedProduct.color && (
                  <p className="text-sm text-gray-500 mb-2">Color: <span className="text-gray-900 font-bold">{selectedProduct.color}</span></p>
                )}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <>
                    <p className="text-sm text-gray-500 mb-3">Available Sizes:</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProduct.sizes.map(s => <span key={s} className="px-4 py-2 border-2 border-gray-200 rounded-full text-sm font-semibold">{s}</span>)}
                    </div>
                  </>
                )}
                <div className="flex gap-4 mb-6 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5"><HiCash className="text-green-500 w-4 h-4" /> Cash on Delivery</span>
                  <span className="flex items-center gap-1.5"><HiClock className="text-orange-500 w-4 h-4" /> 2-3 Days Delivery</span>
                </div>
                <button onClick={() => { orderViaWhatsApp(selectedProduct); closeModal(); }} className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-all text-lg shadow-xl">
                  <HiShoppingBag className="w-5 h-5" /> Order via WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================
// WhatsApp Float
// ============================================
const WhatsAppFloat = () => (
  <motion.a
    href="https://wa.me/923249620969?text=Hi,%20I%20want%20to%20order"
    target="_blank" rel="noopener noreferrer"
    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }}
    whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
    style={{ animation: 'whatsappPulse 2s infinite' }}
  >
    <FaWhatsapp className="w-8 h-8 text-white" />
  </motion.a>
);

// ============================================
// Why Choose Us
// ============================================
const WhyChooseUs = () => (
  <section id="why-us" className="py-16 lg:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Why Choose VOGUE?</h2>
        <div className="w-20 h-1 bg-gray-900 mx-auto mt-4 rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaMoneyBillWave className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Cash on Delivery</h3>
          <p className="text-gray-500 text-sm">Pay when you receive your order</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <HiBadgeCheck className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Premium Quality</h3>
          <p className="text-gray-500 text-sm">Top quality materials used</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <HiTruck className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
          <p className="text-gray-500 text-sm">Delivery within 2-3 working days</p>
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// Footer
// ============================================
const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <a href="#" className="inline-flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="VOGUE" className="h-16 w-auto object-contain brightness-0 invert" />
            </a>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Premium sneakers for the modern Pakistani. Trendy designs, affordable prices, Cash on Delivery available.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-all">
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="#shop" className="text-gray-400 hover:text-white transition-colors text-sm">Shop</a></li>
              <li><a href="#why-us" className="text-gray-400 hover:text-white transition-colors text-sm">Why Choose Us</a></li>
              <li><a href="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">Admin</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/923249620969" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-all">
                    <FaWhatsapp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">WhatsApp</p>
                    <p className="font-medium">+92 324 9620969</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HiMail className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">support@vogue.pk</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HiLocationMarker className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-medium">Karachi, Pakistan</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© 2026 VOGUE. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Shipping Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================
// MAIN WEBSITE PAGE
// ============================================
const MainWebsite = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(q));
  }, [search, products]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <style>{`
        @keyframes whatsappPulse {
          0%, 100% { box-shadow: 0 6px 24px rgba(37,211,102,0.4); }
          50% { box-shadow: 0 6px 40px rgba(37,211,102,0.7), 0 0 0 20px rgba(37,211,102,0); }
        }
        .animate-whatsapp-pulse { animation: whatsappPulse 2s infinite; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #111; border-radius: 10px; }
      `}</style>

      <Navbar />
      <HeroSlider />

      <section id="shop" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader label="Our Collection" title="Trending" highlight="Sneakers" subtitle="Find your perfect pair from our collection" />

          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by product name..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all" 
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading products...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <HiSearch className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg font-medium">No products found. Try a different search.</p>
                </div>
              )}
            </>
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

// ============================================
// APP WITH ROUTING
// ============================================
const App = () => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const handleAdminLogin = (token) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <StoreProvider>
      <Router>
        <Routes>
          {/* Admin Route */}
          <Route 
            path="/admin" 
            element={
              adminToken ? 
                <AdminDashboard onLogout={handleAdminLogout} /> : 
                <AdminLogin onLogin={handleAdminLogin} />
            } 
          />
          
          {/* Main Website */}
          <Route path="/*" element={<MainWebsite />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;