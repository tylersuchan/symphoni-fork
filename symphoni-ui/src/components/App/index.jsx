import React, { Component } from 'react';
import HomeContainer from '../HomeContainer';
import StartPartyContainer from '../StartPartyContainer';
import JoinPartyContainer from '../JoinPartyContainer';
import FooterComponent from '../FooterComponent';
import QueueContainer from '../QueueContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyCode: localStorage.getItem('partyCode'),
      partyName: localStorage.getItem('partyName'),
      deviceID: null,
    };
  }

  render() {
    const { partyName, partyCode } = this.state;

    return (
      <div>
        <HomeContainer />
        <StartPartyContainer
          setPartyCode={(newPartyCode) => {
            this.setState({ partyCode: newPartyCode });
            localStorage.setItem('partyCode', newPartyCode);
          }}
          setPartyName={(newPartyName) => {
            this.setState({ partyName: newPartyName });
            localStorage.setItem('partyName', newPartyName);
          }}
        />
        <JoinPartyContainer />
        <QueueContainer partyCode={partyCode} partyName={partyName} />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
