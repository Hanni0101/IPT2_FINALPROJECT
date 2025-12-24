import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import './AdminPage.css'

function AdminPage({ user, setUser }) {
  const [userCount, setUserCount] = useState(0)
  const [productCount, setProductCount] = useState(0)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetch(`${API_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUserCount(Array.isArray(data) ? data.length : 0))
      .catch(err => {
        console.error('Error fetching users:', err)
        setUserCount(0)
      })
    fetch(`${API_URL}/api/menu`)
      .then(res => res.json())
      .then(data => setProductCount(Array.isArray(data) ? data.length : 0))
      .catch(err => {
        console.error('Error fetching menu:', err)
        setProductCount(0)
      })
  }, [])

  return (
    <div className="admin-page">
      <Header user={user} setUser={setUser} />
      <main className="admin-main">
        <section className="admin-section">
          <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{userCount}</p>
              </div>
              <div className="stat-card">
                <h3>Total Products</h3>
                <p>{productCount}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminPage