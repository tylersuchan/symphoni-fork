import React, { Component } from 'react';

import HomeContainer from '../HomeContainer'
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
      
        <JoinPartyContainer partyCode={this.changePartyCode} />
        <p>{this.state.partyCode}</p>
      </div>
    );
  }
}

export default App;
