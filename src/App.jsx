import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ScrollProgress from './components/ScrollProgress'
import ParticleBackground from './components/ParticleBackground'
import PageTransition from './components/PageTransition'

// Pages
import Home from './pages/Home'
import Menu from './pages/Menu'
import Delivery from './pages/Delivery'
import About from './pages/About'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes({ addToCart }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><Menu onAddToCart={addToCart} /></PageTransition>} />
        <Route path="/delivery" element={<PageTransition><Delivery /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  // Add item to cart or increment quantity
  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setCartOpen(true)
  }, [])

  // Update quantity (or remove if 0)
  const updateQuantity = useCallback((id, qty) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id))
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
      )
    }
  }, [])

  // Remove item
  const removeItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <div className="min-h-screen bg-dark text-cream flex flex-col relative">
      <ScrollProgress />
      <ParticleBackground />
      <ScrollToTop />
      <Navbar cartCount={totalItems} onCartClick={() => setCartOpen(true)} />

      <main className="flex-1 relative z-10">
        <AnimatedRoutes addToCart={addToCart} />
      </main>

      <Footer />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  )
}
