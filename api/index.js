import { connectDB } from './db.js'
import User from './models/users.js'
import Menu from './models/menu.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Forwarded-Host, X-URL-Scheme, x-api-token, Content-Type'
  )
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    await connectDB()

    const { pathname } = new URL(req.url, `http://${req.headers.host}`)
    const path = pathname.replace('/api', '')

    // USERS ROUTES
    if (path === '/users' && req.method === 'GET') {
      const users = await User.find()
      return res.status(200).json(users)
    }

    if (path === '/users' && req.method === 'POST') {
      const { Name, Email, Password } = req.body
      if (!Name || !Email || !Password) {
        return res.status(400).json({ error: 'All fields are required' })
      }
      const user = new User({ Name, Email, Password })
      await user.save()
      return res.status(201).json(user)
    }

    if (path.match(/^\/users\/[a-f0-9]{24}$/) && req.method === 'PUT') {
      const id = path.split('/')[2]
      const userData = req.body
      if (userData.Password === '') {
        delete userData.Password
      }
      const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true })
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' })
      }
      return res.status(200).json(updatedUser)
    }

    if (path.match(/^\/users\/[a-f0-9]{24}$/) && req.method === 'DELETE') {
      const id = path.split('/')[2]
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' })
      }
      return res.status(200).json({ message: 'User deleted successfully' })
    }

    if (path === '/users/register' && req.method === 'POST') {
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
      return res.status(201).json({ message: 'User registered successfully' })
    }

    // MENU ROUTES
    if (path === '/menu' && req.method === 'GET') {
      const menuItems = await Menu.find()
      return res.status(200).json(menuItems)
    }

    if (path === '/menu' && req.method === 'POST') {
      const { Name, Description, Price, Photo } = req.body
      if (!Name || !Description || !Price || !Photo) {
        return res.status(400).json({ error: 'All fields are required' })
      }
      const menuItem = new Menu({ Name, Description, Price, Photo })
      await menuItem.save()
      return res.status(201).json(menuItem)
    }

    if (path.match(/^\/menu\/[a-f0-9]{24}$/) && req.method === 'PUT') {
      const id = path.split('/')[2]
      const { Name, Description, Price, Photo } = req.body
      const updateData = { Name, Description, Price, Photo }
      const updated = await Menu.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      if (!updated) {
        return res.status(404).json({ error: 'Product not found' })
      }
      return res.status(200).json(updated)
    }

    if (path.match(/^\/menu\/[a-f0-9]{24}$/) && req.method === 'DELETE') {
      const id = path.split('/')[2]
      const deletedMenuItem = await Menu.findByIdAndDelete(id)
      if (!deletedMenuItem) {
        return res.status(404).json({ error: 'Product not found' })
      }
      return res.status(200).json({ message: 'Product deleted successfully' })
    }

    // Not found
    return res.status(404).json({ error: 'Endpoint not found' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
