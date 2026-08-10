import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiShoppingBag, HiCash, HiClock, HiChevronLeft, HiChevronRight, HiPhotograph } from 'react-icons/hi';
import { useStore } from '../context/StoreContext';

const ProductModal = () => {
  const { selectedProduct, isModalOpen, closeModal, orderViaWhatsApp } = useStore();
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  useEffect(() => {
    if (selectedProduct) setModalImageIndex(0);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const images = selectedProduct.images || [];

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-10 p-2.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all">
              <HiX className="w-5 h-5" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-gray-50">
                {images.length > 0 ? (
                  <>
                    <img src={images[modalImageIndex]} alt={selectedProduct.name} className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
                    {images.length > 1 && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-between px-2">
                          <button onClick={() => setModalImageIndex(prev => (prev - 1 + images.length) % images.length)} className="p-2 bg-white/90 rounded-full text-gray-900 hover:bg-white shadow-lg">
                            <HiChevronLeft className="w-5 h-5" />
                          </button>
                          <button onClick={() => setModalImageIndex(prev => (prev + 1) % images.length)} className="p-2 bg-white/90 rounded-full text-gray-900 hover:bg-white shadow-lg">
                            <HiChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((img, i) => (
                            <button key={i} onClick={() => setModalImageIndex(i)} className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === modalImageIndex ? 'border-gray-900' : 'border-white/50'}`}>
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <HiPhotograph className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-6 lg:p-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{selectedProduct.category}</span>
                <h2 className="text-2xl lg:text-3xl font-black mt-1 mb-3 text-gray-900">{selectedProduct.name}</h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{selectedProduct.description || 'Premium quality footwear.'}</p>
                <p className="text-4xl font-black text-gray-900 mb-5">Rs. {selectedProduct.price.toLocaleString()}</p>
                {selectedProduct.color && <p className="text-sm text-gray-500 mb-2">Color: <span className="text-gray-900 font-bold">{selectedProduct.color}</span></p>}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <>
                    <p className="text-sm text-gray-500 mb-3">Available Sizes:</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProduct.sizes.map(s => <span key={s} className="px-4 py-2 border-2 border-gray-200 rounded-full text-sm font-semibold">{s}</span>)}
                    </div>
                  </>
                )}
                <div className="flex gap-4 mb-6 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5"><HiCash className="text-green-500 w-4 h-4" /> Cash on Delivery</span>
                  <span className="flex items-center gap-1.5"><HiClock className="text-orange-500 w-4 h-4" /> 2-3 Days Delivery</span>
                </div>
                <button onClick={() => { orderViaWhatsApp(selectedProduct); closeModal(); }} className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-all text-lg shadow-xl">
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

export default ProductModal;