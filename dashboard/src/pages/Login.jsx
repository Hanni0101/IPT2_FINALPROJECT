import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import bg3 from '../assets/bg3.jpg'

function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showRegister, setShowRegister] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'Admin@admin.com' && password === 'Password123@') {
      const adminUser = { role: 'admin', email };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      navigate('/admin')
    } else if (email && password) {
      const normalUser = { role: 'user', email, name: name || 'User' };
      setUser(normalUser);
      localStorage.setItem('user', JSON.stringify(normalUser));
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('All fields are required')
      return
    }
    const validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
    if (!validPass) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character')
      return
    }
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.message || 'Registration failed')
        return
      }
      setShowRegister(false)
      setError('Registration successful! Please log in.')
      setName('')
      setPassword('')
      setEmail('')
    } catch (err) {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="login-page">
      <div 
        className="login-image" 
        style={{ backgroundImage: `url(${bg3})` }}
      />
      <div className="login-container">
        {!showRegister ? (
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login Account</h2>
            {error && <div className="login-error">{error}</div>}
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Login</button>
            <button
              type="button"
              className="register-btn"
              onClick={() => {
                setShowRegister(true)
                setError('')
                setName('')
                setPassword('')
              }}
            >
              Register
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleRegister}>
            <h2>Register Account</h2>
            {error && <div className="login-error">{error}</div>}
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoFocus
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit</button>
            <button
              type="button"
              className="register-btn"
              onClick={() => {
                setShowRegister(false)
                setError('')
                setName('')
                setPassword('')
              }}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login