import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Flame, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const featured = [
  {
    id: 1,
    name: 'Smoky Flame-Grilled Thighs',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=600&q=80',
    price: 349,
    rating: 4.9,
    tag: 'Signature',
    desc: 'Slow-grilled over charcoal with our secret spice blend',
  },
  {
    id: 4,
    name: 'The Big Rahman Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    price: 399,
    rating: 4.9,
    tag: "Chef's Pick",
    desc: 'Crispy chicken patty with smoky BBQ & aged cheddar',
  },
  {
    id: 3,
    name: 'Firecracker Hot Wings',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=600&q=80',
    price: 279,
    rating: 4.7,
    tag: 'Spicy',
    desc: 'Blazing wings tossed in habanero glaze',
  },
  {
    id: 7,
    name: 'Tandoori Grilled Breast',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    price: 379,
    rating: 4.8,
    tag: 'Healthy',
    desc: 'Herb-marinated with tandoori spices, grilled fresh',
  },
]

function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2200
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="font-playfair font-light text-5xl sm:text-6xl text-cream tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function FeaturedSection() {
  const scrollRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="relative py-28 overflow-hidden bg-dark">
      {/* Background */}
      <div className="noise-overlay" />
      <div className="ambient-orb bottom-0 left-[15%] w-[700px] h-[700px] bg-primary/4" />
      <div className="section-divider absolute top-0 left-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Stats Counter Row */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24"
        >
          {[
            { value: 50, suffix: 'K+', label: 'Orders Delivered' },
            { value: 4.9, suffix: '', label: 'Customer Rating' },
            { value: 25, suffix: ' min', label: 'Avg. Delivery' },
            { value: 12, suffix: '+', label: 'Years of Legacy' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              className="text-center py-10 px-5 rounded-2xl bg-dark-card border border-white/4 group hover:-translate-y-2 transition-all duration-600 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{boxShadow: 'inset 0 1px 0 rgba(212,168,83,0.1)'}} />
              <div className="relative z-10">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-warm-gray text-[9px] font-bold tracking-[0.25em] uppercase mt-5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Dishes Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-[1px] bg-gradient-to-r from-primary/50 to-transparent"></span>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">
                Fan Favorites
              </span>
            </div>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-medium text-cream leading-tight">
              Most <span className="text-primary italic">Loved</span> Dishes
            </h2>
          </div>
          <Link
            to="/menu"
            className="group flex items-center gap-3 px-7 py-3.5 border border-white/8 rounded-2xl hover:border-primary/40 text-cream hover:text-primary transition-all duration-400 text-sm font-medium tracking-wide hover:bg-primary/[0.03]"
          >
            View Full Menu
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Horizontal Scroll Gallery */}
        <div
          ref={scrollRef}
          className="flex gap-7 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group flex-shrink-0 w-[280px] sm:w-[320px] snap-start"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-dark-card border border-white/4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-85" />

                {/* Tag */}
                <div className="absolute top-5 left-5 px-3.5 py-1.5 bg-gradient-to-r from-primary to-primary-light text-dark text-[9px] font-extrabold uppercase tracking-[0.15em] rounded-lg shadow-[0_4px_15px_rgba(212,168,83,0.3)]">
                  {item.tag}
                </div>

                {/* Rating */}
                <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-full">
                  <Star size={10} className="text-primary fill-primary" />
                  <span className="text-[11px] font-bold text-cream">{item.rating}</span>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="font-playfair text-xl font-semibold text-cream mb-2 group-hover:text-primary transition-colors duration-400">
                    {item.name}
                  </h3>
                  <p className="text-warm-gray text-xs font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-playfair font-semibold text-primary">₹{item.price}</span>
                    <Link
                      to="/menu"
                      className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-light text-dark opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 hover:scale-105 shadow-[0_8px_20px_rgba(212,168,83,0.3)]"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
