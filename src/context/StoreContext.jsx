import React, { useState, createContext, useContext } from 'react';

const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const orderViaWhatsApp = (product) => {
    const msg = `Hi, I want to order:%0A%0AProduct: ${product.name}%0ACategory: ${product.category}%0APrice: Rs. ${product.price.toLocaleString()}%0AColor: ${product.color}%0A%0APlease confirm availability.`;
    window.open(`https://wa.me/923000381569?text=${msg}`, '_blank');
  };

  return (
    <StoreContext.Provider value={{ selectedProduct, isModalOpen, openModal, closeModal, orderViaWhatsApp }}>
      {children}
    </StoreContext.Provider>
  );
};