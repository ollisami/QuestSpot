import React, {useEffect, useState} from 'react'
import ReactTags from 'react-tag-autocomplete'
import tagService from '../services/tags'
import ImageLoader from './ImageLoader'
import '../styles/Profiles.css'
import {Link} from 'react-router-dom'


const Profiles = ({ profiles }) => {

  if(!profiles) return null

  const [tags, setTags] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    getSuggestionsFromServer()
  },[])

  const getSuggestionsFromServer = async () => {
    let suggestionList = await tagService.getAll()
    suggestionList = suggestionList.map((s, index) => { return {id: index, name: s}})
    setSuggestions(suggestionList)
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
    return tags.length === 0 ? profiles : profiles.filter(profile => 
      tags.some(tag => 
        tag.name === profile.city ||
        tag.name === profile.country ||
        profile.tags.indexOf(tag.name) >= 0
      )
    )
  }

  const mapping = () => {
    return (
      filteredProfiles().map(profile =>
        <div key={profile.id}>
          {profile.images &&
            <ImageLoader
              imgUrl={profile.images[0]}
              altText={profile.name}
            />
          }
          <div className="profile-name">
              <Link to={`/profiles/${profile.username}`}>{profile.name}</Link>
          </div>
          <div className="profile-city">
              {profile.city}, {profile.country}
          </div>
          <div className="bottom-border" />
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