const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const newsSchema = mongoose.Schema({
  image: String,
  title: String,
  description: String,
  username: String,
  city: String,
  country: String,
  tags: [],
  updated: { type: Date, default: Date.now },
  link: String,
})

newsSchema.plugin(uniqueValidator)
newsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const News = mongoose.model('News', newsSchema)

module.exports = News