import React from 'react'
import { FormControl } from 'react-bootstrap'
import ScoopedBoxFrame from './ScoopedBoxFrame'

  const UserInfoForm = (props) => {
    if ( props.state !== 'UserInfo') return null

    return (
      props.backgroundDiv(
        <div className="input-form">
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="username"
            defaultValue={props.username ? props.username : ''}
            onChange={(event) => props.setUsername(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="password"
            placeholder="Password"
            defaultValue={props.password ? props.password : ''}
            onChange={(event) => props.setPassword(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Name"
            defaultValue={props.name ? props.name : ''}
            onChange={(event) => props.setName(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="email"
            placeholder="Email"
            defaultValue={props.email ? props.email : ''}
            onChange={(event) => props.setEmail(event.target.value)}
          />
          <ScoopedBoxFrame 
            id='next' 
            radius={20}
            primaryColor="#436151"
            clickEvent={props.validateUserInfo}
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

  export default UserInfoForm