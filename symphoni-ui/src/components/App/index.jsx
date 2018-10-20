import React, { Component } from 'react';
import HomeContainer from '../HomeContainer';
import StartPartyContainer from '../StartPartyContainer';
import JoinPartyContainer from '../JoinPartyContainer';
import FooterComponent from '../FooterComponent';

class App extends Component {
  render() {
    return (
      <div>
        <HomeContainer />
        <StartPartyContainer />
        <JoinPartyContainer />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
