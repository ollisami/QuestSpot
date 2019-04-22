const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const studioSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  passwordHash: String,
  name: String,
  address: String,
  postalCode: String,
  city: String,
  country: String,
  email: String,
  description: String,
  artists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist'
    }
  ],
  images: [],
  tags: []
})

studioSchema.plugin(uniqueValidator)
studioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Studio = mongoose.model('Studio', studioSchema)

module.exports = Studio