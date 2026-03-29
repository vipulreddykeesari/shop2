import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Food Critic',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'The flame-grilled thighs are absolutely divine. A true masterclass in culinary balance. The smoky undertones are unmatched and the presentation is flawless.',
  },
  {
    name: 'Rahul Kapoor',
    role: 'Gastronomy Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'A transcendent dining experience. We have been ordering from Rahman Chicken Center for over two years, and the consistency in quality and flavor is nothing short of remarkable.',
  },
  {
    name: 'Ananya Patel',
    role: 'Lifestyle Editor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Their tandoori-spiced cuts redefine comfort food. Exquisite flavor profiles delivered with the sophistication of a fine-dining establishment. Highly recommended.',
  },
  {
    name: 'Vikram Singh',
    role: 'Chef & Restaurateur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'As a fellow chef, I am blown away by the depth of flavor they achieve. The spice blends are impeccable and the grilling technique is world-class. Bravo!',
  },
  {
    name: 'Meera Joshi',
    role: 'Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: "Every visit to Rahman Chicken Center is an event. My followers absolutely love their Nashville Hot Burger — it's become one of my most requested reviews of all time.",
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const maxIndex = testimonials.length - 1

  const goTo = (index) => {
    setCurrent(Math.max(0, Math.min(index, maxIndex)))
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused, maxIndex])

  return (
    <section className="relative py-28 overflow-hidden bg-dark">
      {/* Background */}
      <div className="noise-overlay" />
      <div className="ambient-orb -left-[12%] top-[15%] w-[700px] h-[700px] bg-primary/4" />
      <div className="section-divider absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
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
              Patron Reviews
            </span>
            <span className="w-14 h-[1px] bg-gradient-to-l from-transparent to-primary/40"></span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl text-cream mb-6">
            Words of <span className="text-primary italic font-medium">Appreciation</span>
          </h2>
          <p className="text-warm-gray text-base max-w-xl mx-auto font-light leading-relaxed">
            Discover why our discerning guests return time and again for the unforgettable culinary art we serve.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => goTo(current - 1)}
            className={`absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl border border-white/8 flex items-center justify-center text-warm-gray hover:text-cream hover:border-primary/40 hover:bg-white/4 transition-all duration-300 ${current === 0 ? 'opacity-20 pointer-events-none' : ''}`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className={`absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl border border-white/8 flex items-center justify-center text-warm-gray hover:text-cream hover:border-primary/40 hover:bg-white/4 transition-all duration-300 ${current === maxIndex ? 'opacity-20 pointer-events-none' : ''}`}
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards container */}
          <div className="overflow-hidden mx-8 sm:mx-16">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${current * (100 / 3)}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 * i }}
                >
                  <div className="premium-card rounded-2xl p-7 sm:p-8 group relative flex flex-col h-full min-h-[310px]">
                    {/* Huge decorative quote */}
                    <div className="absolute top-2 right-5 text-[160px] leading-none text-white/[0.015] font-playfair group-hover:text-primary/[0.04] transition-colors duration-700 pointer-events-none select-none">
                      "
                    </div>

                    {/* Quote icon */}
                    <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/12 flex items-center justify-center mb-5">
                      <Quote size={16} className="text-primary" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4 relative z-10">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} size={13} className="text-primary fill-primary" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-cream/85 text-sm leading-[1.8] mb-7 relative z-10 font-light grow">
                      "{t.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 mt-auto relative z-10 pt-5 border-t border-white/5">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/15 group-hover:border-primary/40 transition-colors duration-500">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-full h-full object-cover filter grayscale-[60%] group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <div>
                        <p className="font-playfair text-base text-cream tracking-wide group-hover:text-primary transition-colors duration-400">{t.name}</p>
                        <p className="text-warm-gray text-[10px] tracking-[0.18em] uppercase mt-0.5 font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2.5 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === current
                    ? 'w-10 h-2.5 bg-gradient-to-r from-primary to-primary-light'
                    : 'w-2.5 h-2.5 bg-white/8 hover:bg-white/15'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <span className="text-[9px] tracking-[0.2em] uppercase text-warm-gray/40 font-medium">
              {isPaused ? 'Paused' : 'Auto-playing'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
