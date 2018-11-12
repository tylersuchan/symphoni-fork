import React, { Component } from 'react';

import HomeContainer from '../HomeContainer';
import JoinPartyContainer from '../JoinPartyContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { partyCode: '', partyName: '' };
  }

  changePartyCode = (newPartyCode) => {
    this.setState({ partyCode: newPartyCode });
    console.log(this.state.partyCode);
  };

  changePartyName = (newPartyName) => {
    this.setState({ partyName: newPartyName });
    console.log(this.state.partyName);
  };

  render() {
    return (
      <div>
        <HomeContainer />
        <JoinPartyContainer partyCode={this.changePartyCode} partyName={this.changePartyName} />
      </div>
    );
  }
}

export default App;
