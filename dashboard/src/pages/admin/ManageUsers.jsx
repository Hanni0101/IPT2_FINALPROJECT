import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import './ManageUsers.css'
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  TablePagination,
  IconButton,
  Modal,
  Box,
  TextField,
  Typography,
  FormControl,
  FormHelperText
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function ManageUsers({ user, setUser }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  
  const [open, setOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add') 
  const [selectedUser, setSelectedUser] = useState(null)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (mode, userData = null) => {
    setModalMode(mode)
    setFormErrors({})
    
    if (mode === 'edit' && userData) {
      setSelectedUser(userData)
      setName(userData.Name)
      setEmail(userData.Email)
      setPassword('') 
    } else {
      setSelectedUser(null)
      setName('')
      setEmail('')
      setPassword('')
    }
    
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
    setSelectedUser(null)
  }

  const validateForm = () => {
    const errors = {}
    
    if (!name) errors.name = 'Name is required'
    
    if (!email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid'
    }
    
    if (modalMode === 'add' || password) {
      if (!password && modalMode === 'add') {
        errors.password = 'Password is required'
      } else if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
      }
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    
    const userData = {
      Name: name,
      Email: email
    }
    
    if (password) {
      userData.Password = password
    }
    
    try {
      let response
      
      if (modalMode === 'add') {
        response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
      } else {
        response = await fetch(`http://localhost:5000/api/users/${selectedUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
      }
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save user')
      }
      
      fetchUsers()
      handleCloseModal()
    } catch (error) {
      console.error('Error saving user:', error)
      setFormErrors({...formErrors, submit: error.message})
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete user')
      
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const displayedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <div className="admin-page">
      <Header user={user} setUser={setUser} />
      <main className="admin-main">
        <section className="admin-section">
          <div className="manage-users">
            <div className="manage-users-header">
              <h2>Manage Users</h2>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => handleOpenModal('add')}
              >
                Add User
              </Button>
            </div>
            
            <TableContainer className="users-table-container">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">Loading...</TableCell>
                    </TableRow>
                  ) : displayedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No users found</TableCell>
                    </TableRow>
                  ) : (
                    displayedUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell component="th" scope="row">
                          {user.Name}
                        </TableCell>
                        <TableCell>{user.Email}</TableCell>
                        <TableCell>{user.Password ? '••••••••' : ''}</TableCell>
                        <TableCell align="right">
                          <IconButton 
                            color="primary" 
                            onClick={() => handleOpenModal('edit', user)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[3, 5, 7]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </section>
      </main>
      
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="user-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="user-modal-title" variant="h6" component="h2" mb={2}>
            {modalMode === 'add' ? 'Add New User' : 'Edit User'}
          </Typography>
          
          {formErrors.submit && (
            <Typography color="error" mb={2}>
              {formErrors.submit}
            </Typography>
          )}
          
          <FormControl fullWidth margin="normal" error={!!formErrors.name}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            {formErrors.name && <FormHelperText>{formErrors.name}</FormHelperText>}
          </FormControl>
          
          <FormControl fullWidth margin="normal" error={!!formErrors.email}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            {formErrors.email && <FormHelperText>{formErrors.email}</FormHelperText>}
          </FormControl>
          
          <FormControl fullWidth margin="normal" error={!!formErrors.password}>
            <TextField
              label={modalMode === 'edit' ? 'Password (leave blank to keep unchanged)' : 'Password'}
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            {formErrors.password && <FormHelperText>{formErrors.password}</FormHelperText>}
          </FormControl>
          
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" onClick={handleSubmit}>
              {modalMode === 'add' ? 'Add User' : 'Save Changes'}
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ManageUsers