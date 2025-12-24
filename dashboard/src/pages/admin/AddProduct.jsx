import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import './AddProduct.css'
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

function AddProduct({ user, setUser }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [open, setOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add') 
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: '85vh',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/menu`)
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (mode, product = null) => {
    setModalMode(mode)
    setFormErrors({})
    if (mode === 'edit' && product) {
      setSelectedProduct(product)
      setName(product.Name)
      setDescription(product.Description)
      setPrice(product.Price)
      setPhoto(product.Photo)
    } else {
      setSelectedProduct(null)
      setName('')
      setDescription('')
      setPrice('')
      setPhoto('')
    }
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  const handlePhotoChange = (e) => {
    setPhoto(e.target.value)
  }

  const validateForm = () => {
    const errors = {}
    if (!name) errors.name = 'Name is required'
    if (!description) errors.description = 'Description is required'
    else if (/^\d+$/.test(description)) errors.description = 'Description must not be only numbers'
    if (!price) errors.price = 'Price is required'
    else if (isNaN(price) || Number(price) <= 0) errors.price = 'Price must be a positive number'
    if (!photo) errors.photo = 'Photo URL is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    const productData = {
      Name: name,
      Description: description,
      Price: parseFloat(price),
      Photo: photo
    }

    try {
      let response
      if (modalMode === 'add') {
        response = await fetch(`${API_URL}/menu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        })
      } else {
        response = await fetch(`${API_URL}/menu/${selectedProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        })
      }
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save product')
      }
      fetchProducts()
      handleCloseModal()
    } catch (error) {
      setFormErrors({ ...formErrors, submit: error.message })
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      const response = await fetch(`${API_URL}/menu/${productId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete product')
      fetchProducts()
    } catch (error) {
      alert('Error deleting product: ' + error.message)
    }
  }

  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const displayedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <div className="admin-page">
      <Header user={user} setUser={setUser} />
      <main className="admin-main">
        <section className="admin-section">
          <div className="add-product">
            <div className="add-product-header">
              <h2>Manage Products</h2>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenModal('add')}
              >
                Add Product
              </Button>
            </div>
            <TableContainer className="product-table-container" component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Photo</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">Loading...</TableCell>
                    </TableRow>
                  ) : displayedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No products found</TableCell>
                    </TableRow>
                  ) : (
                    displayedProducts.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product.Name}</TableCell>
                        <TableCell>{product.Description}</TableCell>
                        <TableCell>₱{Number(product.Price).toFixed(2)}</TableCell>
                        <TableCell>
                          <img src={product.Photo} alt={product.Name} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="primary" onClick={() => handleOpenModal('edit', product)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDeleteProduct(product._id)}>
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
              count={products.length}
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
        aria-labelledby="product-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="product-modal-title" variant="h6" component="h2" mb={2}>
            {modalMode === 'add' ? 'Add New Product' : 'Edit Product'}
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
          <FormControl fullWidth margin="normal" error={!!formErrors.description}>
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={2}
            />
            {formErrors.description && <FormHelperText>{formErrors.description}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!formErrors.price}>
            <TextField
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
            />
            {formErrors.price && <FormHelperText>{formErrors.price}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!formErrors.photo}>
            <TextField
              label="Photo URL"
              variant="outlined"
              value={photo}
              onChange={handlePhotoChange}
              fullWidth
              placeholder="https://example.com/image.jpg"
            />
            {formErrors.photo && <FormHelperText>{formErrors.photo}</FormHelperText>}
          </FormControl>
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" onClick={handleSubmit}>
              {modalMode === 'add' ? 'Add Product' : 'Save Changes'}
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

export default AddProduct