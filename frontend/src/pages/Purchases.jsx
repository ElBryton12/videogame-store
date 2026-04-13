import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import '../styles/global.css'
import '../styles/header.css'
import '../styles/purchases.css'

export default function Purchases() {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/purchases/me')
      .then(({ data }) => setPurchases(data))
      .finally(() => setLoading(false))
  }, [])

  const total = purchases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="purchases-page">
      <header className="header">
        <div className="header-logo">
          <span className="header-logo-text">
            PIXEL VAULT
            <span className="header-logo-sub">VIDEOGAME STORE</span>
          </span>
        </div>
        <nav className="header-nav">
          <button className="btn btn-ghost" onClick={() => navigate('/games')}>← CATÁLOGO</button>
          <span className="user-chip">👤 {user?.username}</span>
          <button className="btn btn-pink" onClick={() => { logout(); navigate('/login') }}>SALIR</button>
        </nav>
      </header>

      <div className="purchases-content">
        <div className="purchases-header-row">
          <h2 className="purchases-title">🧾 MIS COMPRAS</h2>
          {purchases.length > 0 && (
            <div className="purchases-summary">
              {purchases.length} JUEGO{purchases.length > 1 ? 'S' : ''} &nbsp;|&nbsp;
              TOTAL: <span className="purchases-total">${total.toFixed(2)}</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="empty-state"><p className="empty-text blink">CARGANDO...</p></div>
        ) : purchases.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👾</div>
            <p className="empty-text">SIN COMPRAS AÚN</p>
            <button className="btn btn-pink" style={{padding:'0.75rem 1.5rem'}}
              onClick={() => navigate('/games')}>VER CATÁLOGO</button>
          </div>
        ) : (
          <div className="purchases-list">
            {purchases.map((p, i) => (
              <div key={p.id} className="purchase-card">
                <span className="purchase-num">#{i + 1}</span>
                {p.game.imageUrl
                  ? <img src={p.game.imageUrl} alt={p.game.name} className="purchase-img" />
                  : <div className="purchase-img-placeholder">🎮</div>
                }
                <div className="purchase-info">
                  <p className="purchase-name">{p.game.name}</p>
                  <p className="purchase-genre">{p.game.genre}</p>
                  <p className="purchase-date">
                    🗓 {new Date(p.purchaseDate).toLocaleDateString('es-MX', {
                      year:'numeric', month:'short', day:'numeric',
                      hour:'2-digit', minute:'2-digit'
                    })}
                  </p>
                </div>
                <div className="purchase-right">
                  <span className="purchase-amount">${p.amount}</span>
                  <span className="purchase-badge">✓ COMPRADO</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}