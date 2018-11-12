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
    console.log(this.state.partyCode);
  };

  render() {
    return (
      <div>
        <HomeContainer />
        <JoinPartyContainer
          setPartyCode={this.changePartyCode}
          setPartyName={this.changePartyName}
        />
      </div>
    );
  }
}

export default App;
