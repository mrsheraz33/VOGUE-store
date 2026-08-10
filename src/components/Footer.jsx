import React from 'react';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <a href="/" className="inline-flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="VOGUE" className="h-25 w-auto object-contain brightness-0 invert" />
            </a>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Premium sneakers for the modern Pakistani. Trendy designs, affordable prices, Cash on Delivery available.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all"><FaFacebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all"><FaInstagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-all"><FaTiktok className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="/#shop" className="text-gray-400 hover:text-white transition-colors text-sm">Shop</a></li>
              <li><a href="/#why-us" className="text-gray-400 hover:text-white transition-colors text-sm">Why Choose Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">Admin</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/923249620969" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-all"><FaWhatsapp className="w-5 h-5 text-green-400" /></div>
                  <div><p className="text-xs text-gray-500">WhatsApp</p><p className="font-medium">+92 324 9620969</p></div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0"><HiMail className="w-5 h-5 text-gray-500" /></div>
                  <div><p className="text-xs text-gray-500">Email</p><p className="font-medium">support@vogue.pk</p></div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0"><HiLocationMarker className="w-5 h-5 text-gray-500" /></div>
                  <div><p className="text-xs text-gray-500">Location</p><p className="font-medium">Karachi, Pakistan</p></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© 2026 VOGUE. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;