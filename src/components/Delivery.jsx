import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Clock, Truck, Shield, ChevronRight, Package, Zap, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    step: '01',
    icon: <Sparkles size={24} strokeWidth={1.5} />,
    title: 'Culinary Selection',
    description: 'Explore our finely curated menu and select your desired masterpieces from our collection.',
  },
  {
    step: '02',
    icon: <MapPin size={24} strokeWidth={1.5} />,
    title: 'Destination',
    description: 'Provide your details. We deliver across the entire metropolitan area with precision.',
  },
  {
    step: '03',
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: 'Preparation',
    description: 'Your order is crafted fresh by our master chefs with the finest premium ingredients.',
  },
  {
    step: '04',
    icon: <Package size={24} strokeWidth={1.5} />,
    title: 'Doorstep Arrival',
    description: 'Prompt, elegant delivery brings the complete fine-dining experience to your door.',
  },
]

const features = [
  {
    icon: <Truck size={28} strokeWidth={1.5} />,
    title: 'Complimentary Delivery',
    description: 'Enjoy free delivery on all orders above ₹499. Elevate your evening without extra costs.',
    highlight: '₹499+',
  },
  {
    icon: <Clock size={28} strokeWidth={1.5} />,
    title: 'Precision Timing',
    description: 'Our logistics ensure your meal arrives exactly at the optimal temperature, every time.',
    highlight: '25 min',
  },
  {
    icon: <MapPin size={28} strokeWidth={1.5} />,
    title: 'Real-time Tracking',
    description: 'Monitor the journey of your order from our kitchen directly to your dining table.',
    highlight: 'Live GPS',
  },
  {
    icon: <Shield size={28} strokeWidth={1.5} />,
    title: 'Impeccable Packaging',
    description: 'Tamper-proof, elegant packaging preserves the integrity and warmth of every dish.',
    highlight: 'Sealed',
  },
]

export default function Delivery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="delivery" className="relative py-28 overflow-hidden bg-dark">
      {/* Background */}
      <div className="noise-overlay" />
      <div className="ambient-orb top-0 right-0 w-[600px] h-[600px] bg-primary/4" />
      <div className="ambient-orb bottom-0 left-0 w-[500px] h-[500px] bg-primary/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-14 h-[1px] bg-gradient-to-r from-transparent to-primary/40"></span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">
              Home Dining
            </span>
            <span className="w-14 h-[1px] bg-gradient-to-l from-transparent to-primary/40"></span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-medium text-cream mb-5 leading-tight">
            The Restaurant Experience, <br />
            <span className="text-primary italic">At Your Door</span>
          </h2>
          <p className="text-warm-gray text-base max-w-xl mx-auto font-light leading-relaxed">
            We've perfected the art of delivery so you can enjoy our premium charcoal-grilled specialties in the comfort of your own home.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-28 relative">
          <div className="hidden lg:block absolute top-[4.5rem] left-[12%] w-[76%] h-[1px] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-primary/20 via-primary to-primary/20"
            />
          </div>

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="h-full relative z-10 bg-dark-card rounded-2xl p-9 border border-white/4 hover:border-primary/15 transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-9">
                  <div className="w-14 h-14 rounded-2xl bg-dark border border-white/8 flex items-center justify-center text-primary group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500">
                    {s.icon}
                  </div>
                  <span className="font-playfair text-4xl font-light text-white/4 group-hover:text-primary/8 transition-colors">{s.step}</span>
                </div>

                <h3 className="font-playfair font-semibold text-cream text-xl mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed font-light">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 gap-5 mb-28">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              className="bg-dark-card rounded-2xl p-9 flex items-start gap-6 border border-white/4 hover:border-primary/15 transition-all duration-500 group relative overflow-hidden hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 p-4 rounded-2xl border border-white/8 text-cream group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500 shrink-0">
                {feat.icon}
              </div>
              <div className="relative z-10 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-playfair font-medium text-cream text-xl group-hover:text-primary transition-colors duration-500">{feat.title}</h4>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-primary font-bold bg-primary/8 px-2.5 py-1 rounded-full">{feat.highlight}</span>
                </div>
                <p className="text-warm-gray text-sm leading-relaxed font-light">{feat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-white/6"
        >
          <div className="absolute inset-0 bg-dark-card" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-[0.05] mix-blend-screen" />
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary/12 via-transparent to-primary/8 opacity-40 blur-sm pointer-events-none" />

          <div className="relative z-10 px-9 py-18 sm:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-2xl">
              <h3 className="text-4xl sm:text-5xl font-medium text-cream mb-7 font-playfair leading-tight">
                Reservations & <br className="hidden sm:block" />
                <span className="text-primary italic">Private Dining</span>
              </h3>
              <p className="text-warm-gray text-lg font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Planning an intimate gathering? Let our chefs curate a customized menu delivered with impeccable service and elegance.
              </p>
            </div>

            <Link
              to="/contact"
              className="group shrink-0 px-9 py-5 bg-gradient-to-r from-primary to-primary-light text-dark font-bold tracking-wide rounded-2xl transition-all duration-400 flex items-center gap-3 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(212,168,83,0.3)]"
            >
              Inquire Now
              <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
