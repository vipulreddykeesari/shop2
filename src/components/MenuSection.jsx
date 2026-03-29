import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plus, Flame, Star, ShoppingBag, ArrowRight, X, LayoutGrid, List } from 'lucide-react'

const categories = ['All', 'Whole Bird', 'Boneless', 'Curry Cut', 'Specialty', 'Combo']

const menuItems = [
  {
    id: 1,
    name: 'Farm Fresh Whole Chicken',
    description: 'Whole chicken with skin, thoroughly cleaned. Perfect for roasting or traditional recipes.',
    price: 349, category: 'Whole Bird', badge: 'Signature', rating: 4.9, emoji: '🐔',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
    weight: '1.2 kg', pieces: '1 pc', origin: 'Farm',
  },
  {
    id: 2,
    name: 'Premium Boneless Breast',
    description: 'Tender, skinless and boneless chicken breast fillets. High in protein, low in fat.',
    price: 299, category: 'Boneless', badge: 'Popular', rating: 4.8, emoji: '🥩',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80',
    weight: '500g', pieces: '3-4 pcs', origin: 'Farm',
  },
  {
    id: 3,
    name: 'Chicken Curry Cut (Small)',
    description: 'Skinless chicken cut into small bite-sized pieces. Perfect for Indian curries.',
    price: 189, category: 'Curry Cut', badge: 'Top Seller', rating: 4.7, emoji: '🔪',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
    weight: '500g', pieces: '14-16 pcs', origin: 'Farm',
  },
  {
    id: 4,
    name: 'Tender Chicken Drumsticks',
    description: 'Fresh, succulent chicken lower leg joints. Ideal for grilling or deep frying.',
    price: 249, category: 'Whole Bird', rating: 4.8, emoji: '🍗',
    image: 'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?auto=format&fit=crop&w=800&q=80',
    weight: '500g', pieces: '5-6 pcs', origin: 'Farm',
  },
  {
    id: 5,
    name: 'Chicken Keema (Mince)',
    description: 'Freshly minced premium boneless chicken. Best for kebabs and meatballs.',
    price: 279, category: 'Specialty', badge: 'Fresh', rating: 4.9, emoji: '🥩',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80',
    weight: '500g', pieces: 'Minced', origin: 'Farm',
  },
  {
    id: 6,
    name: 'Chicken Liver & Gizzard',
    description: 'Hygienically cleaned and cut chicken liver and gizzard. Rich in iron.',
    price: 119, category: 'Specialty', rating: 4.6, emoji: '🩸',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
    weight: '500g', pieces: '15-20 pcs', origin: 'Farm',
  },
  {
    id: 7,
    name: 'Chicken Soup Bones',
    description: 'Fresh chicken bones rich in marrow, perfect for hearty and healthy broths.',
    price: 99, category: 'Specialty', badge: 'Value', rating: 4.5, emoji: '🥣',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80',
    weight: '500g', pieces: 'Bones', origin: 'Farm',
  },
  {
    id: 8,
    name: 'Weekend Feast Combo',
    description: '1kg Curry Cut, 500g Breast, 500g Drumsticks. Perfect for a family gathering.',
    price: 899, category: 'Combo', rating: 4.9, badge: 'Saving', emoji: '🎉',
    image: 'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?auto=format&fit=crop&w=800&q=80',
    weight: '2.0 kg', pieces: 'Assorted', origin: 'Farm',
  },
]

const badgeColors = {
  Signature: 'bg-gradient-to-r from-primary to-primary-light border-primary-light text-dark',
  Popular: 'bg-cream border-white/40 text-dark',
  'Top Seller': 'bg-[#991b1b] border-[#ef4444] text-white',
  Fresh: 'bg-[#166534] border-[#22c55e] text-white',
  Value: 'bg-dark-card border-primary text-primary',
  Saving: 'bg-accent border-white/20 text-dark',
  Classic: 'bg-white/8 border-white/15 text-cream',
}

function QuickViewModal({ item, onClose, onAddToCart }) {
  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto overflow-hidden rounded-tl-[1.5rem] rounded-bl-none md:rounded-bl-[1.5rem] rounded-tr-[1.5rem] md:rounded-tr-none">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
            {item.badge && (
              <div className={`absolute top-5 left-5 px-3.5 py-1.5 ${badgeColors[item.badge]} border text-[9px] font-extrabold uppercase tracking-[0.15em] rounded-lg shadow-xl`}>
                {item.badge}
              </div>
            )}
          </div>

          <div className="p-9 sm:p-11 flex flex-col">
            <button
              onClick={onClose}
              className="self-end w-9 h-9 rounded-xl flex items-center justify-center text-warm-gray hover:text-cream hover:bg-white/5 transition-colors -mt-2 -mr-2 mb-5"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(item.rating) ? 'text-primary fill-primary' : 'text-white/8'} />
                ))}
              </div>
              <span className="text-warm-gray text-sm">{item.rating}</span>
            </div>

            <h2 className="font-playfair text-3xl font-semibold text-cream mb-5">{item.name}</h2>
            <p className="text-warm-gray text-sm leading-relaxed font-light mb-9 flex-grow">{item.description}</p>

            <div className="flex flex-wrap gap-3 mb-9">
              {[
                { label: item.weight, icon: '⚖️' },
                { label: item.pieces, icon: '🔪' },
                { label: item.category, icon: '📂' },
              ].map((d) => (
                <span key={d.label} className="px-3.5 py-2 bg-dark-surface rounded-xl text-xs text-warm-gray border border-white/4 font-light">
                  {d.icon} {d.label}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-7 border-t border-white/8">
              <span className="text-3xl font-playfair font-semibold text-primary">₹{item.price}</span>
              <button
                onClick={() => { onAddToCart(item); onClose() }}
                className="flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-primary to-primary-light text-dark font-bold rounded-xl transition-all duration-400 hover:-translate-y-1 shadow-[0_12px_30px_rgba(212,168,83,0.2)] tracking-wide"
              >
                <ShoppingBag size={17} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MenuSection({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [quickViewItem, setQuickViewItem] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory)

  const getCategoryCount = (cat) => {
    if (cat === 'All') return menuItems.length
    return menuItems.filter((item) => item.category === cat).length
  }

  return (
    <section id="menu" className="relative py-28 overflow-hidden bg-dark">
      <div className="noise-overlay" />
      <div className="ambient-orb top-0 right-0 w-[900px] h-[900px] bg-primary/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-14 h-[1px] bg-gradient-to-r from-transparent to-primary/40"></span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">
              Culinary Collection
            </span>
            <span className="w-14 h-[1px] bg-gradient-to-l from-transparent to-primary/40"></span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-medium text-cream mb-6 leading-tight">
            Our <span className="text-primary italic">Signature</span> Menu
          </h2>
          <p className="text-warm-gray text-base max-w-xl mx-auto font-light leading-relaxed">
            Indulge in our carefully curated selection of flame-grilled classics and elegant favorites.
          </p>
        </motion.div>

        {/* Category Filter + View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-xl ${
                    isActive ? 'text-primary' : 'text-warm-gray hover:text-cream'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-primary/8 border border-primary/15 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {cat}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary/15 text-primary' : 'bg-white/4 text-warm-gray'}`}>
                      {getCategoryCount(cat)}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-card border border-white/4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-br from-primary to-primary-light text-dark' : 'text-warm-gray hover:text-cream'}`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-br from-primary to-primary-light text-dark' : 'text-warm-gray hover:text-cream'}`}
            >
              <List size={15} />
            </button>
          </div>
        </motion.div>

        {/* Menu Grid / List */}
        <motion.div
          layout
          className={viewMode === 'grid'
            ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10'
            : 'flex flex-col gap-4'
          }
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              viewMode === 'grid' ? (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col h-full"
                >
                  <div
                    className="relative w-full aspect-square overflow-hidden rounded-2xl mb-5 bg-dark-card border border-white/4 cursor-pointer"
                    onClick={() => setQuickViewItem(item)}
                  >
                    {item.badge && (
                      <div className={`absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg ${badgeColors[item.badge]} border text-[9px] font-extrabold uppercase tracking-[0.12em] shadow-xl`}>
                        {item.badge}
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-full">
                      <Star size={10} className="text-primary fill-primary" />
                      <span className="text-[11px] font-bold text-cream">{item.rating}</span>
                    </div>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform transition-transform duration-[1.2s] group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-60" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-dark/45 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                      <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(item) }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-light text-dark font-bold tracking-wide rounded-xl transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-[0_10px_30px_rgba(212,168,83,0.3)] text-sm"
                      >
                        <ShoppingBag size={15} />
                        Add
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setQuickViewItem(item) }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/8 text-cream font-medium rounded-xl hover:bg-white/15 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm backdrop-blur-sm"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow px-1">
                    <h3 className="font-playfair text-lg font-semibold text-cream leading-tight group-hover:text-primary transition-colors duration-400 mb-2">
                      {item.name}
                    </h3>

                    <p className="text-warm-gray text-sm leading-relaxed mb-5 font-light flex-grow line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-auto border-t border-white/6 pt-4 flex justify-between items-end">
                      <div className="flex items-center gap-1.5 text-warm-gray">
                        <span className="text-[10px] font-medium tracking-wide border border-white/10 px-2 py-0.5 rounded-md">{item.weight}</span>
                        <span className="text-[10px] font-medium tracking-wide border border-white/10 px-2 py-0.5 rounded-md">{item.pieces}</span>
                      </div>
                      <span className="text-2xl font-playfair font-semibold text-primary">₹{item.price}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="group flex gap-6 p-5 rounded-2xl bg-dark-card border border-white/4 hover:border-primary/15 transition-all duration-500 cursor-pointer"
                  onClick={() => setQuickViewItem(item)}
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-dark border border-white/4">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-playfair text-lg font-semibold text-cream group-hover:text-primary transition-colors truncate">{item.name}</h3>
                        {item.badge && (
                          <span className={`shrink-0 px-2.5 py-0.5 ${badgeColors[item.badge]} border text-[8px] font-extrabold uppercase tracking-[0.12em] rounded-md`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-warm-gray text-sm font-light line-clamp-1 hidden sm:block">{item.description}</p>
                    </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-warm-gray font-medium tracking-wide border border-white/10 px-2.5 py-1 rounded-md">{item.weight}</span>
                        <span className="text-[10px] text-warm-gray font-medium tracking-wide border border-white/10 px-2.5 py-1 rounded-md">{item.pieces}</span>
                      </div>
                  </div>

                  <div className="flex flex-col items-end justify-between py-1 shrink-0">
                    <span className="text-2xl font-playfair font-semibold text-primary">₹{item.price}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onAddToCart(item) }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary/8 border border-primary/15 text-primary text-xs font-bold rounded-xl hover:bg-gradient-to-r hover:from-primary hover:to-primary-light hover:text-dark transition-all duration-300 tracking-wide"
                    >
                      <Plus size={13} />
                      Add
                    </button>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {quickViewItem && (
          <QuickViewModal
            item={quickViewItem}
            onClose={() => setQuickViewItem(null)}
            onAddToCart={onAddToCart}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
