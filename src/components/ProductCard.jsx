import React from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiShoppingBag, HiEye } from 'react-icons/hi';
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
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-2xl transition-all duration-500"
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
        
        {/* Product Name - 1 line with ellipsis */}
        <h3 className="text-sm sm:text-base font-bold mt-0.5 sm:mt-1 mb-0.5 sm:mb-1 text-gray-900 group-hover:text-gray-600 transition-colors truncate">
          {product.name}
        </h3>
        
        {/* Price & Buttons */}
        <div className="flex items-center justify-between mt-2 sm:mt-4">
          {/* Price - responsive */}
          <span className="text-sm sm:text-xl font-black text-gray-900">Rs. {product.price.toLocaleString()}</span>
          
          {/* Buttons */}
          <div className="flex gap-1 sm:gap-2">
            {/* View Button */}
            <button 
              onClick={() => openModal(product)} 
              className="p-2 sm:p-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
              title="View Details"
            >
              <HiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            
            {/* Order Button */}
            <button 
              onClick={() => orderViaWhatsApp(product)} 
              className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 bg-gray-900 text-white text-[11px] sm:text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg"
            >
              <HiShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
              <span className="hidden sm:inline">Order</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;