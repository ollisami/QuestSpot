const artistRouter = require('express').Router()
const Artist       = require('../models/artist')
const Studio       = require('../models/studio')
const bcrypt       = require('bcrypt')

const getPasswordHash = async (password) => {
  const saltRounds   = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  return passwordHash
}

artistRouter.get('/', async (request, response) => {
  const artists = await Artist.find({})
  response.json(artists.map(u => u.toJSON()))
})

artistRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const studioProfile = await Studio.findOne({ username: body.username })
    if (studioProfile || body.username.length < 3 || body.password.length < 3) {
      response.status(400).send({ error: 'invalid username or password' })
      response.send()
      return
    }

    if (
      !body.name ||
        !body.address ||
        !body.postalCode ||
        !body.city ||
        !body.email
    ) {
      response.status(400).send({ error: 'Missing required data' })
      response.send()
      return
    }
    const { password, ...artistProps } = body
    const passwordHash = await getPasswordHash(password)

    const artist = new Artist({
      ...artistProps,
      passwordHash: passwordHash,
      studio: body.studio === undefined ? null : body.studio,
      images: body.images === undefined ? [] : body.images,
      tags: body.tags === undefined ? [] : body.tags
    })

    const savedArtist = await artist.save()

    response.json(savedArtist)
  } catch (exception) {
    response.status(400).send({ error: exception.message })
  }
})

artistRouter.put('/:id', async (request, response) => {
  const body = request.body
  try {
    const { password, ...artistProps } = body
    const passwordHash  = await getPasswordHash(password)
    const artist        = { ...artistProps, passwordHash: passwordHash }
    const updatedStudio = await Artist.findByIdAndUpdate(request.params.id, artist, { new: true })
    response.json(updatedStudio.toJSON())
  } catch (exception) {
    console.log(exception.message)
    response.status(400).send({ error: exception.message })
  }
})

artistRouter.delete('/:id', async (request, response) => {
  try {
    const artist = await Artist.findById(request.params.id)
    if (artist) {
      await artist.remove()
      response.status(204).end()
    } else {
      response.status(401).send({ error: 'Artist removing failed' })
    }
  } catch (exception) {
    response.status(400).send({ error: exception.message })
  }
})

module.exports = artistRouter