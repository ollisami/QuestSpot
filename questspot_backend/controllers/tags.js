const tagsRouter = require('express').Router()
const Profiles   = require('../models/profile')

tagsRouter.get('/', async (request, response) => {
  const profiles = await Profiles.find({})

  let results = profiles.map(u => u.tags.concat(u.country, u.city, u.username, u.name))
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