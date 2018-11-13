import React, { Component } from 'react';

import HomeContainer from '../HomeContainer';
import JoinPartyContainer from '../JoinPartyContainer';

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
        <JoinPartyContainer setParty={this.changePartyCode} />
      </div>
    );
  }
}

export default App;
