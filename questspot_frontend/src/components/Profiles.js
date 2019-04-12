import React from 'react'
import ImageLoader from './ImageLoader'
import '../styles/Profiles.css'
import {Link} from 'react-router-dom'


const Profiles = ({ profiles }) => {
  if(!profiles) return null

  const mapping = () => {
    return (
      profiles.map(profile =>
        <div key={profile.id}>
          {profile.images &&
            <ImageLoader
              imgUrl={profile.images[0]}
              altText={profile.name}
            />
          }
          <div className="profile-name">
              <Link to={`/profiles/${profile.id}`}>{profile.name}</Link>
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
      <p>List of Profiles:</p>
      <div>{mapping()}</div>
    </div>
  )
}

export default Profiles