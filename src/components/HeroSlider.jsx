import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiShoppingBag, HiArrowRight } from 'react-icons/hi';

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

export default HeroSlider;