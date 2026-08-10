import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiPhotograph } from 'react-icons/hi';

const ImageSlider = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        <HiPhotograph className="w-12 h-12 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative aspect-square overflow-hidden bg-gray-50">
      <img 
        src={images[currentIndex]} 
        alt={`${productName} - ${currentIndex + 1}`} 
        className="w-full h-full object-cover transition-transform duration-700" 
        loading="lazy" 
      />
      
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={prevSlide} className="p-2 bg-white/90 rounded-full text-gray-900 hover:bg-white shadow-lg transition-all">
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="p-2 bg-white/90 rounded-full text-gray-900 hover:bg-white shadow-lg transition-all">
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button 
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 rounded-full text-white text-xs flex items-center gap-1">
        <HiPhotograph className="w-3 h-3" />
        {images.length}
      </div>
    </div>
  );
};

export default ImageSlider;