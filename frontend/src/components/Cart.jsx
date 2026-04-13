import { useCart } from '../context/CartContext'
import api from '../services/api'
import '../styles/cart.css'

export default function Cart({ onClose, onPurchased }) {
  const { cart, removeFromCart, clearCart, total } = useCart()

  const handleConfirm = async () => {
    if (cart.length === 0) return
    const results = await Promise.allSettled(
      cart.map(game => api.post(`/purchases/${game.id}`))
    )
    const ok = results.filter(r => r.status === 'fulfilled').length
    const fail = results.filter(r => r.status === 'rejected').length
    clearCart()
    onPurchased(ok, fail)
    onClose()
  }

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-drawer">
        <div className="cart-header">
          <h2 className="cart-title">🛒 CARRITO</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p className="cart-empty-text">CARRITO VACÍO</p>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map(game => (
                <div key={game.id} className="cart-item">
                  {game.imageUrl
                    ? <img src={game.imageUrl} alt={game.name} className="cart-item-img" />
                    : <div className="cart-item-placeholder">🎮</div>
                  }
                  <div className="cart-item-info">
                    <p className="cart-item-name">{game.name}</p>
                    <p className="cart-item-genre">{game.genre}</p>
                  </div>
                  <div className="cart-item-right">
                    <span className="cart-item-price">${game.price}</span>
                    <button className="cart-item-remove" onClick={() => removeFromCart(game.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span className="cart-count">{cart.length} JUEGO{cart.length > 1 ? 'S' : ''}</span>
                <span className="cart-total">TOTAL: <span>${total.toFixed(2)}</span></span>
              </div>
              <button className="btn btn-cyan" style={{padding:'0.85rem'}} onClick={handleConfirm}>
                ✓ CONFIRMAR COMPRA
              </button>
              <button className="btn btn-ghost" style={{padding:'0.6rem'}} onClick={clearCart}>
                VACIAR CARRITO
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}