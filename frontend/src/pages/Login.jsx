import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import api from '../services/api'
import '../styles/global.css'
import '../styles/auth.css'

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
      setError('USUARIO O CONTRASEÑA INCORRECTOS')
    }
  }

  return (
    <div className="auth-page">
      <Logo size="sm" />
      <div className="auth-card">
        <h2 className="auth-title">INICIAR SESIÓN</h2>
        <p className="auth-subtitle">PLAYER LOGIN</p>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input className="pixel-input" placeholder="USUARIO" value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })} />
          <input className="pixel-input" type="password" placeholder="CONTRASEÑA" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} />
          <button className="btn btn-pink" type="submit" style={{padding:'0.85rem'}}>
            ▶ ENTRAR
          </button>
        </form>
        <p className="auth-link">
          ¿Sin cuenta? <Link to="/register">REGÍSTRATE</Link>
        </p>
      </div>
    </div>
  )
}