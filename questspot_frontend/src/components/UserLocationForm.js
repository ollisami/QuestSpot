
import React from 'react'
import { FormControl } from 'react-bootstrap'
import ScoopedBoxFrame from './ScoopedBoxFrame'

  const locationForm = (props) => {
    if (props.state !== 'Location') return null

    return (
      props.backgroundDiv(
        <div className="input-form">
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Address"
            defaultValue={props.address ? props.address : ''}
            onChange={(event) => props.setAddress(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Postal Code"
            defaultValue={props.postalcode ? props.postalcode : ''}
            onChange={(event) => props.setPostalcode(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="City"
            defaultValue={props.city ? props.city : ''}
            onChange={(event) => props.setCity(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Country"
            defaultValue={props.country ? props.country : ''}
            onChange={(event) => props.setCountry(event.target.value)}
          />
          <ScoopedBoxFrame 
            id='next' 
            radius={20}
            primaryColor="#436151"
            clickEvent={props.validateLocation}
            type="box"
            children = {
              <div className="button-label">
               <p>Next</p> 
              </div>
            }/>
          <ScoopedBoxFrame 
            id='back' 
            radius={20}
            primaryColor="#f37863"
            clickEvent={props.setPrevState}
            type="box"
            children = {
              <div className="button-label">
               <p>Back</p> 
              </div>
            }/>
        </div>
      )
    )
  }

  export default locationForm