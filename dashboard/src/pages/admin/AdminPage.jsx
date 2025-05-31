import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import './AdminPage.css'

function AdminPage({ user, setUser }) {
  const [userCount, setUserCount] = useState(0)
  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUserCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setUserCount(0))
    fetch('http://localhost:5000/api/menu')
      .then(res => res.json())
      .then(data => setProductCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setProductCount(0))
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