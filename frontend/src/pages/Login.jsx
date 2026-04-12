import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', form)
      login(data)
      navigate('/games')
    } catch {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎮 Videogame Store</h2>
        <h3 style={styles.subtitle}>Iniciar sesión</h3>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Usuario"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button style={styles.button} type="submit">Entrar</button>
        </form>
        <p style={styles.link}>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#0f0f1a' },
  card: { background:'#1a1a2e', padding:'2rem', borderRadius:'12px', width:'360px', boxShadow:'0 4px 20px rgba(0,0,0,0.5)' },
  title: { color:'#e94560', textAlign:'center', margin:'0 0 0.5rem' },
  subtitle: { color:'#aaa', textAlign:'center', margin:'0 0 1.5rem', fontWeight:'normal' },
  form: { display:'flex', flexDirection:'column', gap:'1rem' },
  input: { padding:'0.75rem', borderRadius:'8px', border:'1px solid #333', background:'#16213e', color:'#fff', fontSize:'1rem' },
  button: { padding:'0.75rem', borderRadius:'8px', background:'#e94560', color:'#fff', border:'none', fontSize:'1rem', cursor:'pointer' },
  error: { color:'#e94560', textAlign:'center', margin:'0 0 1rem' },
  link: { color:'#aaa', textAlign:'center', marginTop:'1rem' }
}