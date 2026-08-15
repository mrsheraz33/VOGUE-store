import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiShoppingBag, HiEye } from 'react-icons/hi';
import { useStore } from '../context/StoreContext';
import ImageSlider from './ImageSlider';

const API_URL = 'https://vogue-backend-ibwc.onrender.com';

const FeaturedProducts = () => {
  const { openModal, orderViaWhatsApp } = useStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      const productsArray = Array.isArray(data) ? data : [];
      // Pehle 4 products lo (ya featured products)
      setProducts(productsArray.slice(0, 4));
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">Handpicked For You</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4 text-gray-900">
            Best <span className="text-gray-400">Sellers</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Our most popular products loved by customers</p>
          <div className="w-20 h-1.5 bg-gray-900 mx-auto mt-6 rounded-full" />
        </div>

        {/* Products Grid - Bade Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => openModal(product)}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 cursor-pointer relative"
            >
              {/* Best Seller Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                  <HiStar className="w-3.5 h-3.5 text-yellow-400" />
                  BEST SELLER
                </span>
              </div>

              {/* Product Image */}
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <ImageSlider images={product.images} productName={product.name} />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-black mt-1 mb-2 text-gray-900 group-hover:text-gray-600 transition-colors truncate">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4) ? 'text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">({product.rating || '4.5'})</span>
                </div>

                {/* Price & Buttons */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-gray-900">Rs. {product.price?.toLocaleString()}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openModal(product); }}
                      className="p-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
                    >
                      <HiEye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); orderViaWhatsApp(product); }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg"
                    >
                      <HiShoppingBag className="w-4 h-4" /> Order
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;