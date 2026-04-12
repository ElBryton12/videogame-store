import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function Games() {
  const [games, setGames] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name:'', genre:'', price:'', description:'' })
  const [editId, setEditId] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'ADMIN'

  const load = async () => {
    const { data } = await api.get('/games')
    setGames(data)
  }

  useEffect(() => { load() }, [])

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

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este juego?')) {
      await api.delete(`/games/${id}`)
      load()
    }
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🎮 Videogame Store</h1>
        <div style={styles.headerRight}>
          <span style={styles.userInfo}>👤 {user?.username} ({user?.role})</span>
          <button style={styles.logoutBtn} onClick={() => { logout(); navigate('/login') }}>Salir</button>
        </div>
      </header>

      <div style={styles.content}>
        {/* Buscador */}
        <div style={styles.searchBar}>
          <input
            style={styles.searchInput}
            placeholder="Buscar juego..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button style={styles.searchBtn} onClick={handleSearch}>Buscar</button>
          <button style={styles.clearBtn} onClick={() => { setSearch(''); load() }}>Ver todos</button>
        </div>

        {/* Formulario admin */}
        {isAdmin && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>{editId ? '✏️ Editar juego' : '➕ Nuevo juego'}</h3>
            <div style={styles.formGrid}>
              <input style={styles.input} placeholder="Nombre" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={styles.input} placeholder="Género" value={form.genre}
                onChange={e => setForm({ ...form, genre: e.target.value })} />
              <input style={styles.input} placeholder="Precio" type="number" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })} />
              <input style={styles.input} placeholder="Descripción" value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              <button style={styles.saveBtn} onClick={handleSave}>
                {editId ? 'Actualizar' : 'Guardar'}
              </button>
              {editId && <button style={styles.cancelBtn}
                onClick={() => { setEditId(null); setForm({ name:'', genre:'', price:'', description:'' }) }}>
                Cancelar
              </button>}
            </div>
          </div>
        )}

        {/* Lista de juegos */}
        <div style={styles.grid}>
          {games.map(game => (
            <div key={game.id} style={styles.card}>
              <div style={styles.cardGenre}>{game.genre}</div>
              <h3 style={styles.cardTitle}>{game.name}</h3>
              <p style={styles.cardDesc}>{game.description}</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>${game.price}</span>
                {isAdmin && (
                  <div style={{ display:'flex', gap:'0.5rem' }}>
                    <button style={styles.editBtn} onClick={() => handleEdit(game)}>Editar</button>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(game.id)}>Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight:'100vh', background:'#0f0f1a', color:'#fff' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 2rem', background:'#1a1a2e', borderBottom:'1px solid #333' },
  logo: { color:'#e94560', margin:0 },
  headerRight: { display:'flex', alignItems:'center', gap:'1rem' },
  userInfo: { color:'#aaa', fontSize:'0.9rem' },
  logoutBtn: { padding:'0.4rem 1rem', background:'transparent', border:'1px solid #e94560', color:'#e94560', borderRadius:'6px', cursor:'pointer' },
  content: { padding:'2rem', maxWidth:'1200px', margin:'0 auto' },
  searchBar: { display:'flex', gap:'0.5rem', marginBottom:'1.5rem' },
  searchInput: { flex:1, padding:'0.75rem', borderRadius:'8px', border:'1px solid #333', background:'#16213e', color:'#fff', fontSize:'1rem' },
  searchBtn: { padding:'0.75rem 1.5rem', background:'#e94560', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer' },
  clearBtn: { padding:'0.75rem 1.5rem', background:'#333', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer' },
  formCard: { background:'#1a1a2e', padding:'1.5rem', borderRadius:'12px', marginBottom:'1.5rem', border:'1px solid #333' },
  formTitle: { color:'#e94560', margin:'0 0 1rem' },
  formGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'1rem' },
  input: { padding:'0.75rem', borderRadius:'8px', border:'1px solid #333', background:'#16213e', color:'#fff', fontSize:'0.95rem' },
  saveBtn: { padding:'0.6rem 1.5rem', background:'#e94560', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer' },
  cancelBtn: { padding:'0.6rem 1.5rem', background:'#333', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1rem' },
  card: { background:'#1a1a2e', borderRadius:'12px', padding:'1.5rem', border:'1px solid #2a2a3e' },
  cardGenre: { fontSize:'0.75rem', color:'#e94560', textTransform:'uppercase', marginBottom:'0.5rem', fontWeight:'bold' },
  cardTitle: { margin:'0 0 0.5rem', fontSize:'1.1rem' },
  cardDesc: { color:'#aaa', fontSize:'0.85rem', margin:'0 0 1rem' },
  cardFooter: { display:'flex', justifyContent:'space-between', alignItems:'center' },
  price: { color:'#4ecca3', fontWeight:'bold', fontSize:'1.1rem' },
  editBtn: { padding:'0.3rem 0.75rem', background:'#16213e', color:'#fff', border:'1px solid #555', borderRadius:'6px', cursor:'pointer', fontSize:'0.8rem' },
  deleteBtn: { padding:'0.3rem 0.75rem', background:'transparent', color:'#e94560', border:'1px solid #e94560', borderRadius:'6px', cursor:'pointer', fontSize:'0.8rem' },
}