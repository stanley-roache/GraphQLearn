import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './index.css';
import App from './App';

//  Apollo client setup

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);