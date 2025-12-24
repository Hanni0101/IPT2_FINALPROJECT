import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import sizzleLogo from '../assets/SIZZLE.png'
import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'

function Header({ user, setUser }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/')
    setMenuOpen(false)
  }

  const handleNavClick = (id) => {
    setMenuOpen(false)
    // Prevent default link behavior
    event.preventDefault()
    
    // Smooth scroll to section
    setTimeout(() => {
      const element = document.querySelector(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
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
      
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <nav className={`nav ${menuOpen ? 'active' : ''}`}>
        {!user && (
          <>
            <a href="#about" onClick={() => handleNavClick('#about')}>About</a>
            <a href="#location" onClick={() => handleNavClick('#location')}>Location</a>
            <a href="#menu" onClick={() => handleNavClick('#menu')}>Menu</a>
            <a href="#social" onClick={() => handleNavClick('#social')}>Social Media</a>
            <Link to="/login" className="login-btn" data-tooltip="Login Account">
              <LoginIcon /> 
            </Link>
          </>
        )}
        
        {user && user.role === 'user' && (
          <>
            <a href="#about" onClick={() => handleNavClick('#about')}>About</a>
            <a href="#location" onClick={() => handleNavClick('#location')}>Location</a>
            <a href="#menu" onClick={() => handleNavClick('#menu')}>Menu</a>
            <a href="#social" onClick={() => handleNavClick('#social')}>Social Media</a>
            <button onClick={handleLogout} className="logout-btn" data-tooltip="Logout">
              <LoginIcon />
            </button>
          </>
        )}
        
        {user && user.role === 'admin' && (
          <>
            <Link to="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/admin/manage-users" onClick={() => setMenuOpen(false)}>Manage Users</Link>
            <Link to="/admin/add-product" onClick={() => setMenuOpen(false)}>Add Product</Link>
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