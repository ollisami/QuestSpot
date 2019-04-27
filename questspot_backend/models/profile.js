const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const profileSchema = mongoose.Schema({
  type: String,
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
  likes: [],
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  artists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  ],
  images: [],
  tags: []
})

profileSchema.plugin(uniqueValidator)
profileSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile