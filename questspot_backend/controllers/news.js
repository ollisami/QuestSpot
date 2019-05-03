const newsRouter     = require('express').Router()
const News           = require('../models/news')
const Profiles       = require('../models/profile')

const createNewsFromPopularTags = async () => {
  const likeLimit = 0
  const profiles  = await Profiles.find({})

  let allTags  = []
  profiles.forEach(p => {
    p.tags.forEach(tag => {
      allTags.push({ tag: tag , likes: p.likes.length })
    })
  })

  let filteredTags = []
  allTags.forEach (elem => {
    const index = filteredTags.findIndex((t) => (
      t.tag === elem.tag
    ))
    if (index === -1) {
      filteredTags.push(elem)
    } else {
      filteredTags[index].likes += elem.likes
    }
  })
  filteredTags = filteredTags.filter((elem) =>
    elem.likes > likeLimit
  )

  const news = []
  filteredTags.forEach(elem => {
    news.push(new News({
      image: 'https://source.unsplash.com/1080x1080/?tattoo',
      title: `Now trending style: ${elem.tag}`,
      description: 'Check out this cool new style!',
      link: `/profiles/${elem.tag}`
    }))
  })
  return news
}

newsRouter.get('/', async (request, response) => {
  const news = await News.find({})
  let mappedNews = news.map(u => u.toJSON())
  mappedNews = mappedNews.concat(await createNewsFromPopularTags())
  response.json(mappedNews)
})

newsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (
      !body.image ||
      !body.title ||
      !body.description ||
      !body.link
    ) {
      response.status(400).send({ error: 'Missing required data' })
      response.send()
      return
    }
    const { ...props } = body

    const news = new News({
      ...props,
    })

    const savedNews = await news.save()

    response.json(savedNews)
  } catch (exception) {
    response.status(400).send({ error: exception.message })
  }
})

newsRouter.delete('/:id', async (request, response) => {
  try {
    const news = await News.findById(request.params.id)
    if (news) {
      await news.remove()
      response.status(204).end()
    } else {
      response.status(401).send({ error: 'News removing failed' })
    }
  } catch (exception) {
    response.status(400).send({ error: exception.message })
  }
})

module.exports = newsRouter