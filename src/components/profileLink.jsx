import React from 'react'
import { Link,  withRouter } from 'react-router-dom'

const profileLink = (event, props) => {
  event.preventDefault()
  props.history.push('/profile')
}
const ProfileLink = withRouter((props) => {
    return (
      <div id="profile-link-div">
        <button id="profile-link" onClick={(event) => profileLink(event, props)}>
          Profile
        </button>
      </div>
    )
})

export default ProfileLink
