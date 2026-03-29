import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Users, Utensils, Heart, Flame, Leaf, HeartHandshake } from 'lucide-react'

const stats = [
  { icon: <Users size={24} strokeWidth={1.5} />, target: 50, suffix: 'K+', label: 'Happy Customers' },
  { icon: <Utensils size={24} strokeWidth={1.5} />, target: 35, suffix: '+', label: 'Menu Items' },
  { icon: <Award size={24} strokeWidth={1.5} />, target: 12, suffix: '', label: 'Years of Excellence' },
  { icon: <Heart size={24} strokeWidth={1.5} />, target: 4.9, suffix: '', label: 'Average Rating' },
]

const values = [
  {
    icon: <Flame size={24} strokeWidth={1.5} />,
    title: 'Flame-Grilled Fresh',
    description: 'Every piece is marinated for 24 hours and grilled over real charcoal for that authentic, sophisticated smoky flavor.',
  },
  {
    icon: <Leaf size={24} strokeWidth={1.5} />,
    title: 'Premium Ingredients',
    description: 'We source only the freshest, locally-raised poultry and pure organic herbs. No shortcuts in our kitchen, ever.',
  },
  {
    icon: <HeartHandshake size={24} strokeWidth={1.5} />,
    title: 'Crafted with Passion',
    description: 'Our family recipes have been perfected over three generations, bringing you timeless flavors elevated to modern standards.',
  },
]

const timeline = [
  { year: '2014', title: 'The Beginning', text: 'A small kitchen, a big dream — Cluck & Grill was born from a family recipe and a passion for perfection.' },
  { year: '2017', title: 'First Award', text: "Recognized as the city's best flame-grilled restaurant, earning our first culinary excellence award." },
  { year: '2020', title: 'Going Digital', text: 'Launched online ordering and home delivery, bringing our premium dining experience directly to your doorstep.' },
  { year: '2024', title: 'National Recognition', text: 'Named among the top 50 restaurants in the country. Opened our flagship store featuring a live grill experience.' },
]

function AnimatedCounter({ target, suffix = '' }) {
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
        setCount(Number.isInteger(target) ? Math.floor(start) : parseFloat(start.toFixed(1)))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="text-4xl font-playfair font-light text-cream tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="relative py-28 overflow-hidden bg-dark">
      {/* Background */}
      <div className="noise-overlay" />
      <div className="ambient-orb top-20 left-[8%] w-[700px] h-[700px] bg-primary/4" />
      <div className="ambient-orb bottom-20 right-[8%] w-[700px] h-[700px] bg-primary/3" />

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
              Our Heritage
            </span>
            <span className="w-14 h-[1px] bg-gradient-to-l from-transparent to-primary/40"></span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-medium text-cream mb-6 leading-tight">
            The Story of <span className="text-primary italic">Cluck & Grill</span>
          </h2>
          <p className="text-warm-gray text-base max-w-xl mx-auto font-light leading-relaxed">
            Born from a passion for perfection, we've been serving the most exquisite,
            flame-grilled culinary creations for over a decade.
          </p>
        </motion.div>

        {/* Main Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl">
              <div className="rounded-2xl overflow-hidden bg-dark h-[500px] sm:h-[600px] relative image-zoom-container">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80"
                  alt="Our Culinary Kitchen"
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent mix-blend-multiply" />

                <div className="absolute bottom-10 left-10 right-10 border-l-2 border-primary pl-7">
                  <h3 className="font-playfair text-3xl font-medium text-cream mb-2">Passion in Every Detail</h3>
                  <p className="text-warm-gray text-sm tracking-[0.2em] uppercase font-medium">Since 2014</p>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -right-4 glass-card px-9 py-7 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
            >
              <div className="w-14 h-14 rounded-xl border border-primary/30 text-primary flex items-center justify-center mx-auto mb-3 bg-primary/5">
                <Award size={24} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-playfair font-semibold text-cream text-center tracking-wide">Award Winning</p>
              <p className="text-[8px] text-warm-gray uppercase tracking-[0.2em] text-center mt-1 font-bold">Culinary Excellence</p>
            </motion.div>
          </motion.div>

          {/* Story text */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h3 className="font-playfair text-3xl sm:text-4xl font-medium text-cream mb-10 leading-tight">
              A Legacy of <br /><span className="text-primary italic">Flavor</span> & Mastery
            </h3>
            <div className="space-y-5 text-warm-gray leading-[1.8] font-light text-base mb-12">
              <p>
                It all started in a small kitchen with a singular vision — to elevate the
                grilled chicken experience to a fine-dining standard. What began
                as a closely guarded family secret has blossomed into a
                beloved culinary destination.
              </p>
              <p>
                Every dish at Cluck & Grill represents our commitment to culinary artistry.
                Slow-grilled over artisanal charcoal and paired with our handcrafted sauces,
                we promise an unforgettable gastronomic journey.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.8 }}
                  className="flex items-start gap-5 p-6 rounded-2xl bg-dark-card border border-white/4 hover:border-primary/15 transition-all duration-500 group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl border border-white/8 flex items-center justify-center shrink-0 text-cream group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500">
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="font-playfair font-semibold text-cream text-lg mb-2 group-hover:text-primary transition-colors duration-500">{v.title}</h4>
                    <p className="text-warm-gray text-sm leading-relaxed font-light">{v.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-28"
        >
          <div className="text-center mb-18">
            <h3 className="font-playfair text-3xl sm:text-4xl font-medium text-cream">
              Our <span className="text-primary italic">Journey</span>
            </h3>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 35 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                  className="relative group"
                >
                  <div className="w-16 h-16 mx-auto rounded-xl bg-dark border-2 border-white/8 flex items-center justify-center mb-8 relative z-10 group-hover:border-primary/40 transition-colors duration-500 group-hover:bg-primary/5">
                    <span className="text-primary font-playfair font-semibold text-sm">{item.year}</span>
                  </div>
                  <div className="text-center">
                    <h4 className="font-playfair font-semibold text-cream text-xl mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-warm-gray text-sm leading-relaxed font-light px-2">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-dark-card rounded-2xl p-10 text-center group transition-all duration-700 hover:-translate-y-2 border border-white/4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-primary mb-7 group-hover:scale-110 transition-transform duration-700">
                  {stat.icon}
                </div>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <p className="text-warm-gray text-[9px] font-bold tracking-[0.25em] uppercase mt-4">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
