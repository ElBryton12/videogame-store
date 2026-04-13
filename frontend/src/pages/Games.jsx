import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import api from '../services/api'
import Cart from '../components/Cart'
import ConfirmModal from '../components/ConfirmModal'
import '../styles/global.css'
import '../styles/header.css'
import '../styles/games.css'


export default function Games() {
  const [games, setGames] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name:'', genre:'', price:'', description:'' })
  const [editId, setEditId] = useState(null)
  const [toast, setToast] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cart, addToCart } = useCart()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'ADMIN'

  const load = async () => {
    const { data } = await api.get('/games')
    setGames(data)
  }

  useEffect(() => { load() }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSearch = async () => {
    if (!search.trim()) return load()
    const { data } = await api.get(`/games/search?name=${search}`)
    setGames(data)
  }

  const handleSave = async () => {
    if (editId) {
      await api.put(`/games/${editId}`, form)
    } else {
      await api.post('/games', form)
    }
    setForm({ name:'', genre:'', price:'', description:'' })
    setEditId(null)
    load()
  }

  const handleEdit = (game) => {
    setEditId(game.id)
    setForm({ name: game.name, genre: game.genre, price: game.price, description: game.description })
  }

  const handleDelete = (id) => {
    setConfirmModal({
      message: '¿ELIMINAR ESTE JUEGO DEL CATÁLOGO?',
      onConfirm: async () => {
        await api.delete(`/games/${id}`)
        setConfirmModal(null)
        load()
      },
      onCancel: () => setConfirmModal(null)
    })
  }

  const handleAddToCart = (game) => {
    const added = addToCart(game)
    if (added) showToast(`"${game.name}" AL CARRITO 🛒`)
    else showToast('YA ESTÁ EN TU CARRITO', 'error')
  }

  const handlePurchased = (ok, fail) => {
    if (ok > 0 && fail === 0) showToast(`¡${ok} JUEGO${ok > 1 ? 'S' : ''} COMPRADO${ok > 1 ? 'S' : ''}! 🎮`)
    else if (ok > 0) showToast(`${ok} COMPRADO, ${fail} YA LO TENÍAS`, 'error')
    else showToast('YA TIENES TODOS ESOS JUEGOS', 'error')
  }

  return (
    <div className="games-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      {confirmModal && <ConfirmModal message={confirmModal.message} onConfirm={confirmModal.onConfirm} onCancel={confirmModal.onCancel} />}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} onPurchased={handlePurchased} />}

      <header className="header">
        <div className="header-logo">
          <span className="header-logo-text">
            PIXEL VAULT
            <span className="header-logo-sub">VIDEOGAME STORE</span>
          </span>
        </div>
        <nav className="header-nav">
          <button className="btn btn-yellow" onClick={() => setCartOpen(true)}>
            🛒 CARRITO {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
          <button className="btn btn-cyan" onClick={() => navigate('/purchases')}>🧾 MIS COMPRAS</button>
          <span className="user-chip">👤 {user?.username} [{user?.role}]</span>
          <button className="btn btn-pink" onClick={() => { logout(); navigate('/login') }}>SALIR</button>
        </nav>
      </header>

      <div className="games-content">
        <div className="search-bar">
          <input className="pixel-input" placeholder="BUSCAR JUEGO..." value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()} />
          <button className="btn btn-pink" onClick={handleSearch}>BUSCAR</button>
          <button className="btn btn-ghost" onClick={() => { setSearch(''); load() }}>VER TODOS</button>
        </div>

        {isAdmin && (
          <div className="admin-panel">
            <p className="section-title">{editId ? '✏ EDITAR JUEGO' : '+ NUEVO JUEGO'}</p>
            <div className="form-grid">
              <input className="pixel-input" placeholder="NOMBRE" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
              <input className="pixel-input" placeholder="GÉNERO" value={form.genre}
                onChange={e => setForm({ ...form, genre: e.target.value })} />
              <input className="pixel-input" placeholder="PRECIO" type="number" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })} />
              <input className="pixel-input" placeholder="DESCRIPCIÓN" value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div style={{display:'flex', gap:'0.5rem'}}>
              <button className="btn btn-yellow" style={{padding:'0.6rem 1.25rem'}} onClick={handleSave}>
                {editId ? '✓ ACTUALIZAR' : '+ GUARDAR'}
              </button>
              {editId && (
                <button className="btn btn-ghost" style={{padding:'0.6rem 1.25rem'}}
                  onClick={() => { setEditId(null); setForm({ name:'', genre:'', price:'', description:'' }) }}>
                  CANCELAR
                </button>
              )}
            </div>
          </div>
        )}

        <p className="section-title">CATÁLOGO DE JUEGOS</p>

        <div className="games-grid">
          {games.map(game => (
            <div key={game.id} className="game-card">
              {game.imageUrl
                ? <img src={game.imageUrl} alt={game.name} className="game-card-img" />
                : <div className="game-card-placeholder">👾</div>
              }
              <div className="game-card-body">
                <div className="game-card-header">
                  <span className="game-genre">{game.genre}</span>
                  {game.rating > 0 && (
                    <span className="game-rating">
                      <span style={{fontSize:'0.9rem'}}>★</span> {Number(game.rating).toFixed(1)}
                    </span>
                  )}
                </div>
                <h3 className="game-title">{game.name}</h3>
                <p className="game-desc">{game.description}</p>
                <div className="game-card-footer">
                  <span className="game-price">${game.price}</span>
                  <div className="card-actions">
                    <button className="btn btn-yellow" onClick={() => handleAddToCart(game)}>+ CARRITO</button>
                    {isAdmin && (
                      <>
                        <button className="btn btn-ghost" onClick={() => handleEdit(game)}>EDITAR</button>
                        <button className="btn btn-pink" onClick={() => handleDelete(game.id)}>✕</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}