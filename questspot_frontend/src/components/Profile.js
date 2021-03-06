import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import { Button, Carousel } from 'react-bootstrap'

import { userChange } from '../reducers/userReducer'
import { setShowLogin } from '../reducers/loginReducer'

import profileService from '../services/profiles'

const Profile = (props) => {
  const { user } = props
  let profile = props.profile

  if (!profile) return null

  const [userLikedProfile, setUserLikedProfile] = useState(false)
  const [likes, setLikes] = useState(profile.likes.length)

  useEffect(() => {
    fetchProfile(profile.id)
  },[profile.id])

  const fetchProfile = async (id) => {
    profile = await profileService.getOne(id)
    setLikes(profile.likes.length)
    setUserLikedProfile(user && profile.likes.includes(user.username))
    window.scrollTo(0, 0)
  }

  const mapProfileImages = () => {
    const divStyle = {
      minHeight: '200px',
    }

    return profile.images.map((image, index) =>
      <Carousel.Item key={index} style={divStyle}>
        <img
          src={image}
          alt={`${profile.username} ${index}`}
          width="100%"
          height="auto"
        />
      </Carousel.Item>
    )
  }

  const handleLikeButtonClick = async () => {
    if (!user) {
      props.setShowLogin(true)
      return
    }
    profile = await profileService.like(profile)
    setUserLikedProfile(!userLikedProfile)
    setLikes(!userLikedProfile ? likes + 1 : likes - 1)
  }

  return (
    <div key={profile.id}>
      {profile.images &&
        <Carousel interval={null}>
          {mapProfileImages()}
        </Carousel>
      }
      <div className="profile-info-container">
        <div className="flex-grid">
          <div className="col-button">
            <Button
              className={`round-button ${(userLikedProfile ? 'liked' : 'not-liked')}`}
              variant="outline-success"
              onClick={() => handleLikeButtonClick()}>
              <i className="fas fa-thumbs-up"></i>
            </Button>
          </div>
          <div className="col">
            <div className="single-profile-name">
              {profile.name}
            </div>
            <div className="profile-city">
              {profile.city}, {profile.country}
            </div>
          </div>
          <div className="col-button">
            <Button className="round-button" variant="outline-danger">
              <i className="fas fa-heart"></i>
            </Button>
          </div>
        </div>
        <div className="profile-info">
          <p>Likes: {likes}</p>
          <p>{profile.description}</p>
          <p>{profile.name}, {profile.username}</p>
          <p>{profile.address}, {profile.postalCode}, {profile.city}, {profile.country}</p>
          <p>{profile.tags}</p>
        </div>
      </div>
      <Link to={useLastLocation() ? useLastLocation() : '/'}>
        <div className="back-button">
          <i className="fas fa-arrow-left"></i>
        </div>
      </Link>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const ConnectedProfile = connect(mapStateToProps, {
  userChange,
  setShowLogin
})(Profile)

export default ConnectedProfile