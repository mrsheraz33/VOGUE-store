import React from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiShoppingBag } from 'react-icons/hi';
import { useStore } from '../context/StoreContext';
import ImageSlider from './ImageSlider';

const ProductCard = ({ product, index }) => {
  const { openModal, orderViaWhatsApp } = useStore();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => openModal(product)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      <ImageSlider images={product.images} productName={product.name} />
      
      {/* Content - responsive padding */}
      <div className="p-3 sm:p-5">
        {/* Stars - smaller on mobile */}
        <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <HiStar 
                key={i} 
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < Math.floor(product.rating || 4) ? 'text-yellow-400' : 'text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-400 font-medium">({product.rating || '4.5'})</span>
        </div>
        
        {/* Category */}
        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
        
        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-bold mt-0.5 sm:mt-1 mb-0.5 sm:mb-1 text-gray-900 group-hover:text-gray-600 transition-colors truncate">
          {product.name}
        </h3>
        
        {/* Sizes - Left side */}
        <div className="flex items-center gap-1 mt-2 sm:mt-2 mb-1">
          <div className="flex items-center gap-1">
            {product.sizes?.slice(0, 3).map((size, i) => (
              <span 
                key={i} 
                className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium bg-gray-100 text-gray-600 rounded-md"
              >
                {size}
              </span>
            ))}
            {product.sizes?.length > 3 && (
              <span className="text-[9px] sm:text-[10px] font-medium text-gray-400">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Price & Order Button */}
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          {/* Price */}
          <span className="text-sm sm:text-xl font-black text-gray-900">Rs. {product.price.toLocaleString()}</span>
          
          {/* Order Button - stop propagation so modal doesn't open */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Yeh line important hai!
              orderViaWhatsApp(product);
            }}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gray-900 text-white text-xs sm:text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg active:scale-95"
          >
            <HiShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
            <span className="hidden sm:inline">Order Now</span>
            <span className="sm:hidden">Buy</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;