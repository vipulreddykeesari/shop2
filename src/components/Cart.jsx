import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, MapPin, CheckCircle2, Tag } from 'lucide-react'
import { useState } from 'react'

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove }) {
  const [address, setAddress] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const FREE_DELIVERY_THRESHOLD = 499
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 49
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const tax = Math.round((subtotal - discount) * 0.05)
  const total = subtotal - discount + deliveryFee + tax

  const deliveryProgress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'CLUCK10') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
      setPromoApplied(false)
      setTimeout(() => setPromoError(''), 3000)
    }
  }

  const handleOrder = () => {
    if (items.length === 0) return
    setOrderPlaced(true)
    setTimeout(() => setOrderPlaced(false), 4000)
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark border-l border-white/4 z-50 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.9)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/4 bg-dark-card">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl border border-primary/15 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(212,168,83,0.08)] bg-primary/5">
                  <ShoppingBag size={19} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-cream text-xl tracking-wide">Your Order</h3>
                  <p className="text-warm-gray text-[10px] tracking-[0.2em] uppercase mt-0.5 font-medium">
                    {totalItems} item{totalItems !== 1 ? 's' : ''} inside
                  </p>
                </div>
              </div>
              <button
                id="close-cart"
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-warm-gray hover:text-cream hover:bg-white/5 transition-colors border border-transparent hover:border-white/8 duration-300"
              >
                <X size={17} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Delivery Progress */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-b border-white/4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-warm-gray font-bold">
                    {remaining > 0 ? 'Free Delivery Progress' : '🎉 Free Delivery Unlocked!'}
                  </span>
                  <span className="text-xs text-primary font-medium">
                    {remaining > 0 ? `₹${remaining} away` : 'Complimentary'}
                  </span>
                </div>
                <div className="delivery-progress-bar">
                  <motion.div
                    className="delivery-progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${deliveryProgress}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-2xl bg-dark-card border border-white/4 flex items-center justify-center mb-7 text-warm-gray/15">
                    <ShoppingBag size={42} strokeWidth={1} />
                  </div>
                  <h4 className="font-playfair text-cream text-2xl mb-3">Your cart is empty</h4>
                  <p className="text-warm-gray text-sm mb-10 max-w-[240px] font-light leading-relaxed">
                    Explore our menu and discover culinary masterpieces to delight your palate.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-9 py-3.5 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-primary to-primary-light text-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(212,168,83,0.25)]"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0, padding: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.4 }}
                      className="flex gap-4 p-4 rounded-xl bg-dark-card border border-white/4 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="w-16 h-16 rounded-lg bg-dark border border-white/4 flex items-center justify-center text-2xl shrink-0 overflow-hidden relative z-10">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <span>{item.emoji}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 relative z-10 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-playfair font-medium text-cream text-base truncate pr-2">{item.name}</h4>
                            <button
                              onClick={() => onRemove(item.id)}
                              className="text-warm-gray/25 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 mt-0.5"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <p className="text-warm-gray font-light text-xs">₹{item.price} each</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-dark border border-white/4 rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-md flex items-center justify-center text-warm-gray hover:text-cream hover:bg-white/8 transition-colors"
                            >
                              <Minus size={12} strokeWidth={2} />
                            </button>
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 1.3 }}
                              animate={{ scale: 1 }}
                              className="text-cream font-bold text-xs w-7 text-center"
                            >
                              {item.quantity}
                            </motion.span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-md flex items-center justify-center text-warm-gray hover:text-cream hover:bg-white/8 transition-colors"
                            >
                              <Plus size={12} strokeWidth={2} />
                            </button>
                          </div>
                          <motion.p
                            key={item.price * item.quantity}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="text-primary font-semibold text-sm"
                          >
                            ₹{item.price * item.quantity}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/4 bg-dark-card space-y-5">
                {/* Promo */}
                <div>
                  <div className="promo-field">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      disabled={promoApplied}
                    />
                    <button onClick={handlePromo} disabled={promoApplied || !promoCode.trim()}>
                      {promoApplied ? '✓ Applied' : 'Apply'}
                    </button>
                  </div>
                  <AnimatePresence>
                    {promoApplied && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-green-400 mt-2 flex items-center gap-1">
                        <Tag size={12} /> 10% discount applied!
                      </motion.p>
                    )}
                    {promoError && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-400 mt-2">
                        {promoError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {!promoApplied && (
                    <p className="text-[10px] text-warm-gray/35 mt-1.5">Try: <span className="text-primary/50">CLUCK10</span></p>
                  )}
                </div>

                {/* Address */}
                <div className="flex items-center gap-3 py-3 border-b border-white/6 focus-within:border-primary/40 transition-colors">
                  <MapPin size={15} className="text-warm-gray shrink-0" />
                  <input
                    id="delivery-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter delivery address..."
                    className="flex-1 bg-transparent text-cream text-sm font-light focus:outline-none placeholder-warm-gray/30"
                  />
                </div>

                {/* Price breakdown */}
                <div className="space-y-3 text-sm font-light text-warm-gray">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-cream">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex justify-between text-green-400">
                      <span>Discount (10%)</span>
                      <span>-₹{discount}</span>
                    </motion.div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'text-primary font-bold tracking-[0.15em] uppercase text-[10px]' : 'text-cream'}>
                      {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span className="text-cream">₹{tax}</span>
                  </div>

                  <div className="pt-4 border-t border-white/6 flex justify-between items-end">
                    <span className="text-cream font-bold text-[10px] tracking-[0.2em] uppercase">Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="font-playfair font-semibold text-2xl text-primary leading-none"
                    >
                      ₹{total}
                    </motion.span>
                  </div>
                </div>

                {/* Order button */}
                <button
                  id="place-order"
                  onClick={handleOrder}
                  disabled={orderPlaced || !address.trim()}
                  className="w-full bg-gradient-to-r from-primary to-primary-light text-dark py-4.5 font-bold text-sm tracking-[0.15em] uppercase rounded-xl flex justify-center items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed group hover:shadow-[0_12px_35px_rgba(212,168,83,0.3)] transition-all duration-400 hover:-translate-y-0.5"
                >
                  {orderPlaced ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      Order Confirmed! 🎉
                    </motion.span>
                  ) : (
                    'Place Order'
                  )}
                </button>

                {subtotal < FREE_DELIVERY_THRESHOLD && (
                  <p className="text-center text-xs text-warm-gray font-light">
                    Add <span className="text-primary font-medium">₹{remaining}</span> more for <span className="text-primary font-medium">free delivery</span>
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
