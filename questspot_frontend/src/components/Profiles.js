import React from 'react'
import ImageLoader from './ImageLoader'
import '../styles/Profiles.css'


const Profiles = ({ profiles }) => {
  if(!profiles) return null

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
            {profile.name}
        </div>
        <div className="profile-city">
            {profile.city}, {profile.country}
        </div>
        <div className="bottom-border" />
      </div>
    )
  )
}

export default Profiles