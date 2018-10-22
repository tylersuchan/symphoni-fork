import React, { Component } from 'react';
import HomeContainer from '../HomeContainer';
import StartPartyContainer from '../StartPartyContainer';
import JoinPartyContainer from '../JoinPartyContainer';
import FooterComponent from '../FooterComponent';
import QueueContainer from '../QueueContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { partyCode: '' };
  }

  changePartyCode = (newPartyCode) => {
    this.setState({ partyCode: newPartyCode });
  };

  render() {
    return (
      <div>
        <HomeContainer />

        <StartPartyContainer />
        <JoinPartyContainer />
        <FooterComponent />

        <StartPartyContainer partyCode={this.changePartyCode} />
        <p>{this.state.partyCode}</p>
        

      </div>
    );
  }
}

export default App;
