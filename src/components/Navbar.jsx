import { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation as useRouterLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Phone, Flame, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Delivery', href: '/delivery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar({ cartCount, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useRouterLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          scrolled ? 'py-2.5' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-700 rounded-2xl ${scrolled ? 'glass px-6 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.9)]' : 'px-4'}`}>
            {/* Logo */}
            <RouterLink to="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl border border-primary/30 text-primary group-hover:bg-primary group-hover:text-dark transition-all duration-500 shadow-[0_0_20px_rgba(212,168,83,0.1)]">
                <Flame size={20} className="fill-current" />
                <span className="absolute inset-0 rounded-xl border border-primary/15 animate-ping opacity-15 pointer-events-none" style={{ animationDuration: '3.5s' }} />
              </div>
              <div className="flex flex-col">
                <h1 className="font-playfair text-xl sm:text-2xl font-bold text-cream leading-none tracking-wide group-hover:text-primary transition-colors duration-400">
                  Cluck & Grill
                </h1>
                <p className="text-[8px] tracking-[0.3em] uppercase text-warm-gray mt-0.5 font-medium">
                  Premium Dining
                </p>
              </div>
            </RouterLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <RouterLink
                    key={link.name}
                    to={link.href}
                    className={`relative px-5 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-xl group ${
                      isActive ? 'text-primary' : 'text-warm-gray hover:text-cream'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 bg-primary/8 border border-primary/12 rounded-xl"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </RouterLink>
                )
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl border border-white/8 hover:border-primary/40 hover:bg-white/4 transition-all duration-300"
                title="Search"
              >
                <Search size={15} className="text-warm-gray" />
              </button>

              {/* Phone */}
              <a
                href="tel:+1234567890"
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-[13px] text-warm-gray hover:text-primary transition-colors rounded-xl border border-transparent hover:border-white/8"
              >
                <Phone size={13} />
                <span className="font-medium tracking-wider">Reservations</span>
              </a>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-white/8 hover:border-primary/40 hover:bg-white/4 transition-all duration-300 group"
              >
                <ShoppingBag size={17} className="text-cream group-hover:text-primary transition-colors" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-primary to-primary-light text-dark text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(212,168,83,0.4)]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/8 hover:border-primary/40 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={18} className="text-cream" />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={18} className="text-cream" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden glass-panel border border-white/5 mx-4 mt-2 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-8 flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.href
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <RouterLink
                        to={link.href}
                        className={`block px-5 py-3.5 text-lg font-playfair tracking-wide transition-all duration-300 rounded-xl ${
                          isActive ? 'text-primary bg-primary/8' : 'text-warm-gray hover:text-cream hover:bg-white/4'
                        }`}
                      >
                        {link.name}
                      </RouterLink>
                    </motion.div>
                  )
                })}

                <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3 px-4 py-3 bg-dark rounded-xl border border-white/5">
                    <Search size={15} className="text-warm-gray" />
                    <input
                      type="text"
                      placeholder="Search our menu..."
                      className="flex-1 bg-transparent text-cream text-sm focus:outline-none placeholder-warm-gray/30 font-light"
                    />
                  </div>

                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-primary tracking-wide text-sm px-4 font-medium"
                  >
                    <Phone size={15} />
                    Reservation: (123) 456-7890
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-dark/92 backdrop-blur-2xl flex items-start justify-center pt-36"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -25, opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search size={22} className="absolute left-7 top-1/2 -translate-y-1/2 text-warm-gray" />
                <input
                  type="text"
                  placeholder="Search our menu, dishes, categories..."
                  autoFocus
                  className="w-full px-16 py-7 bg-dark-card border border-white/8 rounded-2xl text-cream text-xl focus:outline-none focus:border-primary/40 placeholder-warm-gray/25 shadow-[0_25px_70px_rgba(0,0,0,0.7)] font-light"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-7 top-1/2 -translate-y-1/2 text-warm-gray hover:text-cream transition-colors"
                >
                  <kbd className="px-2.5 py-1 text-[10px] border border-white/8 rounded-md text-warm-gray tracking-wider">ESC</kbd>
                </button>
              </div>
              <p className="text-warm-gray text-sm mt-5 ml-2 font-light">
                Try searching for <span className="text-primary cursor-pointer hover:underline">"grilled chicken"</span> or <span className="text-primary cursor-pointer hover:underline">"wings"</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
