import React, { Component } from 'react';
import HomeContainer from '../HomeContainer';
import StartPartyContainer from '../StartPartyContainer';
import JoinPartyContainer from '../JoinPartyContainer';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      partycode : ''
    };
  }

  changePartyCode = (newPartyCode) => {
    this.setState({partycode : newPartyCode});
  };

  render() {
    return (
      <div>
        <HomeContainer />
        <StartPartyContainer partycode={this.changePartyCode} />
        <p>{this.state.partycode}</p>
        <JoinPartyContainer />
      </div>
    );
  }
}

export default App;
