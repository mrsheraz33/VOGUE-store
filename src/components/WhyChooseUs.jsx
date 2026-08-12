import React from 'react';
import { HiBadgeCheck, HiTruck } from 'react-icons/hi';
import { FaMoneyBillWave } from 'react-icons/fa';

const WhyChooseUs = () => (
  <section id="why-us" className="py-16 lg:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Why Choose VOUGE?</h2>
        <div className="w-20 h-1 bg-gray-900 mx-auto mt-4 rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaMoneyBillWave className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Cash on Delivery</h3>
          <p className="text-gray-500 text-sm">Pay when you receive your order</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <HiBadgeCheck className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Premium Quality</h3>
          <p className="text-gray-500 text-sm">Top quality materials used</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <HiTruck className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
          <p className="text-gray-500 text-sm">Delivery within 2-3 working days</p>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;