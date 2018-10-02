import React, { Component } from 'react';
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

class DreamList extends Component {
  displayDreams() {
    const { data } = this.props
    return (data.loading)
      ? <li><h4>Loading</h4></li>
      : data.nga_moemoea.map((moemoea, i) => (
          <li key={i}>
            <h4>{moemoea.name}</h4>
          </li>
        ))
  }

  render() {
    
    return (
      <div>
        <ul id="book-list">
          {this.displayDreams()}
        </ul>
      </div>
    );
  }
}

const dreamQuery = gql`
  {
    nga_moemoea {
      name
      description
    }
  }
`

export default graphql(dreamQuery)(DreamList)
