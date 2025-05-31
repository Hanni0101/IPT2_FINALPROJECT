import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import sizzleLogo from '../assets/sizzle.png'
import LoginIcon from '@mui/icons-material/Login'
import React from 'react'

function Header({ user, setUser }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/')
  }

  React.useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored && !user) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/home">
          <img src={sizzleLogo} alt="SIZZLE Restaurant" />
        </Link>
      </div>
      <nav className="nav">
        {!user && (
          <>
            <a href="#about">About</a>
            <a href="#location">Location</a>
            <a href="#menu">Menu</a>
            <a href="#social">Social Media</a>
            <Link to="/login" className="login-btn" data-tooltip="Login Account">
              <LoginIcon /> 
            </Link>
          </>
        )}
        
        {user && user.role === 'user' && (
          <>
            <a href="#about">About</a>
            <a href="#location">Location</a>
            <a href="#menu">Menu</a>
            <a href="#social">Social Media</a>
            <button onClick={handleLogout} className="logout-btn" data-tooltip="Logout">
              <LoginIcon />
            </button>
          </>
        )}
        
        {user && user.role === 'admin' && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/manage-users">Manage Users</Link>
            <Link to="/admin/add-product">Add Product</Link>
            <button onClick={handleLogout} className="logout-btn" data-tooltip="Logout">
                 <LoginIcon />
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header