import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiChevronDown, 
  HiQuestionMarkCircle,
  HiTruck,
  HiCash,
  HiRefresh,
HiScale,
  HiBadgeCheck,
  HiCube
} from 'react-icons/hi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What is the delivery time?',
      answer: 'Orders are typically delivered within 2-3 working days across major cities. For remote areas, delivery may take 3-5 working days. We use reliable courier services to ensure safe and timely delivery.',
      icon: HiTruck,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      question: 'How does Cash on Delivery work?',
      answer: 'Cash on Delivery (COD) means you pay only when you receive your order. No advance payment is required. Simply place your order via WhatsApp, and pay the delivery agent when your product arrives.',
      icon: HiCash,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy. If the product is defective, damaged, or wrong item delivered, you can return it within 7 days of delivery. Refunds are processed within 5-7 working days after return approval.',
      icon: HiRefresh,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      question: 'How do I know my shoe size?',
      answer: 'We provide sizes from UK 6 to UK 12. If you are unsure about your size, we recommend measuring your foot length and comparing it with our size chart. You can also WhatsApp us for size guidance.',
      icon: HiScale,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      question: 'Are your products original?',
      answer: 'Yes! All our products are 100% authentic and sourced from trusted suppliers. We guarantee premium quality materials and craftsmanship with every pair.',
      icon: HiBadgeCheck,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      question: 'How can I track my order?',
      answer: 'You can track your order status via WhatsApp. Simply message us your order ID, and our support team will provide you with real-time tracking updates and delivery confirmation.',
      icon: HiCube,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600'
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-3xl mb-6">
            <HiQuestionMarkCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4 text-gray-900">
            Frequently Asked <span className="text-gray-400">Questions</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Everything you need to know about our products and services</p>
          <div className="w-20 h-1.5 bg-gray-900 mx-auto mt-6 rounded-full" />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'border-gray-900 shadow-lg' 
                  : 'border-gray-100 hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${faq.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <faq.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${faq.iconColor}`} />
                  </div>
                  <h3 className={`font-bold text-base sm:text-lg transition-colors ${
                    openIndex === index ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === index ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <HiChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-16 sm:pl-20">
                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gray-900 rounded-3xl p-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-4">
            <HiQuestionMarkCircle className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-black text-white mb-3">Still Have Questions?</h3>
          <p className="text-gray-400 mb-6">We're here to help! Contact us on WhatsApp for instant support.</p>
          <a 
            href="https://wa.me/923000381569?text=Hi,%20I%20have%20a%20question" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all shadow-lg"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;