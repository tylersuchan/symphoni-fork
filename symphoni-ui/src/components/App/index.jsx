import React, { Component } from 'react';
import HomeContainer from '../HomeContainer';
import StartPartyContainer from '../StartPartyContainer';
import JoinPartyContainer from '../JoinPartyContainer';

class App extends Component {
  render() {
    return (
      <div>
        <HomeContainer />
        <StartPartyContainer />
        <JoinPartyContainer />
      </div>
    );
  }
}

export default App;
