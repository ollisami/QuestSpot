const profileRouter  = require('express').Router()
const Profile        = require('../models/profile')
const bcrypt         = require('bcrypt')
const jwt            = require('jsonwebtoken')

const getPasswordHash = async (password) => {
  const saltRounds   = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  return passwordHash
}

const isValidType = (type) => {
  return type === 'Artist' || type === 'Studio'
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

profileRouter.get('/', async (request, response) => {
  const profiles = await Profile.find({})
  response.json(profiles.map(u => u.toJSON()))
})

profileRouter.get('/:id', async (request, response) => {
  const profile = await Profile.findById(request.params.id)
  response.json(profile.toJSON())
})

profileRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingProfile = await Profile.findOne({ username: body.username })
    if (existingProfile || body.username.length < 3 || body.password.length < 3) {
      response.status(400).send({ error: 'invalid username or password' })
      response.send()
      return
    }

    if (!body.type || !isValidType(body.type)) {
      response.status(400).send({ error: 'invalid profile type' })
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
    const { password, ...props } = body
    const passwordHash = await getPasswordHash(password)

    const profile = new Profile({
      ...props,
      passwordHash: passwordHash,
      artists: body.artists === undefined ? [] : body.artists,
      studio: body.studio === undefined ? null : body.studio,
      images: body.images === undefined ? [] : body.images,
      tags: body.tags === undefined ? [] : body.tags
    })

    const savedProfile = await profile.save()

    response.json(savedProfile)
  } catch (exception) {
    response.status(400).send({ error: exception.message })
  }
})

profileRouter.put('/:id', async (request, response) => {
  const body = request.body
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const { password, ...props } = body
    if (body.password) {
      props.passwordHash = await getPasswordHash(password)
    }

    const profile        = { ...props }
    const updatedProfile = await Profile.findByIdAndUpdate(request.params.id, profile, { new: true })
    response.json(updatedProfile.toJSON())

  } catch (exception) {
    console.log(exception.message)
    response.status(400).send({ error: exception.message })
  }
})

profileRouter.delete('/:id', async (request, response) => {
  try {
    const profile = await Profile.findById(request.params.id)
    if (profile) {
      await profile.remove()
      response.status(204).end()
    } else {
      response.status(401).send({ error: 'Profile removing failed' })
    }
  } catch (exception) {
    response.status(400).send({ error: exception.message })
  }
})

profileRouter.put('/like/:id', async (request, response) => {
  const body = request.body
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const profile        = await Profile.findById(body.id)
    const likerProfile   = await Profile.findById(decodedToken.id)
    const index          = profile.likes.indexOf(likerProfile.username)
    if (index > -1) {
      profile.likes.splice(index, 1)
    } else {
      profile.likes = profile.likes.concat(likerProfile.username)
    }
    const updatedProfile = await Profile.findByIdAndUpdate(request.params.id, profile, { new: true })
    response.json(updatedProfile.toJSON())

  } catch (exception) {
    console.log(exception.message)
    response.status(400).send({ error: exception.message })
  }
})

module.exports = profileRouter