import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const Contact = () => {
  const contactCards = [
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: '+92 300 0381569',
      link: 'https://wa.me/923000381569',
      color: 'from-green-400 to-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700'
    },
    {
      icon: HiMail,
      title: 'Email',
      value: 'support@vougee.store',
      link: 'mailto:support@vougee.store',
      color: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700'
    },
    {
      icon: HiLocationMarker,
      title: 'Location',
      value: 'Shop No 06 Model Bazar Jhang Road Faisalabad',
      link: '#',
      color: 'from-purple-400 to-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700'
    },
  ];

  const socialLinks = [
    { icon: FaWhatsapp, url: 'https://wa.me/923000381569', color: 'bg-green-500', hover: 'hover:bg-green-600' },
    { icon: FaFacebook, url: '#', color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
    { icon: FaInstagram, url: '#', color: 'bg-gradient-to-br from-purple-500 to-pink-500', hover: 'hover:from-purple-600 hover:to-pink-600' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@vouge.store7?_r=1&_t=ZS-98m2ZRGyzJ7', color: 'bg-gray-900', hover: 'hover:bg-black' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 py-5">
          <a href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group">
            <HiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-16 lg:py-24">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
            <HiMail className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-600">Get in Touch</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-900">Us</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            We're here to help! Reach out through any channel below.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactCards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.link}
              target={card.link.startsWith('http') ? '_blank' : ''}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`${card.bg} ${card.border} border-2 rounded-3xl p-8 text-center group cursor-pointer transition-all hover:shadow-xl`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">{card.title}</h3>
              <p className={`${card.text} font-bold text-lg`}>{card.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Business Hours */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-16 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HiClock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">Business Hours</h3>
              <p className="text-gray-500 text-sm">We're available during these times</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { day: 'Monday - Friday', time: '9:00 AM - 9:00 PM' },
              { day: 'Saturday', time: '10:00 AM - 8:00 PM' },
              { day: 'Sunday', time: '11:00 AM - 6:00 PM' },
            ].map((schedule, i) => (
              <div key={i} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">{schedule.day}</span>
                <span className="text-gray-900 font-bold">{schedule.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 ${social.color} ${social.hover} rounded-2xl flex items-center justify-center shadow-lg transition-all`}
              >
                <social.icon className="w-6 h-6 text-white" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-white py-6 text-center">
        <p className="text-gray-400 text-sm">© 2026 VOGUE. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Contact;