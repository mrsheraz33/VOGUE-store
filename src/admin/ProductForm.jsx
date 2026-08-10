import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiX, HiPhotograph, HiPlus, HiTrash } from 'react-icons/hi';

const API_URL = 'https://vogue-backend-ibwc.onrender.com';

const ProductForm = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sneakers',
    price: '',
    color: '',
    sizes: ['UK 7', 'UK 8', 'UK 9'],
    description: '',
    inStock: true
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const availableSizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];
  const categories = ['Sneakers', 'Casual', 'Sports'];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        color: product.color,
        sizes: product.sizes,
        description: product.description,
        inStock: product.inStock
      });
      setExistingImages(product.images || []);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...urls]);
  };

  const removeNewImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (index) => {
    if (product) {
      try {
        const token = localStorage.getItem('adminToken');
        await fetch(`${API_URL}/api/admin/products/${product._id}/images`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ imageUrl: existingImages[index] })
        });
      } catch (err) {
        console.error('Failed to delete image');
      }
    }
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.sizes.length === 0) {
      setError('Please select at least one size');
      return;
    }

    const totalImages = existingImages.length + images.length;
    if (totalImages < 1) {
      setError('Please upload at least 1 image');
      return;
    }
    if (totalImages > 10) {
      setError('Maximum 10 images allowed');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('sizes', JSON.stringify(formData.sizes));
      formDataToSend.append('description', formData.description);
      formDataToSend.append('inStock', formData.inStock);
      formDataToSend.append('existingImages', JSON.stringify(existingImages));
      
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const url = product 
        ? `${API_URL}/api/admin/products/${product._id}`
        : `${API_URL}/api/admin/products`;
      
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const savedProduct = await response.json();
      onSave(savedProduct);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-2xl font-black text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Product Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Price (Rs.) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              placeholder="Enter price"
              min="0"
              required
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Color *</label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all"
              placeholder="e.g., Black/Red"
              required
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Available Sizes *</label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    formData.sizes.includes(size)
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all resize-none"
              rows="3"
              placeholder="Enter product description"
              maxLength="500"
              required
            />
            <p className="text-xs text-gray-400 mt-1">{formData.description.length}/500 characters</p>
          </div>

          {/* In Stock */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-gray-700">In Stock</label>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, inStock: !prev.inStock }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${formData.inStock ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.inStock ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Images * ({existingImages.length + images.length}/10)
            </label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mb-3">
                {existingImages.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <HiTrash className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New Images Preview */}
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mb-3">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <HiTrash className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-900 cursor-pointer transition-all">
              <HiPhotograph className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">Click to upload images</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : (
              <>
                <HiPlus className="w-5 h-5" />
                {product ? 'Update Product' : 'Add Product'}
              </>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductForm;