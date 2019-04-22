import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Carousel } from 'react-bootstrap'
import '../styles/Profiles.css'

const Profile = ({ profile }) => {
  if (!profile) return null


  const mapProfileImages = () => {

    const divStyle = {
      minHeight: "200px",
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

  return (
    <div key={profile.id}>
      <Link to={'/profiles/'}>
        <div className="back-button">
          <i className="fas fa-arrow-left"></i>
        </div>
      </Link>

      {profile.images &&
        <Carousel interval={null}>
          {mapProfileImages()}
        </Carousel>
      }
      <div className="flex-grid">
        <div className="col-button">
          <Button className="round-button" variant="outline-success">
            <i className="fas fa-thumbs-up"></i>
          </Button>
        </div>
        <div className="col">
          <div className="profile-name">
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
        <p>{profile.name}, "{profile.username}"</p>
        <p>{profile.address}, {profile.postalCode}, {profile.city}, {profile.country}</p>
        <p>{profile.tags}</p>
      </div>
    </div>
  )
}

export default Profile