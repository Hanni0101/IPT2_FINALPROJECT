import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://hannromon_db_user:HannroDB01@hanncluster.ard7zb2.mongodb.net/Sizzle?retryWrites=true&w=majority"

let cachedConnection = null

export async function connectDB() {
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    })
    cachedConnection = conn.connection
    return cachedConnection
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error(`Database connection failed: ${error.message}`)
  }
}

export default connectDB
