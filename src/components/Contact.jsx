import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'

const contactInfo = [
  {
    icon: <MapPin size={20} strokeWidth={1.5} />,
    title: 'Visit Us',
    lines: ['123 Culinary Avenue, Gourmet Lane', 'Metropolis, 400001'],
    color: 'from-blue-500/8 to-transparent',
  },
  {
    icon: <Phone size={20} strokeWidth={1.5} />,
    title: 'Reservations',
    lines: ['+91 (123) 456-7890', '+91 (987) 654-3210'],
    color: 'from-green-500/8 to-transparent',
  },
  {
    icon: <Mail size={20} strokeWidth={1.5} />,
    title: 'Inquiries',
    lines: ['concierge@rahmanchickencenter.com', 'events@rahmanchickencenter.com'],
    color: 'from-purple-500/8 to-transparent',
  },
  {
    icon: <Clock size={20} strokeWidth={1.5} />,
    title: 'Hours',
    lines: ['Mon-Fri: 11 AM – 11 PM', 'Sat-Sun: 10 AM – 12 AM'],
    color: 'from-primary/8 to-transparent',
  },
]

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-dark">
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-18"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-14 h-[1px] bg-gradient-to-r from-transparent to-primary/40"></span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">
              Connect
            </span>
            <span className="w-14 h-[1px] bg-gradient-to-l from-transparent to-primary/40"></span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-medium text-cream mb-5">
            Get in <span className="text-primary italic">Touch</span>
          </h2>
          <p className="text-warm-gray text-base max-w-xl mx-auto font-light leading-relaxed">
            For reservations, catering inquiries, or private events, our concierge team is always at your service.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-5 bg-dark-card rounded-2xl p-7 hover:border-primary/20 border border-white/4 transition-all duration-500 group relative overflow-hidden hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10 p-3.5 rounded-xl border border-white/8 text-cream group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500 shrink-0">
                  {info.icon}
                </div>
                <div className="relative z-10">
                  <h4 className="font-playfair font-semibold text-lg text-cream mb-2 group-hover:text-primary transition-colors">{info.title}</h4>
                  {info.lines.map((line, idx) => (
                    <p key={idx} className="text-warm-gray text-sm font-light leading-relaxed">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="rounded-2xl overflow-hidden border border-white/4 h-[220px] relative bg-dark-card"
            >
              <div className="absolute inset-0 bg-dark-card flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={40} className="text-primary/25 mx-auto mb-3" />
                  <p className="text-warm-gray text-sm font-light">123 Culinary Avenue</p>
                  <p className="text-warm-gray/40 text-xs mt-1 font-medium">Metropolis, 400001</p>
                </div>
              </div>

              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '35px 35px',
              }} />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-primary rounded-full relative">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-dark-card rounded-2xl p-14 border border-primary/15 flex flex-col items-center justify-center text-center min-h-[500px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-22 h-22 rounded-2xl bg-primary/8 border border-primary/25 flex items-center justify-center mb-7"
                  >
                    <CheckCircle2 size={40} className="text-primary" />
                  </motion.div>
                  <h3 className="font-playfair text-3xl font-medium text-cream mb-4">Message Sent!</h3>
                  <p className="text-warm-gray text-base font-light max-w-sm leading-relaxed">
                    Thank you for reaching out. Our concierge team will respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-dark-card rounded-2xl p-9 sm:p-11 border border-white/4 space-y-6"
                >
                  <h3 className="font-playfair text-2xl font-medium text-cream mb-2">Send a Message</h3>
                  <p className="text-warm-gray text-sm font-light mb-7">Fill in the form below and we'll get back to you shortly.</p>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="floating-input-group">
                      <input id="contact-name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder=" " />
                      <label htmlFor="contact-name">Your Name</label>
                    </div>
                    <div className="floating-input-group">
                      <input id="contact-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder=" " />
                      <label htmlFor="contact-email">Email Address</label>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="floating-input-group">
                      <input id="contact-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder=" " />
                      <label htmlFor="contact-phone">Phone Number</label>
                    </div>
                    <div className="floating-input-group">
                      <input id="contact-subject" type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder=" " />
                      <label htmlFor="contact-subject">Subject</label>
                    </div>
                  </div>

                  <div className="floating-input-group">
                    <textarea id="contact-message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required placeholder=" " className="resize-none" />
                    <label htmlFor="contact-message">Your Message</label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
                    <p className="text-warm-gray/35 text-xs font-light">
                      We typically respond within 24 hours
                    </p>
                    <button
                      id="contact-submit"
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-9 py-4.5 bg-gradient-to-r from-primary to-primary-light text-dark font-bold tracking-wide rounded-xl transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(212,168,83,0.3)] group"
                    >
                      Send Inquiry
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
