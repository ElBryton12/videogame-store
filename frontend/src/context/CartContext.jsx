import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (game) => {
    if (cart.find(g => g.id === game.id)) return false // ya está
    setCart([...cart, game])
    return true
  }

  const removeFromCart = (gameId) => {
    setCart(cart.filter(g => g.id !== gameId))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, g) => sum + Number(g.price), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)