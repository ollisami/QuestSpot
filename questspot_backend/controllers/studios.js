const studioRouter = require('express').Router()
const Studio = require('../models/studio')
const bcrypt = require('bcrypt')

studioRouter.get('/', async (request, response) => {
  const studios = await Studio.find({})
  response.json(studios.map(u => u.toJSON()))
})

studioRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.username.length < 3 || body.password.length < 3) {
      response.status(400).send({ error: 'invalid username or password' })
      response.send()
      return
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const studio = new Studio({
      username: body.username,
      passwordHash: passwordHash,
      name: body.name === undefined ? 'undefined' : body.name,
      address: body.address === undefined ? 'undefined' : body.address,
      postalCode: body.postalCode === undefined ? 'undefined' : body.postalCode,
      city: body.city === undefined ? 'undefined' : body.city,
      country: body.country === undefined ? 'undefined' : body.country,
      artists: body.artists === undefined ? [] : body.artists,
      images: body.images === undefined ? [] : body.images,
      tags: body.tags === undefined ? [] : body.tags
    })

    const savedStudio = await studio.save()

    response.json(savedStudio)
  } catch (exception) {
    response.status(400).send({ error: exception.message })
  }
})

module.exports = studioRouter