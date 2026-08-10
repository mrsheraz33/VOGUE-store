import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiLogout, HiStar } from 'react-icons/hi';
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
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
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

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="VOGUE" className="h-10 w-auto" />
            <h1 className="text-xl font-black text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all"
            >
              <HiPlus className="w-5 h-5" /> Add Product
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
            >
              <HiLogout className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: products.length, bg: 'bg-gray-900' },
            { label: 'Sneakers', value: products.filter(p => p.category === 'Sneakers').length, bg: 'bg-gray-700' },
            { label: 'Casual', value: products.filter(p => p.category === 'Casual').length, bg: 'bg-gray-800' },
            { label: 'Sports', value: products.filter(p => p.category === 'Sports').length, bg: 'bg-gray-600' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} text-white rounded-2xl p-5`}>
              <p className="text-white/70 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-gray-50 relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
                {product.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-full text-white text-xs">
                    +{product.images.length - 1}
                  </div>
                )}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-bold text-gray-400 uppercase">{product.category}</span>
                <h3 className="font-bold text-gray-900 mt-1">{product.name}</h3>
                <p className="text-lg font-black text-gray-900 mt-2">Rs. {product.price.toLocaleString()}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowForm(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm font-semibold"
                  >
                    <HiPencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all text-sm font-semibold"
                  >
                    <HiTrash className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <HiSearch className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No products found</p>
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