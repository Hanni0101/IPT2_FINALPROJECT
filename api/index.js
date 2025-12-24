import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import User from './models/users.js'
import Menu from './models/menu.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://hannromon_db_user:HannroDB01@hanncluster.ard7zb2.mongodb.net/Sizzle?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/users', async (req, res) => {
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

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
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

app.post('/users/register', async (req, res) => {
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

app.post('/menu', async (req, res) => {
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

app.get('/menu', async (req, res) => {
  try {
    const menuItems = await Menu.find()
    res.json(menuItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/menu/:id', async (req, res) => {
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

app.delete('/menu/:id', async (req, res) => {
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

export default app
