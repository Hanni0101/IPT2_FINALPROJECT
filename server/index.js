import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './models/users.js'
import Menu from './models/menu.js'
import multer from 'multer'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://hannromon_db_user:HannroDB01@hanncluster.ard7zb2.mongodb.net/Sizzle?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create default admin account
// const createAdminUser = async () => {
//   try {
//     const adminExists = await User.findOne({ Email: 'admin@sizzle.com' })
//     if (!adminExists) {
//       const admin = new User({
//         Name: 'Admin',
//         Email: 'admin@sizzle.com',
//         Password: 'Admin@1234',
//         Role: 'admin'
//       })
//       await admin.save()
//       console.log('✅ Default admin account created')
//     }
//   } catch (error) {
//     console.error('Error creating admin:', error)
//   }
// }

// createAdminUser()

app.post('/api/users', async (req, res) => {
  try {
    const { Name, Email, Password } = req.body
    if (!Name || !Email || !Password) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const user = new User({ Name, Email, Password })
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const userData = req.body
    
    if (userData.Password === '') {
      delete userData.Password
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      userData,
      { new: true, runValidators: true }
    )
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const existing = await User.findOne({ Email: email })
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' })
    }
    const user = new User({ Name: name, Email: email, Password: password })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')

app.post('/api/menu', async (req, res) => {
  try {
    const { Name, Description, Price, Photo } = req.body
    if (!Name || !Description || !Price || !Photo) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const menuItem = new Menu({ Name, Description, Price, Photo })
    await menuItem.save()
    res.status(201).json(menuItem)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await Menu.find()
    res.json(menuItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { Name, Description, Price, Photo } = req.body
    const updateData = { Name, Description, Price, Photo }
    const updated = await Menu.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ error: 'Product not found' })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedMenuItem = await Menu.findByIdAndDelete(id)
    
    if (!deletedMenuItem) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app