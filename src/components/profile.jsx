import React from 'react'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import { Link, Redirect, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

const USER = gql`
  query user {
    user @client(always: true) {
      name,
      username,
      email,
    }
  }
`
const UPDATE_PROFILE = gql`
  mutation updateUser ($name: String, $username: String) {
    updateUser(name: $name, username: $username) {
      id,
      name,
      username,
      email,
    }
  }
`

const Profile = (props) => {
  let username
  let name
  return (
    <Query query={USER}>
      {(props) => {
        const {loading, error, data} = props
        if (loading) return <div>Loading</div>
        if (error) return <div>Error</div>
        const { user } = data;
        return (
          <div id="profile-page">
            <div id="profile-comp" className="reveal">
              <div id="profile-header">
                <strong>Profile</strong>
              </div>
              <div id="profile-body">
                <div id="profile-image">
                  <img src="images/15c9751f70c0edf1785474a926f2c641.png" width="90px" height="90px" alt="profile"/>
                </div>
                <div id="profile-info">
                  <div className="profile-group">
                  <label>Username</label>
                  <p>{user.username}</p>
                  </div>
                  <div className="profile-group">
                    <label>Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="profile-group">
                    <label>Email</label>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div id="edit-profile-div">
                  <button id="edit-profile-link" width="100px" onClick={(event) => {
                    event.preventDefault()
                    const updateProfileComp = document.getElementById('update-profile-component')
                    const profileComp = document.getElementById('profile-comp')
                    updateProfileComp.classList.replace('hidden', 'reveal')
                    profileComp.classList.replace('reveal', 'hidden')
                  }}>
                    Edit
                  </button>
              </div>
              </div>
            </div>
            <div id="update-profile-component" className="hidden">
              <div id="update-profile-form-div">
                <Mutation mutation={UPDATE_PROFILE}>
                  {(updateUser, props) => {
                    const { loading, error, data, client } = props
                    const { cache } = client
                    if (loading) return <div><p>Loading</p></div>
                    if (error) return <div><p>An eror has occurred {error.message}</p></div>
                    if (data) {
                      const updateProfileComp = document.getElementById('update-profile-component')
                      const profileComp = document.getElementById('profile-comp')
                      updateProfileComp.classList.replace('reveal', 'hidden')
                      profileComp.classList.replace('hidden', 'reveal',)
                      return <div>Profile successfully updated</div>
                    }
                    return (
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        updateUser({
                          variables: {
                            name: name.value,
                            username: username.value,
                          }
                        })

                        username = ""
                        name = ""
                      }}>

                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          defaultValue={user.name}
                          ref={node => name = node}
                        />
                      </div>
                      <div className="form-group">
                        <label>Username</label>
                        <input
                          type="text"
                          name="username"
                          defaultValue={user.username}
                          ref={node => username = node}
                        />
                      </div>
                      <div className="form-group">
                        <input type="submit" value="Update" />
                      </div>
                    </form>
                    )
                  }}
                </Mutation>
              </div>
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default Profile
