import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const checkStatus = gql`
{
  status
}
`
class CheckStatus extends Component {
  render() {
    return (
      <Query query={checkStatus}>
        {
          ({loading, error, data }) => {
            // console.log(loading)
            // console.log(error)
            const appStatus = data.status
           console.log(appStatus)
           return `${appStatus}`
          }
        }
      </Query>
    )
  }
}

export default CheckStatus
