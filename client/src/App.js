import React, { Component } from 'react';

import DreamList from './components/DreamList'

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Dream List</h1>
        <DreamList />
      </div>
    );
  }
}

export default App;
