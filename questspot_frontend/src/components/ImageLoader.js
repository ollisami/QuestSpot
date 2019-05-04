import React, { useState } from 'react'
import LazyLoad from 'react-lazy-load'
import { Image} from 'react-bootstrap'
import Loading from './Loading'


const ImageLoader = ({ imgUrl, altText, child }) => {
  const [ loaded, setLoaded ] = useState(false)

  return (
    <div className="img-container">
      {!loaded &&
            <div className="loadingContainer" width="100%" height="300px">
              <Loading color="#d1d1d1" type="spin"/>
            </div>
      }
      <LazyLoad>
        <Image 
          src={imgUrl}
          onLoad={() => setLoaded(true)}
          fluid
         />
      </LazyLoad>
      {child && child}
    </div>
  )
}

export default ImageLoader