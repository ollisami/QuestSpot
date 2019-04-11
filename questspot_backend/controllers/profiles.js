const profilesRouter = require('express').Router()
const Studio         = require('../models/studio')
const Artist         = require('../models/artist')

profilesRouter.get('/', async (request, response) => {
  const studios = await Studio.find({})
  const artists = await Artist.find({})
  const results = studios.map(u => u.toJSON()).concat(artists.map(u => u.toJSON()))
  response.json(results)
})

module.exports = profilesRouter