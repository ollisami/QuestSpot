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
const newsRouter     = require('./controllers/news')
const imagesRouter   = require('./controllers/images')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use('/api/login', loginRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/news', newsRouter)
app.use('/api/images', imagesRouter)

module.exports = app