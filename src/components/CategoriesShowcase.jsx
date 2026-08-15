import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiTag } from 'react-icons/hi';

const CategoriesShowcase = () => {
  const categories = [
    {
      name: 'Sneakers',
      desc: 'Street-style kicks for daily wear',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
      color: 'from-gray-900/90 to-gray-700/50',
      tag: 'Trending'
    },
    {
      name: 'Casual Shoes',
      desc: 'Laid-back style, maximum comfort',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=600&fit=crop',
      color: 'from-blue-900/90 to-blue-700/50',
      tag: 'Comfort'
    },
    {
      name: 'Sports Shoes',
      desc: 'Performance-driven athletic footwear',
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=600&fit=crop',
      color: 'from-emerald-900/90 to-emerald-700/50',
      tag: 'Performance'
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">Browse</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4 text-gray-900">
            Shop by <span className="text-gray-400">Category</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Find the perfect pair for every occasion</p>
          <div className="w-20 h-1.5 bg-gray-900 mx-auto mt-6 rounded-full" />
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer shadow-xl"
              onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {/* Background Image */}
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color}`} />
              
              {/* Tag Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <HiTag className="w-3.5 h-3.5" />
                  {category.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-2">{category.name}</h3>
                <p className="text-white/80 text-sm mb-6">{category.desc}</p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-bold hover:bg-gray-100 transition-all shadow-lg group-hover:gap-3">
                  Explore <HiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;