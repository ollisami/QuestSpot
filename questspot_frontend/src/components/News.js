import React from 'react'
import ImageLoader from './ImageLoader'
import '../styles/Profiles.css'
import { Link } from 'react-router-dom'


const News = ({ news }) => {

  if(!news) return null

  const mapping = () => {
    return (
      news.map(newsElem =>
        <div key={newsElem.id}>
          {newsElem.image &&
            <ImageLoader
              imgUrl={newsElem.image}
              altText={newsElem.title}
            />
          }
          <div className="profile-name">
            <Link to={newsElem.link ? newsElem.link : '/'}>{newsElem.title}</Link>
          </div>
          <div className="profile-city">
            {newsElem.description}
          </div>
          <div className="bottom-border" />
        </div>
      )
    )
  }

  return (
    <div>
      <div>{mapping()}</div>
    </div>
  )
}

export default News