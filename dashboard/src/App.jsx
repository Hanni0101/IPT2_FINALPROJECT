import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import MainLandingPage from './pages/MainLandingPage'
import Login from './pages/Login'
import AdminPage from './pages/admin/AdminPage'
import ManageUsers from './pages/admin/ManageUsers'
import AddProduct from './pages/admin/AddProduct'

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  })

  const ProtectedRoute = ({ children }) => {
    if (!user || user.role !== 'admin') {
      return <Navigate to="/" />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLandingPage user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage user={user} setUser={setUser} />
          </ProtectedRoute>
        } />
        <Route path="/admin/manage-users" element={
          <ProtectedRoute>
            <ManageUsers user={user} setUser={setUser} />
          </ProtectedRoute>
        } />
        <Route path="/admin/add-product" element={
          <ProtectedRoute>
            <AddProduct user={user} setUser={setUser} />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App