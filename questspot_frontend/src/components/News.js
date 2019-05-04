import React from 'react'
import ImageLoader from './ImageLoader'
import { Link } from 'react-router-dom'
import Collapsible from 'react-collapsible'

import '../styles/News.css'



const News = ({ news }) => {

  if(!news) return null

  const mapping = () => {
    return (
      news.map(newsElem =>
        <div key={newsElem.id} className="news-element">
          <div className="news-container">
            <div>
              {newsElem.image &&
                <ImageLoader
                  imgUrl={newsElem.image}
                  altText={newsElem.title}
                  child={
                    <div className="news-title">
                      <Link to={newsElem.link ? newsElem.link : '/'}>{newsElem.title}</Link>
                    </div>
                  }
                />
              }
            </div>
            <Collapsible trigger=' read more' overflowWhenOpen='visible'>
              <p>{newsElem.description}</p>
            </Collapsible>
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