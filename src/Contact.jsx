import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiLocationMarker, HiMail, HiPhone, HiClock,
  HiArrowLeft
} from 'react-icons/hi';
import { 
  FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaYoutube 
} from 'react-icons/fa';

const Contact = () => {
  const contactDetails = [
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: '+92 324 9620969',
      link: 'https://wa.me/923249620969',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      hoverColor: 'hover:bg-green-100',
      borderColor: 'border-green-200'
    },
    {
      icon: HiPhone,
      title: 'Phone',
      value: '+92 324 9620969',
      link: 'tel:+923249620969',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      icon: HiMail,
      title: 'Email',
      value: 'support@vogue.pk',
      link: 'mailto:support@vogue.pk',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      hoverColor: 'hover:bg-orange-100',
      borderColor: 'border-orange-200'
    },
    {
      icon: HiLocationMarker,
      title: 'Location',
      value: 'Karachi, Pakistan',
      link: '#',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      hoverColor: 'hover:bg-purple-100',
      borderColor: 'border-purple-200'
    },
  ];

  const socialLinks = [
    { 
      icon: FaWhatsapp, 
      name: 'WhatsApp',
      url: 'https://wa.me/923249620969',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    { 
      icon: FaFacebook, 
      name: 'Facebook',
      url: 'https://facebook.com/vogue.pk',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    { 
      icon: FaInstagram, 
      name: 'Instagram',
      url: 'https://instagram.com/vogue.pk',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600'
    },
    { 
      icon: FaTiktok, 
      name: 'TikTok',
      url: 'https://tiktok.com/@vogue.pk',
      color: 'bg-gray-900',
      hoverColor: 'hover:bg-black'
    },
    { 
      icon: FaYoutube, 
      name: 'YouTube',
      url: 'https://youtube.com/@vogue.pk',
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700'
    },
  ];

  const businessHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 9:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 8:00 PM' },
    { day: 'Sunday', time: '11:00 AM - 6:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-6">
          <a href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <HiArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Back to Home</span>
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
        {/* Logo & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.png" alt="VOGUE" className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">Get in Touch</h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            We'd love to hear from you. Reach out through any of these channels.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {contactDetails.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : ''}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`${item.bgColor} ${item.hoverColor} border ${item.borderColor} rounded-2xl p-6 transition-all cursor-pointer group`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className={`${item.textColor} font-semibold`}>{item.value}</p>
                  <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-600 transition-colors">
                    {item.title === 'WhatsApp' && 'Click to chat'}
                    {item.title === 'Phone' && 'Click to call'}
                    {item.title === 'Email' && 'Click to email'}
                    {item.title === 'Location' && 'Our address'}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
              <HiClock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Business Hours</h3>
              <p className="text-gray-500 text-sm">When you can reach us</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {businessHours.map((schedule, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between py-3 ${
                  index !== businessHours.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-gray-600 font-medium">{schedule.day}</span>
                <span className="text-gray-900 font-bold">{schedule.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us on Social Media</h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 ${social.color} ${social.hoverColor} rounded-2xl flex items-center justify-center shadow-lg transition-all`}
                title={social.name}
              >
                <social.icon className="w-6 h-6 text-white" />
              </motion.a>
            ))}
          </div>

          <p className="text-gray-400 text-sm mt-6">
            Stay updated with our latest products and offers
          </p>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
        >
          {[
            { 
              title: 'Cash on Delivery', 
              desc: 'Pay when you receive your order',
              bg: 'bg-emerald-50',
              border: 'border-emerald-200',
              text: 'text-emerald-700',
              subtext: 'text-emerald-500'
            },
            { 
              title: 'Fast Shipping', 
              desc: 'Delivery within 2-3 working days',
              bg: 'bg-sky-50',
              border: 'border-sky-200',
              text: 'text-sky-700',
              subtext: 'text-sky-500'
            },
            { 
              title: 'Premium Quality', 
              desc: '100% authentic products guaranteed',
              bg: 'bg-amber-50',
              border: 'border-amber-200',
              text: 'text-amber-700',
              subtext: 'text-amber-500'
            },
          ].map((card, index) => (
            <div 
              key={index} 
              className={`${card.bg} border ${card.border} rounded-2xl p-5 text-center`}
            >
              <h4 className={`font-bold ${card.text} mb-1`}>{card.title}</h4>
              <p className={`text-sm ${card.subtext}`}>{card.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer Mini */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 VOGUE. All rights reserved. | 
            <a href="/" className="text-gray-600 hover:text-gray-900 ml-1">Back to Shop</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;