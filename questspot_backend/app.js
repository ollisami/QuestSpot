const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('./utils/logger')

const profilesRouter = require('./controllers/profiles')
const studiosRouter = require('./controllers/studios')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/profiles', profilesRouter)
app.use('/api/profiles/studios', studiosRouter)

module.exports = app