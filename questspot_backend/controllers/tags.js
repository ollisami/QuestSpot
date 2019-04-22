const tagsRouter = require('express').Router()
const Studio     = require('../models/studio')
const Artist     = require('../models/artist')

tagsRouter.get('/', async (request, response) => {
  const studios = await Studio.find({})
  const artists = await Artist.find({})

  //Find all tags/cities/countries/username/name in profiles and remove dublicates
  let results = studios.map(u => u.tags.concat(u.country, u.city, u.username, u.name))
    .concat(artists.map(u => u.tags.concat(u.country, u.city, u.username, u.name)))
    .reduce((tags, tagList) => {
      tagList.forEach( tag => {
        if (tags.indexOf(tag) === -1){
          tags.push(tag)
        }
      })
      return tags
    }, [])

  response.json(results)
})

module.exports = tagsRouter