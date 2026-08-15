import React from 'react';
import { HiFire, HiSparkles, HiTag, HiBadgeCheck, HiTruck, HiCash } from 'react-icons/hi';

const TickerBar = () => {
  const tickerItems = [
    { icon: HiFire, text: 'NEW STOCK ARRIVED - Limited Edition' },
    { icon: HiSparkles, text: 'Premium Quality Sneakers' },
    { icon: HiTag, text: 'Special Discount on All Products' },
    { icon: HiBadgeCheck, text: '100% Original Products' },
    { icon: HiTruck, text: 'Fast Delivery Nationwide' },
    { icon: HiCash, text: 'Cash on Delivery Available' },
  ];

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 overflow-hidden py-2.5 sm:py-3 shadow-lg relative">
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative flex whitespace-nowrap animate-marquee">
        {/* Duplicate items for seamless loop */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 sm:gap-3 mx-8 sm:mx-10">
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            <span className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase">
              {item.text}
            </span>
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full mx-2 sm:mx-4" />
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TickerBar;