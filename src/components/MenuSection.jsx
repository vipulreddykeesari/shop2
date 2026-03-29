import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plus, Flame, Star, ShoppingBag, ArrowRight, X, LayoutGrid, List } from 'lucide-react'

const categories = ['All', 'Grilled', 'Fried', 'Wings', 'Burgers', 'Sides', 'Combos']

const menuItems = [
  {
    id: 1,
    name: 'Smoky Flame-Grilled Thighs',
    description: 'Bone-in culinary thighs marinated in our secret smoky spice blend, slow-grilled over charcoal.',
    price: 349, category: 'Grilled', badge: 'Signature', rating: 4.9, emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80',
    spicy: 2, prep: '20 min', calories: '380 cal',
  },
  {
    id: 2,
    name: 'Golden Crispy Drumsticks',
    description: 'Classic drumsticks double-coated in seasoned flour and fried to a perfect golden crunch.',
    price: 299, category: 'Fried', badge: 'Popular', rating: 4.8, emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&w=800&q=80',
    spicy: 1, prep: '15 min', calories: '420 cal',
  },
  {
    id: 3,
    name: 'Firecracker Hot Wings',
    description: 'Blazing hot wings tossed in our signature habanero glaze with a fiery kick.',
    price: 279, category: 'Wings', badge: 'Spicy', rating: 4.7, emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    spicy: 3, prep: '18 min', calories: '350 cal',
  },
  {
    id: 4,
    name: 'The Big Cluck Burger',
    description: 'Crispy chicken patty, smoky BBQ sauce, aged cheddar, lettuce & pickles on a brioche bun.',
    price: 399, category: 'Burgers', badge: 'Chef Selection', rating: 4.9, emoji: '🍔',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    spicy: 1, prep: '22 min', calories: '560 cal',
  },
  {
    id: 5,
    name: 'Honey Garlic Wings',
    description: 'Tender wings glazed with a sweet honey garlic sauce and toasted sesame seeds.',
    price: 299, category: 'Wings', rating: 4.8, emoji: '🍗',
    image: 'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?auto=format&fit=crop&w=800&q=80',
    spicy: 0, prep: '16 min', calories: '340 cal',
  },
  {
    id: 6,
    name: 'Loaded Chicken Fries',
    description: 'Crispy seasoned fries topped with shredded chicken, truffle cheese sauce, and jalapeños.',
    price: 249, category: 'Sides', rating: 4.6, emoji: '🍟',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    spicy: 1, prep: '12 min', calories: '480 cal',
  },
  {
    id: 7,
    name: 'Tandoori Grilled Breast',
    description: 'Herb-marinated chicken breast with tandoori spices, grilled to smoky perfection.',
    price: 379, category: 'Grilled', badge: 'Light', rating: 4.8, emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    spicy: 2, prep: '25 min', calories: '260 cal',
  },
  {
    id: 8,
    name: 'Family Feast Combo',
    description: '8pc grilled chicken, 4 sides, artisan breads and dips. Perfect for gatherings.',
    price: 1299, category: 'Combos', rating: 4.9, badge: 'Value', emoji: '🎉',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    spicy: 1, prep: '30 min', calories: '1800 cal',
  },
  {
    id: 9,
    name: 'Peri-Peri Chicken Wrap',
    description: 'Grilled chicken strips with peri-peri glaze, fresh greens, wrapped in flatbread.',
    price: 229, category: 'Sides', rating: 4.7, emoji: '🌯',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    spicy: 2, prep: '14 min', calories: '320 cal',
  },
  {
    id: 10,
    name: 'Southern Fried Bucket',
    description: '6pc southern-style fried chicken, extra crispy with our signature 12-spice blend.',
    price: 599, category: 'Fried', badge: 'Classic', rating: 4.8, emoji: '🪣',
    image: 'https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17?auto=format&fit=crop&w=800&q=80',
    spicy: 1, prep: '25 min', calories: '950 cal',
  },
  {
    id: 11,
    name: 'Spicy BBQ Grilled Combo',
    description: '2pc grilled chicken, truffle fries, house slaw. The perfect culinary meal deal.',
    price: 449, category: 'Combos', rating: 4.9, emoji: '🍱',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    spicy: 2, prep: '20 min', calories: '720 cal',
  },
  {
    id: 12,
    name: 'Nashville Hot Burger',
    description: 'Extra spicy Nashville chicken, pickled slaw, pepper jack cheese on toasted brioche.',
    price: 429, category: 'Burgers', badge: 'Spicy', rating: 4.7, emoji: '🍔',
    image: 'https://plus.unsplash.com/premium_photo-1683619761464-6da4668b5a04?auto=format&fit=crop&w=800&q=80',
    spicy: 3, prep: '22 min', calories: '590 cal',
  },
]

const badgeColors = {
  Signature: 'bg-gradient-to-r from-primary to-primary-light border-primary-light text-dark',
  Popular: 'bg-cream border-white/40 text-dark',
  Spicy: 'bg-[#991b1b] border-[#ef4444] text-white',
  'Chef Selection': 'bg-dark-card border-primary text-primary',
  Light: 'bg-[#166534] border-[#22c55e] text-white',
  Value: 'bg-accent border-white/20 text-dark',
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
                { label: item.prep, icon: '⏱️' },
                { label: item.calories, icon: '🔥' },
                { label: item.category, icon: '📂' },
              ].map((d) => (
                <span key={d.label} className="px-3.5 py-2 bg-dark-surface rounded-xl text-xs text-warm-gray border border-white/4 font-light">
                  {d.icon} {d.label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-9">
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-gray font-bold">Heat Level</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, idx) => (
                  <Flame key={idx} size={14} className={idx < item.spicy ? 'text-primary fill-primary' : 'text-white/8'} />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-7 border-t border-white/8">
              <span className="text-3xl font-playfair font-semibold text-primary">₹{item.price}</span>
              <button
                onClick={() => { onAddToCart(item); onClose() }}
                className="flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-primary to-primary-light text-dark font-bold rounded-xl transition-all duration-400 hover:-translate-y-1 shadow-[0_12px_30px_rgba(212,168,83,0.2)] tracking-wide"
              >
                <ShoppingBag size={17} />
                Add to Order
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
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] uppercase tracking-[0.2em] text-warm-gray mr-0.5 font-bold">Heat</span>
                        <div className="flex gap-0.5">
                          {[...Array(3)].map((_, idx) => (
                            <Flame key={idx} size={11} className={idx < item.spicy ? 'text-primary fill-primary' : 'text-white/8'} />
                          ))}
                        </div>
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
                    <div className="flex items-center gap-6 mt-2">
                      <div className="flex gap-0.5">
                        {[...Array(3)].map((_, idx) => (
                          <Flame key={idx} size={11} className={idx < item.spicy ? 'text-primary fill-primary' : 'text-white/8'} />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-primary fill-primary" />
                        <span className="text-xs text-warm-gray">{item.rating}</span>
                      </div>
                      <span className="text-xs text-warm-gray font-light">{item.prep}</span>
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
