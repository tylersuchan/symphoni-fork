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
      partyCode: '',
      partyName: '',
      deviceID: null,
    };
  }

  render() {
    const { partyName, partyCode } = this.state;

    return (
      <div>
        <HomeContainer />
        <StartPartyContainer
          setPartyCode={newPartyCode => this.setState({ partyCode: newPartyCode })}
          setPartyName={newPartyName => this.setState({ partyName: newPartyName })}
        />
        <JoinPartyContainer />
        <QueueContainer code={partyCode} partyName={partyName} />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
