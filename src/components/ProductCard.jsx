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
            <button onClick={() => openModal(product)} className="p-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all" title="View Details">
              <HiEye className="w-4 h-4" />
            </button>
            <button onClick={() => orderViaWhatsApp(product)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg">
              <HiShoppingBag className="w-4 h-4" /> Order
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;