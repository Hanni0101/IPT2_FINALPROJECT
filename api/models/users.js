import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address'
    }
  },
  Password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v)
      },
      message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
    }
  }
})

export default mongoose.model('User', userSchema)
