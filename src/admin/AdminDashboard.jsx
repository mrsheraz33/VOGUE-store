import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiLogout, HiStar, HiShoppingBag } from 'react-icons/hi';
import ProductForm from './ProductForm';

const AdminDashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://vogue-backend-ibwc.onrender.com';

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

  useEffect(() => {
    fetchProducts();
  }, []);



  

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p._id === product._id ? product : p));
    } else {
      setProducts(prev => [product, ...prev]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

 const filteredProducts = products.filter(p => {
    const searchTerm = search.toLowerCase().trim();
    
    if (!searchTerm) return true;
    
    // Name search
    if (p.name.toLowerCase().includes(searchTerm)) return true;
    
    // Category search
    if (p.category.toLowerCase().includes(searchTerm)) return true;
    
    // Price exact search
    if (p.price?.toString().includes(searchTerm)) return true;
    
    // Price range: "3000-5000"
    if (searchTerm.includes('-')) {
      const [min, max] = searchTerm.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max) && p.price >= min && p.price <= max) return true;
    }
    
    // Under/Below: "under 3000" or "below 3000"
    if (searchTerm.startsWith('under ') || searchTerm.startsWith('below ')) {
      const price = Number(searchTerm.replace(/^(under|below)\s+/, ''));
      if (!isNaN(price) && p.price <= price) return true;
    }
    
    // Above/Over: "above 4000" or "over 4000"
    if (searchTerm.startsWith('above ') || searchTerm.startsWith('over ')) {
      const price = Number(searchTerm.replace(/^(above|over)\s+/, ''));
      if (!isNaN(price) && p.price >= price) return true;
    }
    
    return false;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Left - Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                <HiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-black text-gray-900 truncate">Admin Panel</h1>
                <p className="hidden sm:block text-xs text-gray-400 font-medium">{products.length} products</p>
              </div>
            </div>

            {/* Right - Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gray-900 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95"
              >
                <HiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </button>
              
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 text-xs sm:text-sm font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
              >
                <HiLogout className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search */}
        <div className="relative mb-6 sm:mb-8">
          <HiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5 transition-all"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Total', value: products.length, bg: 'bg-gray-900', icon: HiShoppingBag },
            { label: 'Sneakers', value: products.filter(p => p.category === 'Sneakers').length, bg: 'bg-gray-700', icon: HiStar },
            { label: 'Casual', value: products.filter(p => p.category === 'Casual').length, bg: 'bg-gray-800', icon: HiStar },
            { label: 'Sports', value: products.filter(p => p.category === 'Sports').length, bg: 'bg-gray-600', icon: HiStar },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} text-white rounded-2xl p-3 sm:p-5 hover:scale-[1.02] transition-transform cursor-default`}>
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <p className="text-white/70 text-[10px] sm:text-xs font-medium">{stat.label}</p>
                <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/50" />
              </div>
              <p className="text-xl sm:text-3xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-50 relative">
                <img 
                  src={product.images?.[0] || '/placeholder.png'} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
                {product.images?.length > 1 && (
                  <div className="absolute bottom-2 right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-[10px] sm:text-xs font-medium">
                    +{product.images.length - 1}
                  </div>
                )}
                <div className={`absolute top-2 left-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-white shadow-lg ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}>
                  {product.inStock ? 'Stock' : 'Out'}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-3 sm:p-4">
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mt-0.5 sm:mt-1 truncate">{product.name}</h3>
                <p className="text-sm sm:text-lg font-black text-gray-900 mt-1 sm:mt-2">Rs. {product.price?.toLocaleString()}</p>
                
                {/* Action Buttons */}
                <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowForm(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-all text-[11px] sm:text-sm font-semibold"
                  >
                    <HiPencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 active:bg-red-200 transition-all text-[11px] sm:text-sm font-semibold"
                  >
                    <HiTrash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <HiSearch className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm sm:text-lg font-medium">No products found</p>
            <p className="text-gray-300 text-xs sm:text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminDashboard;