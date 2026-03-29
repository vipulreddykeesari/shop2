import MenuSection from '../components/MenuSection'

export default function Menu({ onAddToCart }) {
  return (
    <div className="pt-28">
      <MenuSection onAddToCart={onAddToCart} />
    </div>
  )
}
