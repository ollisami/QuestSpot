const jwt         = require('jsonwebtoken')
const bcrypt      = require('bcrypt')
const loginRouter = require('express').Router()
const Artist      = require('../models/artist')
const Studio      = require('../models/studio')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  let user = await Artist.findOne({ username: body.username })
  if (!user) user = await Studio.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    console.log("login failed with:", body.username, body.password)
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter