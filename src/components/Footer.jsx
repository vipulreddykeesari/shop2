import { useState, useEffect } from 'react'
import { Flame, ArrowRight, ArrowUp, MapPin, Mail, Phone, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const footerLinks = {
  Menu: [
    { name: 'Grilled Chicken', href: '/menu' },
    { name: 'Fried Chicken', href: '/menu' },
    { name: 'Wings', href: '/menu' },
    { name: 'Burgers', href: '/menu' },
    { name: 'Combos', href: '/menu' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about' },
    { name: 'Careers', href: '/contact' },
    { name: 'Blog', href: '/' },
  ],
  Support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/' },
    { name: 'Delivery Info', href: '/delivery' },
    { name: 'Privacy Policy', href: '/' },
  ],
}

const socials = [
  { name: 'Instagram', icon: Instagram },
  { name: 'Facebook', icon: Facebook },
  { name: 'Twitter', icon: Twitter },
  { name: 'YouTube', icon: Youtube },
]

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="relative pt-20 pb-10 overflow-hidden bg-dark border-t border-white/4">
        {/* Wave */}
        <div className="wave-divider">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,25 1440,30 L1440,0 L0,0 Z"
              fill="var(--color-dark)"
              fillOpacity="0.5"
            />
          </svg>
        </div>

        {/* Background Orbs */}
        <div className="ambient-orb top-0 right-0 w-[600px] h-[600px] bg-primary/3" />
        <div className="ambient-orb bottom-0 left-0 w-[700px] h-[700px] bg-primary/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Newsletter */}
          <div className="glass-card rounded-3xl p-8 sm:p-12 mb-20 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 text-center lg:text-left max-w-xl">
              <h4 className="font-playfair font-bold text-cream text-2xl sm:text-3xl mb-3 leading-tight">
                Join the <span className="text-primary italic">Culinary Club</span>
              </h4>
              <p className="text-warm-gray text-base leading-relaxed font-light">
                Subscribe for exclusive reservations, secret menu items, and the latest updates from our chef.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto relative z-10"
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 lg:w-80 px-7 py-4.5 rounded-xl bg-dark border border-white/8 text-cream text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.02] transition-all duration-300 placeholder-warm-gray/30 font-light"
              />
              <button
                type="submit"
                className="group/btn flex items-center justify-center gap-2.5 px-9 py-4.5 bg-gradient-to-r from-primary to-primary-light text-dark font-bold rounded-xl hover:shadow-[0_12px_30px_rgba(212,168,83,0.25)] transition-all duration-400 hover:-translate-y-1 shrink-0 tracking-wide"
              >
                Subscribe
                <ArrowRight size={17} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-7">
              <Link to="/" className="flex items-center gap-4 group inline-flex">
                <div className="w-12 h-12 rounded-xl border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-dark text-primary transition-all duration-500 shadow-[0_0_20px_rgba(212,168,83,0.1)]">
                  <Flame size={24} className="fill-current" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-cream leading-none tracking-tight group-hover:text-primary transition-colors duration-400">Rahman Chicken Center</h3>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-warm-gray mt-1 font-medium">Premium Dining</p>
                </div>
              </Link>

              <p className="text-warm-gray text-base leading-relaxed max-w-sm font-light">
                Serving the most exquisite, flame-grilled culinary creations since 2014.
                Premium ingredients, bold flavors, unparalleled service.
              </p>

              <div className="space-y-4 pt-2">
                <a href="tel:+1234567890" className="flex items-center gap-4 text-warm-gray hover:text-primary transition-all hover:translate-x-1 duration-300 w-fit group">
                  <div className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-cream group-hover:border-primary/40 group-hover:bg-primary/5 transition-all"><Phone size={15} /></div>
                  <span className="text-sm font-medium tracking-wide">(123) 456-7890</span>
                </a>
                <a href="mailto:hello@rahmanchickencenter.com" className="flex items-center gap-4 text-warm-gray hover:text-primary transition-all hover:translate-x-1 duration-300 w-fit group">
                  <div className="w-10 h-10 rounded-full border border-dark-gray/60 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors duration-300">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-medium tracking-wide">hello@rahmanchickencenter.com</span>
                </a>
                <div className="flex items-center gap-4 text-warm-gray w-fit">
                  <div className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-cream"><MapPin size={15} /></div>
                  <span className="text-sm font-medium tracking-wide">123 Culinary Ave, Foodville</span>
                </div>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="lg:ml-auto">
                <h4 className="font-bold text-cream text-lg mb-7 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-warm-gray text-sm hover:text-primary transition-all duration-300 flex items-center gap-2 group font-light"
                      >
                        <span className="w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-3"></span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-7 pt-9 border-t border-white/4">
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={s.name}
                    href="#"
                    title={s.name}
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-cream hover:bg-gradient-to-br hover:from-primary hover:to-primary-light hover:text-dark hover:border-primary transition-colors duration-300"
                  >
                    <Icon size={17} />
                  </motion.a>
                )
              })}
            </div>

            <p className="text-warm-gray text-xs sm:text-sm font-light text-center md:text-left">
              © 2026 <span className="text-cream font-medium">Rahman Chicken Center</span>. All rights reserved. Crafted with precision.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-[10px] text-warm-gray font-bold tracking-[0.2em] uppercase">
              <Link to="/" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/" className="hover:text-primary transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={scrollToTop}
            className="back-to-top"
            title="Back to top"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
