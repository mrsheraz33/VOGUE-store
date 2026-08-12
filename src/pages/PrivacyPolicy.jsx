import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiShieldCheck, HiLockClosed, HiEye, HiTrash } from 'react-icons/hi';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: HiShieldCheck,
      title: 'Information We Collect',
      content: 'We collect information you provide directly, such as your name, phone number, and shipping address when you place an order. We also collect WhatsApp messages for order processing.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: HiLockClosed,
      title: 'How We Use Your Information',
      content: 'Your information is used solely for order processing, delivery, and customer support. We never share your personal data with third parties for marketing purposes.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: HiEye,
      title: 'Data Security',
      content: 'We implement industry-standard security measures to protect your personal information. All communications are encrypted and stored securely.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: HiTrash,
      title: 'Data Retention & Deletion',
      content: 'We retain your data only as long as necessary to fulfill your orders. You can request deletion of your data at any time by contacting our support team.',
      color: 'from-red-400 to-red-600'
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

      <div className="max-w-4xl mx-auto px-5 py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <HiShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Last Updated: January 2026</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Your privacy is important to us. Here's how we protect your data.
          </p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">{section.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 bg-gray-900 text-white rounded-3xl p-8 text-center">
          <h3 className="text-xl font-black mb-3">Questions About Privacy?</h3>
          <p className="text-gray-400 mb-4">Contact us on WhatsApp for any privacy-related concerns.</p>
          <a href='https://wa.me/923000381569' className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all">
            Contact Support
          </a>
        </motion.div>
      </div>

      <div className="border-t border-gray-100 bg-white py-6 text-center">
        <p className="text-gray-400 text-sm">© 2026 VOUGE. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;