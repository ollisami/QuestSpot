const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
  data: Buffer,
  url: String,
  contentType: String,
})

imageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Images = mongoose.model('Image', imageSchema)

module.exports = Images