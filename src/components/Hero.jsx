import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Flame, Clock, Truck, Star, ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -50, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.6 + i * 0.1,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Cinematic Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark" />

        {/* Multi-layer ambient orbs */}
        <div className="hero-glow -top-[15%] -left-[15%] animate-subtle-drift" />
        <div className="ambient-orb -bottom-[25%] -right-[10%] w-[900px] h-[900px] bg-primary/4" style={{ animationDelay: '5s' }} />
        <div className="ambient-orb top-[30%] left-[55%] w-[500px] h-[500px] bg-primary/3 animate-float-slow" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }} />

        {/* Noise texture */}
        <div className="noise-overlay" />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark to-transparent" />
      </div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full py-32 lg:py-0"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start max-w-2xl"
          >
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-4 mb-10"
            >
              <span className="w-10 h-[1px] bg-gradient-to-r from-primary to-transparent"></span>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary flex items-center gap-2">
                <Flame size={11} className="text-primary fill-primary animate-bounce-subtle" />
                A Culinary Experience
              </span>
            </motion.div>

            {/* Animated heading */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.08] mb-8 text-cream" style={{ wordSpacing: '0.15em' }}>
              {'The Art of'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                  style={{ marginRight: '0.35em' }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {'Flame & Flavor'.split(' ').map((word, i) => (
                <motion.span
                  key={`b-${i}`}
                  custom={i + 3}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-primary italic font-medium animate-text-glow"
                  style={{ marginRight: '0.35em' }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9 }}
              className="text-warm-gray text-base sm:text-lg leading-[1.8] mb-12 max-w-md font-light"
            >
              Experience the pinnacle of flame-grilled mastery. We deliver gourmet, artisanal chicken dishes right to your table — crafted with passion and precision.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.9 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Link
                to="/menu"
                className="group px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-dark font-bold rounded-xl flex items-center gap-3 transition-all duration-400 shadow-[0_12px_35px_rgba(212,168,83,0.2)] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(212,168,83,0.35)] animate-pulse-glow text-sm tracking-wide"
              >
                Order Collection
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <Link
                to="/menu"
                className="group px-8 py-4 font-semibold text-cream hover:text-primary transition-all duration-400 flex items-center gap-3 border border-white/12 rounded-xl hover:border-primary/40 hover:bg-primary/[0.03] backdrop-blur-sm text-sm"
              >
                <Play size={16} className="group-hover:scale-110 transition-transform duration-300" />
                View Menu
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.9 }}
              className="grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-lg border-t border-white/6 pt-8"
            >
              {[
                { icon: <Clock size={20} strokeWidth={1.5} />, value: '25 m', label: 'Delivery' },
                { icon: <Star size={20} strokeWidth={1.5} />, value: '4.9', label: 'Excellence' },
                { icon: <Truck size={20} strokeWidth={1.5} />, value: 'Free', label: 'Over ₹499' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + i * 0.12, duration: 0.8 }}
                  className="group cursor-default"
                >
                  <div className="flex items-center gap-3 mb-3 text-cream">
                    <span className="text-primary group-hover:scale-110 transition-transform duration-400">{stat.icon}</span>
                    <span className="font-playfair font-semibold text-2xl group-hover:text-primary transition-colors duration-400">{stat.value}</span>
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-warm-gray font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Decorative rings */}
            <div className="absolute -inset-10 border border-primary/8 rounded-full animate-rotate-slow pointer-events-none" />
            <div className="absolute -inset-20 border border-primary/4 rounded-full animate-rotate-slow pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />

            {/* Main Image Container */}
            <motion.div style={{ y: imageY }} className="relative w-full aspect-square max-w-[560px] ml-auto">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-primary/8 rounded-full blur-[100px] scale-70 pointer-events-none" />

              <div className="relative w-full h-full overflow-hidden rounded-[2rem] image-zoom-container bg-dark-card border border-white/8 shadow-[0_50px_100px_rgba(0,0,0,0.7)]">
                <img
                  src="https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&w=800&q=80"
                  alt="Gourmet Fried Chicken"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-dark/20 opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
              </div>

              {/* Floating Badge - Left */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-10 bottom-28 glass-card px-6 py-5 flex items-center gap-4 rounded-2xl"
              >
                <div className="w-13 h-13 flex items-center justify-center border border-primary/25 rounded-xl text-primary bg-primary/5">
                  <Flame size={22} strokeWidth={1.5} className="fill-primary/20" />
                </div>
                <div>
                  <p className="text-cream text-lg font-playfair font-semibold">Signature</p>
                  <p className="text-warm-gray text-[10px] tracking-[0.2em] uppercase mt-0.5">Collection</p>
                </div>
              </motion.div>

              {/* Floating Badge - Top Right */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-5 -right-5 glass-card px-5 py-3.5 rounded-2xl flex items-center gap-3"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-primary fill-primary" />
                  ))}
                </div>
                <span className="text-cream font-bold text-sm">4.9</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 z-10"
      >
        <span className="text-[8px] tracking-[0.35em] uppercase text-warm-gray font-bold">Discover</span>
        <span className="w-[1px] h-14 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  )
}
