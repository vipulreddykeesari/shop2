import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import SpecialOffers from '../components/SpecialOffers'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <SpecialOffers />
      <Testimonials />
    </div>
  )
}
