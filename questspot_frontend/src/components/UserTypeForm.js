import React from 'react'
import { Image } from 'react-bootstrap'
import ScoopedBoxFrame from './ScoopedBoxFrame'

import artistBG from '../resources/artist_bg.jpg'
import studioBG from '../resources/studio_bg.jpg'

const TypeForm = (props) => {
    if (props.state !== 'Type') return null

    return (
    <div className="type-button-container">
        <div className='type-button' onClick={() => props.setType('Artist')}>
            <Image src={artistBG} className="type-button-image" alt="Artist" fluid/>
            <p className="artist">Artist</p>
            <div className="type-button-overlay" />
        </div>
        <div className='type-button' onClick={() => props.setType('Studio')}>
            <Image src={studioBG} className="type-button-image" alt="Studio" fluid/>
            <p className="studio">Studio</p>
            <div className="type-button-overlay" />
        </div>
        {props.type && <ScoopedBoxFrame 
            id='submit' 
            radius={20}
            primaryColor="#436151"
            clickEvent={props.validateType}
            type="box"
            children = {
              <div className="button-label">
                <p>Next</p> 
              </div>
            }
            />}
    </div>
    )
  }

  export default TypeForm