import React, {useState} from 'react'
import LazyLoad from 'react-lazy-load'
import Loading from './Loading'


const ImageLoader = ({ imgUrl, altText }) => {
    const [ loaded, setLoaded ] = useState(false)

    return (
        <div>
          {!loaded && <Loading color="#d1d1d1" type="spin"/>}
          <LazyLoad>
            <img
              src={imgUrl}
              alt={altText}
              onLoad={() => setLoaded(true)}
              width="100%"
              height="auto"
            />
          </LazyLoad>
        </div>
    )
  }
  
  export default ImageLoader