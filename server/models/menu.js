import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Description: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return !/^\d+$/.test(v)
      },
      message: 'Description must not be only numbers'
    }
  },
  Price: {
    type: Number,
    required: true,
    min: [0.01, 'Price must be greater than zero']
  },
  Photo: {
    type: String,
    required: true
  }
})

export default mongoose.model('Menu', menuSchema)