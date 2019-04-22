const config     = require('./utils/config')
const express    = require('express')
const bodyParser = require('body-parser')
const app        = express()
const mongoose   = require('mongoose')
const cors       = require('cors')
const logger     = require('./utils/logger')

const loginRouter    = require('./controllers/login')
const profilesRouter = require('./controllers/profiles')
const tagsRouter     = require('./controllers/tags')
const studiosRouter  = require('./controllers/studios')
const artistRounter  = require('./controllers/artists')

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
app.use('/api/login', loginRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/profiles/studios', studiosRouter)
app.use('/api/profiles/artists', artistRounter)

module.exports = app