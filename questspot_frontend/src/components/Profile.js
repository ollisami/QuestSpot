import React from 'react'
import ImageLoader from './ImageLoader'
import '../styles/Profiles.css'
import {Link} from 'react-router-dom'


const Profile = ({ profile }) => {
  if (!profile) return null


  return (
    <div key={profile.id}>
      <Link to={'/profiles/'}>back to profiles</Link>

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
      <div className="profile-info">
        <p>{profile.name}, "{profile.username}"</p>
        <p>{profile.address}, {profile.postalCode}, {profile.city}, {profile.country}</p>
        <p>{profile.tags}</p>
      </div>

      <div className="bottom-border" />
    </div>
  )
}

export default Profile