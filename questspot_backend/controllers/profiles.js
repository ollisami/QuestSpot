const profilesRouter = require('express').Router()
const Studio = require('../models/studio')

profilesRouter.get('/', async (request, response) => {
  const studios = await Studio.find({})
  // Add search for artist profiles here and return them too.
  response.json(studios.map(u => u.toJSON()))
})

module.exports = profilesRouter