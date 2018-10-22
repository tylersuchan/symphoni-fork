import React, { Component } from 'react';
import HomeContainer from '../HomeContainer';
import StartPartyContainer from '../StartPartyContainer';
import JoinPartyContainer from '../JoinPartyContainer';
import FooterComponent from '../FooterComponent';
import QueueContainer from '../QueueContainer';

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
    console.log(window);
    return (
      <div>
        <HomeContainer />

        <StartPartyContainer partycode={this.changePartyCode} />
        <p>{this.state.partycode}</p>
        <JoinPartyContainer />
        <FooterComponent />

        <StartPartyContainer partyCode={this.changePartyCode} />
        <p>{this.state.partyCode}</p>
        

      </div>
    );
  }
}

export default App;
