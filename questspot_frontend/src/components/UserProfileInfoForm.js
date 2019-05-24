
import React from 'react'
import { Form } from 'react-bootstrap'
import ReactTags from 'react-tag-autocomplete'
import ScoopedBoxFrame from './ScoopedBoxFrame'

  const profileInfoForm = (props) => {
    if (props.state !== 'ProfileInfo') return null

    return (
      props.backgroundDiv(
        <div className="input-form">
          <ReactTags
            tags={props.tags}
            suggestions={props.suggestions}
            handleDelete={props.handleDelete}
            handleAddition={props.handleAddition}
            autofocus={false}
            placeholder={'Add tag'}
            addOnBlur={true}
            allowNew={true}
          />
          <Form onSubmit={props.addProfile}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Description"
                defaultValue={props.description ? props.description : ''}
                onChange={(event) => props.setDescription(event.target.value)}
              />

            <ScoopedBoxFrame 
              id='next' 
              radius={20}
              primaryColor="#436151"
              clickEvent={props.addProfile}
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
            </Form.Group>
          </Form>
        </div>
      )
    )
  }

  export default profileInfoForm