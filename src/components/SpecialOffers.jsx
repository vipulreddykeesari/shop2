import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function CountdownTimer({ targetHours = 23 }) {
  const [time, setTime] = useState({ hours: targetHours, minutes: 59, seconds: 59 })

  useEffect(() => {
    const endTime = Date.now() + (time.hours * 3600 + time.minutes * 60 + time.seconds) * 1000
    const timer = setInterval(() => {
      const diff = endTime - Date.now()
      if (diff <= 0) {
        clearInterval(timer)
        return
      }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTime({ hours: h, minutes: m, seconds: s })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n) => n.toString().padStart(2, '0')

  return (
    <div className="flex items-center gap-3">
      {[
        { val: pad(time.hours), label: 'HRS' },
        { val: pad(time.minutes), label: 'MIN' },
        { val: pad(time.seconds), label: 'SEC' },
      ].map((t, i) => (
        <div key={t.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="font-playfair text-3xl sm:text-4xl font-semibold text-cream tabular-nums w-14 text-center bg-dark rounded-xl py-2.5 border border-white/6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
              {t.val}
            </span>
            <span className="text-[8px] tracking-[0.25em] uppercase text-warm-gray mt-2.5 font-bold">{t.label}</span>
          </div>
          {i < 2 && <span className="text-primary text-2xl font-bold mb-4">:</span>}
        </div>
      ))}
    </div>
  )
}

export default function SpecialOffers() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="relative py-20 overflow-hidden bg-dark">
      <div className="noise-overlay" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-card via-dark-card to-dark-card/80" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&w=800&q=80"
              alt="Special Offer"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-card via-dark-card/70 to-transparent" />
          </div>

          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl border border-primary/8 pointer-events-none" />
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary/15 via-transparent to-primary/8 opacity-50 blur-sm pointer-events-none" style={{animation: 'border-glow-anim 4s ease-in-out infinite'}} />

          {/* Content */}
          <div className="relative z-10 px-7 py-14 sm:px-14 sm:py-18">
            <div className="max-w-xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-9"
              >
                <Sparkles size={13} />
                Limited Time Offer
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-medium text-cream mb-5 leading-tight"
              >
                Family Feast
                <br />
                <span className="text-primary italic animate-text-glow">30% Off</span> Today
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-warm-gray text-base font-light leading-[1.8] mb-10"
              >
                Gather your loved ones for an unforgettable feast. 8-piece grilled chicken,
                4 premium sides, artisan breads and our signature dips — all at a special price.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-12"
              >
                <p className="text-[10px] tracking-[0.25em] uppercase text-warm-gray mb-5 font-bold flex items-center gap-2">
                  <Clock size={13} className="text-primary" />
                  Offer Ends In
                </p>
                <CountdownTimer targetHours={12} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap items-center gap-8"
              >
                <Link
                  to="/menu"
                  className="group px-9 py-4.5 bg-gradient-to-r from-primary to-primary-light text-dark font-bold rounded-2xl flex items-center gap-3 transition-all duration-400 shadow-[0_12px_35px_rgba(212,168,83,0.2)] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(212,168,83,0.35)] animate-pulse-glow tracking-wide"
                >
                  Order Now
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-warm-gray line-through text-lg">₹1,299</span>
                  <span className="text-primary font-playfair text-3xl sm:text-4xl font-semibold">₹909</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
