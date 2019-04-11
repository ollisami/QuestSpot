const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const artistSchema = mongoose.Schema({
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
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio'
  },
  images: [],
  tags: []
})

artistSchema.plugin(uniqueValidator)
artistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist