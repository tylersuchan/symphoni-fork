import React, { Component } from 'react';
import HomeContainer from '../HomeContainer';
import StartPartyContainer from '../StartPartyContainer';

class App extends Component {
  render() {
    return (
      <div>
        <HomeContainer />
        <StartPartyContainer />
      </div>
    );
  }
}

export default App;
