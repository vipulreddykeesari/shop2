'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Globe, Share2, ChevronRight, Heart, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-2xl shadow-lg">
                🍗
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Rahman Chicken</h3>
                <p className="text-xs text-primary-light font-medium">Center • Fresh & Delivered</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your trusted source for farm-fresh chicken and meat products. Quality you can taste, delivered to your doorstep.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: '#' },
                { icon: MessageCircle, href: '#' },
                { icon: Share2, href: '#' },
                { icon: Mail, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Fresh Chicken', href: '/products?category=fresh-chicken' },
                { label: 'Cuts & Pieces', href: '/products?category=cuts-pieces' },
                { label: 'Ready to Cook', href: '/products?category=ready-to-cook' },
                { label: 'Combos & Offers', href: '/products?category=combos-offers' },
                { label: 'Track Order', href: '/track' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors group">
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Customer Service</h4>
            <ul className="space-y-3">
              {[
                { label: 'My Account', href: '/profile' },
                { label: 'Order History', href: '/orders' },
                { label: 'Return Policy', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms & Conditions', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors group">
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">Jai Hind Babu Gully, Vanasthalipuram, Hyderabad, Telangana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919700890630" className="text-sm text-gray-400 hover:text-primary transition-colors">+91 97008 90630</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:rahmanchicken@gmail.com" className="text-sm text-gray-400 hover:text-primary transition-colors">rahmanchicken@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-gray-400">7:00 AM - 10:00 PM (Daily)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Rahman Chicken Center. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
