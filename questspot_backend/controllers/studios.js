const studioRouter = require('express').Router()
const Studio       = require('../models/studio')
const bcrypt       = require('bcrypt')

const getPasswordHash = async (password) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  return passwordHash
}

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

    const { password, ...studioProps } = body
    const passwordHash = await getPasswordHash(password)

    const studio = new Studio({
      ...studioProps,
      passwordHash: passwordHash,
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

studioRouter.put('/:id', async (request, response) => {
  const body = request.body
  try {
    const { password, ...studioProps } = body
    const passwordHash  = await getPasswordHash(password)
    const studio        = { ...studioProps, passwordHash: passwordHash }
    const updatedStudio = await Studio.findByIdAndUpdate(request.params.id, studio, { new: true })
    response.json(updatedStudio.toJSON())
  } catch (exception) {
    console.log(exception.message)
    response.status(400).send({ error: exception.message })
  }
})

studioRouter.delete('/:id', async (request, response) => {
  try {
    const studio = await Studio.findById(request.params.id)
    if (studio) {
      await studio.remove()
      response.status(204).end()
    } else {
      response.status(401).send({ error: 'Studio removing failed' })
    }
  } catch (exception) {
    response.status(400).send({ error: exception.message })
  }
})

module.exports = studioRouter