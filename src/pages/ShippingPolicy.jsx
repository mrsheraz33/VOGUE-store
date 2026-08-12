import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiTruck, HiClock, HiCash, HiGlobe, HiShieldCheck } from 'react-icons/hi';

const ShippingPolicy = () => {
  const policies = [
    {
      icon: HiTruck,
      title: 'Free Delivery',
      desc: 'We offer free delivery all over Pakistan with no minimum order requirement.',
      color: 'from-teal-400 to-teal-600',
      details: ['Nationwide coverage', 'No hidden charges', 'All cities & towns']
    },
    {
      icon: HiClock,
      title: 'Delivery Time',
      desc: 'Orders are typically delivered within 2-3 working days across major cities.',
      color: 'from-cyan-400 to-cyan-600',
      details: ['2-3 days major cities', '3-5 days remote areas', 'Order before 5 PM']
    },
    {
      icon: HiCash,
      title: 'Cash on Delivery',
      desc: 'Pay only when you receive your order. No advance payment required.',
      color: 'from-amber-400 to-amber-600',
      details: ['No advance payment', 'Pay upon delivery', 'Check before paying']
    },
    {
      icon: HiGlobe,
      title: 'Coverage Area',
      desc: 'We deliver to all major cities including Karachi, Lahore, Islamabad, and more.',
      color: 'from-sky-400 to-sky-600',
      details: ['All major cities', 'Suburban areas', 'Rural delivery available']
    },
    {
      icon: HiShieldCheck,
      title: 'Order Tracking',
      desc: 'Track your order status via WhatsApp. We keep you updated at every step.',
      color: 'from-rose-400 to-rose-600',
      details: ['WhatsApp updates', 'Real-time tracking', 'Delivery confirmation']
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5 py-5">
          <a href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group">
            <HiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-6">
            <HiTruck className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-600">Fast & Reliable</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4">
            Shipping <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Everything you need to know about our delivery process.
          </p>
        </motion.div>

        <div className="space-y-8">
          {policies.map((policy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${policy.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <policy.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{policy.title}</h3>
                  <p className="text-gray-600 mb-4">{policy.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {policy.details.map((detail, j) => (
                      <span key={j} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-12 bg-gray-900 text-white rounded-3xl p-10 text-center">
          <HiTruck className="w-16 h-16 text-teal-400 mx-auto mb-5" />
          <h3 className="text-2xl font-black mb-3">Need Shipping Help?</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Contact our support team for any shipping-related questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href='https://wa.me/923000381569' className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all">
              WhatsApp Support
            </a>
            <a href="mailto:support@vougee.store" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all">
              Email Us
            </a>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-gray-100 bg-white py-6 text-center">
        <p className="text-gray-400 text-sm">© 2026 VOGUE. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ShippingPolicy;