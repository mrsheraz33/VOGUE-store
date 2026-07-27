import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiMenu, HiX, HiShoppingBag, HiStar, HiTruck, HiShieldCheck, 
  HiBadgeCheck, HiUserGroup, HiArrowRight, HiEye, HiSearch,
  HiLocationMarker, HiMail, HiRefresh, HiFilter, HiHeart,
  HiChevronRight, HiCheck, HiPhone, HiClock
} from 'react-icons/hi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaTruck, FaShieldAlt, FaHeadset, FaQuoteLeft, FaStar } from 'react-icons/fa';

// ============================================
// CONTEXT
// ============================================
const StoreContext = createContext();
const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const orderViaWhatsApp = (product) => {
    const msg = `Hi, I want to order:%0A%0AProduct: ${product.name}%0ACategory: ${product.category}%0APrice: Rs. ${product.price.toLocaleString()}%0AColor: ${product.color}%0A%0APlease confirm availability.`;
    window.open(`https://wa.me/923249620969?text=${msg}`, '_blank');
  };

  return (
    <StoreContext.Provider value={{ selectedProduct, isModalOpen, openModal, closeModal, orderViaWhatsApp, addToCart, cart }}>
      {children}
    </StoreContext.Provider>
  );
};

// ============================================
// DATA
// ============================================
const shoeImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1597248881519-db089d3744a5?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1520219306100-ec69b125706c?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=600&fit=crop',
];

const generateProducts = () => {
  const categories = ['Sneakers', 'Casual', 'Sports'];
  const names = {
    Sneakers: ['Urban Shadow X1', 'Street Flex Pro', 'Ace Runner 3000', 'Nova Air Max', 'Phantom Drift', 'Elite Pulse', 'Vertex Glide', 'Shadow Bolt', 'Rush Wave', 'Flux Zenith', 'Apex Echo', 'Drift Prime', 'Urban Legend', 'Street King', 'Flex Master'],
    Casual: ['Classic Loafer', 'Canvas Slip-On', 'Modern Derby', 'Chelsea Boot', 'Oxford Prime', 'Moccasin Lux', 'Boat Shoe Elite', 'Espadrille Pro'],
    Sports: ['Marathon Pro', 'Trail Blazer', 'Gym Master', 'CrossFit X', 'Speed Runner', 'Agility Pro', 'Performance Elite', 'Athletic Prime'],
  };
  const colors = ['Black/Red', 'White/Black', 'Grey/Red', 'All Black', 'Navy/Red', 'Olive/Black', 'Burgundy', 'Charcoal', 'Tan/Black', 'Slate'];

  const products = [];
  for (let i = 1; i <= 60; i++) {
    const cat = categories[Math.floor(Math.random() * 3)];
    const nameList = names[cat];
    const name = nameList[Math.floor(Math.random() * nameList.length)];
    const price = Math.floor(Math.random() * 3500) + 2500;
    products.push({
      id: i,
      name,
      category: cat,
      price,
      color: colors[Math.floor(Math.random() * colors.length)],
      image: shoeImages[Math.floor(Math.random() * shoeImages.length)],
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      isNew: i > 45,
      isPopular: i <= 15,
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      desc: 'Premium quality footwear designed for comfort and style. Durable construction with modern aesthetics perfect for everyday wear.',
    });
  }
  return products;
};

const allProducts = generateProducts();

const reviews = [
  { id: 1, name: 'Ahmed R.', location: 'Lahore', rating: 5, comment: 'Same as picture, great quality! I was surprised by how good these look in person.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { id: 2, name: 'Fatima S.', location: 'Karachi', rating: 5, comment: 'Fast delivery and amazing shoes. Ordered Monday, received by Wednesday!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { id: 3, name: 'Usman K.', location: 'Islamabad', rating: 5, comment: 'Highly recommended! The red and black combo is fire. Got so many compliments.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
  { id: 4, name: 'Ayesha M.', location: 'Rawalpindi', rating: 4, comment: 'Really comfortable for daily use. Great value for money!', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop' },
  { id: 5, name: 'Bilal H.', location: 'Faisalabad', rating: 5, comment: 'Best sneakers I\'ve bought online in Pakistan. COD made it so easy.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop' },
  { id: 6, name: 'Zainab T.', location: 'Multan', rating: 5, comment: 'Quality is top-notch! My whole friend group now shops from VOGUE.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop' },
  { id: 7, name: 'Hamza A.', location: 'Peshawar', rating: 4, comment: 'Superb finishing and premium packaging. Felt like unboxing a luxury brand.', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop' },
  { id: 8, name: 'Sana R.', location: 'Quetta', rating: 5, comment: 'I\'ve ordered 3 pairs so far. VOGUE never disappoints!', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop' },
];

// ============================================
// COMPONENTS
// ============================================

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = ['Home', 'Shop', 'Categories', 'Reviews'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="VOGUE" className="h-30 w-auto object-contain" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
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
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2 text-lg font-semibold">
                  {link}
                </a>
              ))}
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
// Hero
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    <img src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&h=1080&fit=crop" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

    <div className="relative z-10 max-w-6xl mx-auto px-5 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full mb-8 backdrop-blur-sm">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-sm font-bold text-white tracking-widest uppercase">New Collection 2025</span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-8 text-white">
        Step Into <span className="text-white/90">Style</span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12">
        Trendy & affordable sneakers in Pakistan. Free delivery nationwide with Cash on Delivery.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#shop" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all text-lg shadow-2xl">
          <HiShoppingBag className="w-5 h-5" /> Shop Now <HiArrowRight className="w-5 h-5" />
        </a>
        <a href="#categories" className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:border-white/60 hover:bg-white/10 transition-all text-lg backdrop-blur-sm">
          Explore Categories
        </a>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex justify-center gap-8 sm:gap-16 mt-20 pt-8 border-t border-white/10">
        {[{ v: '1000+', l: 'Happy Customers' }, { v: '60+', l: 'Products' }, { v: '4.9', l: 'Rating' }, { v: 'FREE', l: 'Delivery' }].map(s => (
          <div key={s.l} className="text-center">
            <div className="text-3xl sm:text-4xl font-black text-white">{s.v}</div>
            <div className="text-xs sm:text-sm text-white/50 mt-1">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Banner
const Banner = () => (
  <div className="bg-gray-900 text-white py-3.5 px-4 text-center font-bold text-sm sm:text-base tracking-wide">
    <span className="inline-flex items-center gap-2">
      <HiTruck className="w-5 h-5" /> FREE DELIVERY ALL OVER PAKISTAN — NO MINIMUM ORDER!
    </span>
  </div>
);

// Product Card
const ProductCard = ({ product, index }) => {
  const { openModal, orderViaWhatsApp } = useStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && <span className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full shadow-lg">NEW</span>}
          {product.isPopular && !product.isNew && <span className="px-3 py-1.5 bg-gray-700 text-white text-xs font-bold rounded-full shadow-lg">POPULAR</span>}
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button onClick={() => openModal(product)} className="p-3.5 bg-white rounded-full text-gray-900 hover:bg-gray-100 shadow-xl transition-all">
            <HiEye className="w-5 h-5" />
          </button>
          <button onClick={() => orderViaWhatsApp(product)} className="p-3.5 bg-gray-900 rounded-full text-white hover:bg-gray-800 shadow-xl transition-all">
            <HiShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">({product.rating})</span>
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
        <h3 className="text-base font-bold mt-1 mb-1 text-gray-900 group-hover:text-gray-600 transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-black text-gray-900">Rs. {product.price.toLocaleString()}</span>
          <button onClick={() => orderViaWhatsApp(product)} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg">
            <HiShoppingBag className="w-4 h-4" /> Order
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Section Header
const SectionHeader = ({ label, title, subtitle, highlight }) => (
  <div className="text-center mb-14 lg:mb-20">
    <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">{label}</span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4 text-gray-900">{title} <span className="text-gray-400">{highlight}</span></h2>
    <p className="text-gray-500 max-w-xl mx-auto text-lg">{subtitle}</p>
    <div className="w-20 h-1.5 bg-gray-900 mx-auto mt-6 rounded-full" />
  </div>
);

// Product Modal
const ProductModal = () => {
  const { selectedProduct, isModalOpen, closeModal, orderViaWhatsApp } = useStore();
  if (!selectedProduct) return null;
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-10 p-2.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all">
              <HiX className="w-5 h-5" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="aspect-square bg-gray-50">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
              </div>
              <div className="p-6 lg:p-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{selectedProduct.category}</span>
                <h2 className="text-2xl lg:text-3xl font-black mt-1 mb-3 text-gray-900">{selectedProduct.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => <HiStar key={i} className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-200'}`} />)}
                  <span className="text-sm text-gray-500 font-medium">({selectedProduct.rating} out of 5)</span>
                </div>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{selectedProduct.desc}</p>
                <p className="text-4xl font-black text-gray-900 mb-5">Rs. {selectedProduct.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mb-2">Color: <span className="text-gray-900 font-bold">{selectedProduct.color}</span></p>
                <p className="text-sm text-gray-500 mb-3">Available Sizes:</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProduct.sizes.map(s => <button key={s} className="px-4 py-2 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all">{s}</button>)}
                </div>
                <div className="flex gap-4 mb-6 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5"><HiTruck className="text-green-500 w-4 h-4" /> Free Delivery</span>
                  <span className="flex items-center gap-1.5"><HiShieldCheck className="text-blue-500 w-4 h-4" /> COD Available</span>
                  <span className="flex items-center gap-1.5"><HiClock className="text-orange-500 w-4 h-4" /> 2-3 Days</span>
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

// WhatsApp Float
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

// Footer
const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        <div className="lg:col-span-2">
          <a href="#" className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="VOGUE" className="h-12 w-auto object-contain brightness-0 invert" />
            <span className="text-2xl font-black">VOGUE<span className="text-gray-500">.</span></span>
          </a>
          <p className="text-gray-400 mb-8 max-w-sm text-lg leading-relaxed">Premium sneakers for the modern Pakistani. Trendy designs, affordable prices, free delivery nationwide.</p>
          <div className="space-y-4 text-gray-400">
            <a href="https://wa.me/923249620969" className="flex items-center gap-3 hover:text-white transition-colors text-sm">
              <FaWhatsapp className="text-green-400 w-5 h-5" /> +92 324 9620969
            </a>
            <div className="flex items-center gap-3 text-sm">
              <HiMail className="w-5 h-5 text-gray-500" /> support@vogue.pk
            </div>
            <div className="flex items-center gap-3 text-sm">
              <HiLocationMarker className="w-5 h-5 text-gray-500" /> Karachi, Pakistan
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            {[{ i: FaFacebook, c: 'hover:text-blue-400' }, { i: FaInstagram, c: 'hover:text-pink-400' }, { i: FaTiktok, c: 'hover:text-white' }].map(s => (
              <a key={s.c} href="#" className={`p-3 bg-white/5 rounded-xl text-gray-400 ${s.c} transition-colors hover:bg-white/10`}>
                <s.i className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-6 text-lg">Shop</h3>
          <div className="space-y-3 text-gray-400 text-sm">
            <a href="#shop" className="block hover:text-white transition-colors">Sneakers</a>
            <a href="#shop" className="block hover:text-white transition-colors">Casual Shoes</a>
            <a href="#shop" className="block hover:text-white transition-colors">Sports Shoes</a>
            <a href="#shop" className="block hover:text-white transition-colors">New Arrivals</a>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-6 text-lg">Support</h3>
          <div className="space-y-3 text-gray-400 text-sm">
            <a href="#" className="block hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="block hover:text-white transition-colors">FAQs</a>
            <a href="#" className="block hover:text-white transition-colors">Shipping Info</a>
            <a href="#" className="block hover:text-white transition-colors">Returns</a>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
      <div className="flex items-center justify-center gap-2 mb-2">
        <img src="/logo.png" alt="VOGUE" className="h-6 w-auto object-contain brightness-0 invert opacity-50" />
      </div>
      © 2025 VOGUE. All rights reserved.
    </div>
  </footer>
);

// Trust Badges Bar
const TrustBar = () => (
  <div className="bg-white border-y border-gray-100 py-8">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { i: FaTruck, t: 'Free Delivery', d: 'All over Pakistan' },
          { i: FaShieldAlt, t: 'Secure Payment', d: '100% safe checkout' },
          { i: HiBadgeCheck, t: 'Authentic Products', d: 'Genuine guaranteed' },
          { i: FaHeadset, t: '24/7 Support', d: 'Always here to help' },
        ].map((item, i) => (
          <motion.div key={item.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <item.i className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{item.t}</h4>
              <p className="text-xs text-gray-500">{item.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================
// MAIN APP
// ============================================
const App = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];
    if (activeFilter !== 'all') filtered = filtered.filter(p => p.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sortBy === 'popular') filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    else if (sortBy === 'new') filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [activeFilter, sortBy, search]);

  return (
    <StoreProvider>
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
          ::-webkit-scrollbar-thumb:hover { background: #333; }
          .glass { background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); }
        `}</style>

        <Navbar />
        <Hero />
        <Banner />
        <TrustBar />

        {/* SHOP SECTION */}
        <section id="shop" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeader label="Our Collection" title="Trending" highlight="Sneakers" subtitle="Most popular picks loved by customers across Pakistan" />

            {/* Filters */}
            <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-100 mb-10">
              <div className="relative mb-5">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search sneakers..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all" />
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-bold mr-2">Filter:</span>
                {['all', 'Sneakers', 'Casual', 'Sports'].map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeFilter === cat ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900'}`}>
                    {cat === 'all' ? 'All Products' : cat}
                  </button>
                ))}
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="ml-auto px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm font-semibold focus:outline-none focus:border-gray-900 cursor-pointer">
                  <option value="default">Sort by: Default</option>
                  <option value="popular">Most Popular</option>
                  <option value="new">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <HiSearch className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 text-lg font-medium">No products found. Try different filters.</p>
              </div>
            )}
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories" className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeader label="Categories" title="Shop by" highlight="Style" subtitle="Find the perfect pair for every occasion" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Sneakers', img: shoeImages[0], count: '48 Products', desc: 'Street-style kicks for daily wear' },
                { name: 'Casual Shoes', img: shoeImages[10], count: '32 Products', desc: 'Laid-back style, maximum comfort' },
                { name: 'Sports Shoes', img: shoeImages[12], count: '25 Products', desc: 'Performance-driven athletic footwear' },
              ].map((cat, i) => (
                <motion.div key={cat.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }} className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer shadow-xl">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                    <span className="text-white/60 text-sm font-medium">{cat.count}</span>
                    <h3 className="text-3xl lg:text-4xl font-black mt-2 mb-3 text-white">{cat.name}</h3>
                    <p className="text-white/80 text-sm mb-6">{cat.desc}</p>
                    <button onClick={() => { setActiveFilter(cat.name); document.getElementById('shop').scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-bold hover:bg-gray-100 transition-all shadow-lg">
                      Explore <HiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-us" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeader label="Why VOGUE?" title="We Deliver More Than" highlight="Just Shoes" subtitle="Experience the difference with our premium service" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { i: HiUserGroup, t: '1000+ Happy Customers', d: 'Trusted by Pakistanis nationwide', c: 'bg-gray-900' },
                { i: HiStar, t: '4.9/5 Rating', d: 'Top customer satisfaction', c: 'bg-gray-700' },
                { i: HiBadgeCheck, t: 'Premium Quality', d: 'Durable materials & craftsmanship', c: 'bg-gray-800' },
                { i: HiTruck, t: 'Free Delivery', d: 'All over Pakistan, no minimum', c: 'bg-gray-600' },
              ].map((f, i) => (
                <motion.div key={f.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all text-center">
                  <div className={`w-14 h-14 ${f.c} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                    <f.i className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-black text-lg mb-2 text-gray-900">{f.t}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeader label="Testimonials" title="What Our" highlight="Customers Say" subtitle="Real feedback from real people across Pakistan" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all">
                  <FaQuoteLeft className="text-gray-200 mb-4 w-8 h-8" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <HiStar key={i} className={`w-4 h-4 ${i < r.rating ? 'text-yellow-400' : 'text-gray-200'}`} />)}
                  </div>
                  <p className="text-gray-600 text-sm italic mb-6 leading-relaxed">"{r.comment}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100" loading="lazy" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{r.name}</h4>
                      <span className="text-xs text-gray-400 font-medium">{r.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&h=1080&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">Ready to Step Up?</h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">Join thousands of happy customers. Free delivery, cash on delivery, premium quality guaranteed.</p>
              <a href="#shop" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all text-lg shadow-2xl">
                <HiShoppingBag className="w-6 h-6" /> Start Shopping <HiArrowRight className="w-6 h-6" />
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
        <WhatsAppFloat />
        <ProductModal />
      </div>
    </StoreProvider>
  );
};

export default App;