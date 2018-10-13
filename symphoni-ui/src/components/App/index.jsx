import React, { Component } from 'react';
import HomeContainer from '../HomeContainer';
import StartPartyContainer from '../StartPartyContainer';
import QueueContainer from '../QueueContainer';

class App extends Component {
  render() {
    return (
      <div>
        <HomeContainer />
        <StartPartyContainer />
        <QueueContainer />
      </div>
    );
  }
}

export default App;
