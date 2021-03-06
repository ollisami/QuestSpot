import React, { useEffect, useState } from 'react'
import ReactTags from 'react-tag-autocomplete'
import { Link } from 'react-router-dom'
import tagService from '../services/tags'
import ImageLoader from './ImageLoader'
import ScoopedBoxFrame from './ScoopedBoxFrame'

import '../styles/Profiles.css'


const Profiles = ({ profiles, filters }) => {

  if(!profiles) return null

  const [tags, setTags] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    getSuggestionsFromServer()
  },[])

  const getSuggestionsFromServer = async () => {
    let suggestionList = await tagService.getAll()
    suggestionList = suggestionList.map((s, index) => { return { id: index, name: s }})
    setSuggestions(suggestionList)

    let f = []
    if (filters) filters.forEach( (filter, index) => {
      f.push({ id: index, name: filter })
    })
    setTags(f)
  }

  const handleDelete = (i) => {
    const newTags = tags.slice(0)
    newTags.splice(i, 1)
    setTags(newTags)
  }

  const handleAddition = (tag) => {
    const newTags = [].concat(tags, tag)
    setTags(newTags)
  }

  const filteredProfiles = () => {
    const scores = profiles.map(p => [{ profile: p }, { score: p.likes.length }])
    if (tags.length > 0) {
      scores.forEach(s => {
        tags.forEach(tag => {
          if (
            tag.name === s[0].profile.city ||
            tag.name === s[0].profile.country ||
            tag.name === s[0].profile.username ||
            tag.name === s[0].profile.name ||
            s[0].profile.tags.indexOf(tag.name) >= 0
          ) s[1].score += 10000
        })
      })
    }
    return scores
      .sort((a, b) => b[1].score - a[1].score)
      .map(obj => obj[0].profile)
  }

  const mapping = () => {
    return (
      filteredProfiles().map(profile =>
        <div key={profile.id} className="profile-element">
          <ScoopedBoxFrame 
            id={profile.id + "top"}
            radius={20}
            borderColor="#f0f0db"
            primaryColor="#425346"
            type="top"
            children = {
              <div className="bottom-border" />
            }
          />
          {profile.images &&
            <ImageLoader
              imgUrl={profile.images[0]}
              child={
                <div className="profile-name">
                  < Link to={`/profile/${profile.username}`}>{profile.name}</Link>
                  <div className="profile-city">
                    {profile.city}, {profile.country}
                  </div>
                </div>
              }
            />
          }
          <ScoopedBoxFrame 
            id={profile.id  + "bottom"}
            radius={20}
            borderColor="#f0f0db"
            primaryColor="#425346"
            type="bottom"
            children = {
              <div className="bottom-border" />
            }
          />
        </div>
      )
    )
  }

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete.bind(this)}
        handleAddition={handleAddition.bind(this)}
        autofocus={false}
        placeholder={'Search'}
      />
      <div>{mapping()}</div>
    </div>
  )
}

export default Profiles