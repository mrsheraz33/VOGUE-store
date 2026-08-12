import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiDocumentText, HiCheckCircle, HiBan, HiExclamation } from 'react-icons/hi';

const TermsOfService = () => {
  const terms = [
    {
      icon: HiDocumentText,
      title: 'Order Process',
      content: 'All orders are confirmed via WhatsApp. Prices are subject to change without notice. We reserve the right to cancel any order at our discretion.',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      icon: HiCheckCircle,
      title: 'Payment Terms',
      content: 'We offer Cash on Delivery (COD) service. Payment must be made in full upon delivery. We do not store any payment card information.',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      icon: HiBan,
      title: 'Returns & Refunds',
      content: 'Products can be returned within 7 days if defective or wrong item delivered. Refunds are processed within 5-7 working days after return approval.',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: HiExclamation,
      title: 'Limitation of Liability',
      content: 'VOUGE is not liable for delays caused by courier services or circumstances beyond our control. Product colors may slightly vary from images.',
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
            <HiDocumentText className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">Effective: January 2026</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700">Service</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            By using our services, you agree to these terms and conditions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terms.map((term, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${term.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                <term.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">{term.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{term.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 bg-gray-900 text-white rounded-3xl p-8 text-center">
          <h3 className="text-xl font-black mb-3">Have Questions?</h3>
          <p className="text-gray-400 mb-4">Reach out to us for any clarifications about our terms.</p>
          <a href='https://wa.me/923000381569'className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all">
            WhatsApp Us
          </a>
        </motion.div>
      </div>

      <div className="border-t border-gray-100 bg-white py-6 text-center">
        <p className="text-gray-400 text-sm">© 2026 VOUGE. All rights reserved.</p>
      </div>
    </div>
  );
};

export default TermsOfService;