import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiMenu, HiX, HiShoppingBag, HiStar, HiTruck, HiShieldCheck, 
  HiBadgeCheck, HiUserGroup, HiArrowRight, HiEye, HiSearch,
  HiLocationMarker, HiMail, HiRefresh, HiFilter
} from 'react-icons/hi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaTruck, FaShieldAlt, FaHeadset, FaQuoteLeft } from 'react-icons/fa';

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

// Navbar
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Shop', 'Categories', 'Reviews'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full" />
            <span className="text-2xl lg:text-3xl font-black text-white tracking-tight">VOGUE<span className="text-red-600">.</span></span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{link}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#shop" className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-all">
              <HiShoppingBag className="w-4 h-4" /> Shop Now
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white">
              {mobileOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-black/98 border-t border-white/10">
            <div className="px-5 py-4 flex flex-col gap-3">
              {links.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-white py-2 text-lg font-medium">{link}</a>
              ))}
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
    <img src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&h=1080&fit=crop" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-25" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
    <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/10" />

    <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-6">
        <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
        <span className="text-sm font-semibold text-red-500 tracking-widest uppercase">New Collection 2026</span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
        Step Into <span className="text-red-600">Style</span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto mb-10">
        Trendy & affordable sneakers in Pakistan. Free delivery nationwide with Cash on Delivery.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#shop" className="flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all text-lg">
          <HiShoppingBag className="w-5 h-5" /> Shop Now <HiArrowRight className="w-5 h-5" />
        </a>
        <a href="#categories" className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:border-white/50 transition-all text-lg">
          Explore Categories
        </a>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-white/10">
        {[{ v: '1000+', l: 'Happy Customers' }, { v: '60+', l: 'Products' }, { v: '4.9', l: 'Rating' }, { v: 'FREE', l: 'Delivery' }].map(s => (
          <div key={s.l} className="text-center"><div className="text-2xl sm:text-3xl font-black">{s.v}</div><div className="text-xs sm:text-sm text-gray-500">{s.l}</div></div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Banner
const Banner = () => (
  <div className="bg-red-600 text-white py-3 px-4 text-center font-semibold text-sm sm:text-base">
    🚚 FREE DELIVERY ALL OVER PAKISTAN — NO MINIMUM ORDER!
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
      className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-red-600/30 transition-all duration-500"
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">NEW</span>}
          {product.isPopular && !product.isNew && <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">POPULAR</span>}
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button onClick={() => openModal(product)} className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30"><HiEye className="w-5 h-5" /></button>
          <button onClick={() => orderViaWhatsApp(product)} className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700"><HiShoppingBag className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <HiStar className="w-4 h-4 text-yellow-500" /><span className="text-sm text-gray-400">{product.rating}</span>
        </div>
        <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">{product.category}</span>
        <h3 className="text-base font-bold mt-1 mb-1 group-hover:text-red-500 transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-red-400">Rs. {product.price.toLocaleString()}</span>
          <button onClick={() => orderViaWhatsApp(product)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-all">
            <HiShoppingBag className="w-4 h-4" /> Order
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Section Header
const SectionHeader = ({ label, title, subtitle, highlight }) => (
  <div className="text-center mb-12 lg:mb-16">
    <span className="text-red-500 font-semibold tracking-widest uppercase text-sm">{label}</span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-4">{title} <span className="text-red-600">{highlight}</span></h2>
    <p className="text-gray-400 max-w-xl mx-auto">{subtitle}</p>
    <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
  </div>
);

// Product Modal
const ProductModal = () => {
  const { selectedProduct, isModalOpen, closeModal, orderViaWhatsApp } = useStore();
  if (!selectedProduct) return null;
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-[#111] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-red-600"><HiX className="w-5 h-5" /></button>
            <div className="grid md:grid-cols-2">
              <div className="aspect-square"><img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" /></div>
              <div className="p-6 lg:p-8">
                <span className="text-xs font-semibold text-red-500 uppercase">{selectedProduct.category}</span>
                <h2 className="text-xl lg:text-2xl font-bold mt-1 mb-2">{selectedProduct.name}</h2>
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => <HiStar key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-500' : 'text-gray-600'}`} />)}
                  <span className="text-sm text-gray-400">({selectedProduct.rating})</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{selectedProduct.desc}</p>
                <p className="text-3xl font-black text-red-400 mb-4">Rs. {selectedProduct.price.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mb-2">Color: <span className="text-white font-semibold">{selectedProduct.color}</span></p>
                <p className="text-sm text-gray-400 mb-2">Available Sizes:</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProduct.sizes.map(s => <button key={s} className="px-4 py-2 border border-white/20 rounded-full text-sm hover:border-red-500 hover:bg-red-500/10 transition-all">{s}</button>)}
                </div>
                <div className="flex gap-4 mb-6 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><HiTruck className="text-green-500" /> Free Delivery</span>
                  <span className="flex items-center gap-1"><HiShieldCheck className="text-blue-500" /> COD Available</span>
                </div>
                <button onClick={() => { orderViaWhatsApp(selectedProduct); closeModal(); }} className="w-full flex items-center justify-center gap-3 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all text-lg">
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
    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-whatsapp-pulse"
    style={{ animation: 'whatsappPulse 2s infinite' }}
  >
    <FaWhatsapp className="w-8 h-8 text-white" />
  </motion.a>
);

// Footer
const Footer = () => (
  <footer className="bg-[#111] border-t border-white/5">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <a href="#" className="flex items-center gap-2 mb-4"><div className="w-3 h-3 bg-red-600 rounded-full" /><span className="text-2xl font-black">VOGUE<span className="text-red-600">.</span></span></a>
          <p className="text-gray-400 mb-6 max-w-sm">Premium sneakers for the modern Pakistani. Trendy designs, affordable prices, free delivery nationwide.</p>
          <div className="space-y-3 text-gray-400">
            <a href="https://wa.me/923249620969" className="flex items-center gap-3 hover:text-red-500"><FaWhatsapp className="text-green-500" /> +92 324 9620969</a>
            <div className="flex items-center gap-3"><HiMail /> support@vogue.pk</div>
            <div className="flex items-center gap-3"><HiLocationMarker /> Karachi, Pakistan</div>
          </div>
          <div className="flex gap-3 mt-6">
            {[{ i: FaFacebook, c: 'hover:text-blue-500' }, { i: FaInstagram, c: 'hover:text-pink-500' }, { i: FaTiktok, c: 'hover:text-white' }].map(s => (
              <a key={s.c} href="#" className={`p-3 bg-white/5 rounded-xl text-gray-400 ${s.c} transition-colors`}><s.i className="w-5 h-5" /></a>
            ))}
          </div>
        </div>
        <div><h3 className="font-bold mb-4">Shop</h3><div className="space-y-3 text-gray-400 text-sm"><p>Sneakers</p><p>Casual Shoes</p><p>Sports Shoes</p><p>New Arrivals</p></div></div>
        <div><h3 className="font-bold mb-4">Support</h3><div className="space-y-3 text-gray-400 text-sm"><p>Contact Us</p><p>FAQs</p><p>Shipping Info</p><p>Returns</p></div></div>
      </div>
    </div>
    <div className="border-t border-white/5 py-6 text-center text-gray-500 text-sm">© 2026 VOGUE. All rights reserved.</div>
  </footer>
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
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
        <style>{`
          @keyframes whatsappPulse {
            0%, 100% { box-shadow: 0 6px 24px rgba(37,211,102,0.4); }
            50% { box-shadow: 0 6px 40px rgba(37,211,102,0.7), 0 0 0 20px rgba(37,211,102,0); }
          }
          .animate-whatsapp-pulse { animation: whatsappPulse 2s infinite; }
          .gradient-text { background: linear-gradient(135deg, #ef4444, #dc2626); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #0a0a0a; }
          ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
        `}</style>

        <Navbar />
        <Hero />
        <Banner />

        {/* SHOP SECTION */}
        <section id="shop" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeader label="Our Collection" title="Trending" highlight="Sneakers" subtitle="Most popular picks loved by customers across Pakistan" />

            {/* Filters */}
            <div className="bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 border border-white/5 mb-8">
              <div className="relative mb-4">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="text" placeholder="Search sneakers..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-[#111] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" />
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wider mr-2">Filter:</span>
                {['all', 'Sneakers', 'Casual', 'Sports'].map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === cat ? 'bg-red-600 text-white' : 'bg-[#111] text-gray-400 border border-white/10 hover:text-white'}`}>
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="ml-auto px-4 py-2 bg-[#111] border border-white/10 rounded-xl text-white text-sm">
                  <option value="default">Default</option><option value="popular">Popular</option><option value="new">New</option><option value="price-low">Price: Low-High</option><option value="price-high">Price: High-Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            {filteredProducts.length === 0 && <p className="text-center text-gray-500 py-16">No products found. Try different filters.</p>}
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories" className="py-16 lg:py-24 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeader label="Categories" title="Shop by" highlight="Style" subtitle="Find the perfect pair for every occasion" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Sneakers', img: shoeImages[0], count: '48 Products', desc: 'Street-style kicks for daily wear' },
                { name: 'Casual Shoes', img: shoeImages[10], count: '32 Products', desc: 'Laid-back style, maximum comfort' },
                { name: 'Sports Shoes', img: shoeImages[12], count: '25 Products', desc: 'Performance-driven athletic footwear' },
              ].map((cat, i) => (
                <motion.div key={cat.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }} className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <span className="text-white/70 text-sm">{cat.count}</span>
                    <h3 className="text-2xl lg:text-3xl font-black mt-1 mb-2">{cat.name}</h3>
                    <p className="text-white/80 text-sm mb-4">{cat.desc}</p>
                    <button onClick={() => { setActiveFilter(cat.name); document.getElementById('shop').scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold hover:bg-white/30">
                      Explore <HiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-us" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeader label="Why VOGUE?" title="We Deliver More Than" highlight="Just Shoes" subtitle="Experience the difference with our premium service" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { i: HiUserGroup, t: '1000+ Happy Customers', d: 'Trusted by Pakistanis nationwide', c: 'bg-blue-500' },
                { i: HiStar, t: '4.9/5 Rating', d: 'Top customer satisfaction', c: 'bg-yellow-500' },
                { i: HiBadgeCheck, t: 'Premium Quality', d: 'Durable materials & craftsmanship', c: 'bg-red-600' },
                { i: HiTruck, t: 'Free Delivery', d: 'All over Pakistan, no minimum', c: 'bg-green-500' },
              ].map((f, i) => (
                <motion.div key={f.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 text-center">
                  <div className={`w-12 h-12 ${f.c} rounded-xl flex items-center justify-center mx-auto mb-4`}><f.i className="w-6 h-6 text-white" /></div>
                  <h3 className="font-bold mb-2">{f.t}</h3>
                  <p className="text-gray-500 text-sm">{f.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="py-16 lg:py-24 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionHeader label="Testimonials" title="What Our" highlight="Customers Say" subtitle="Real feedback from real people" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {reviews.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                  <FaQuoteLeft className="text-red-600/30 mb-3" />
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_, i) => <HiStar key={i} className={`w-4 h-4 ${i < r.rating ? 'text-yellow-500' : 'text-gray-600'}`} />)}</div>
                  <p className="text-gray-300 text-sm italic mb-4">"{r.comment}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                    <div><h4 className="font-semibold text-sm">{r.name}</h4><span className="text-xs text-red-500">{r.location}</span></div>
                  </div>
                </motion.div>
              ))}
            </div>
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