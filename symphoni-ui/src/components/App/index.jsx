import React, { Component } from 'react';
import HomeContainer from '../HomeContainer';
import StartPartyContainer from '../StartPartyContainer';
import JoinPartyContainer from '../JoinPartyContainer';
import QueueContainer from '../QueueContainer';
import FooterComponent from '../FooterComponent';
import config from '../../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyCode: localStorage.getItem('partyCode'),
      partyName: localStorage.getItem('partyName'),
      username: localStorage.getItem('username'),
      isHost: false,
    };
  }

  componentWillMount() {
    const { partyCode } = this.state;

    if (partyCode) {
      fetch(`${config.url}party/${partyCode}`, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          localStorage.clear();
          this.setState({ partyCode: null, partyName: null });
        }
      });
    }
  }

  render() {
    const {
      partyName, partyCode, isHost, username,
    } = this.state;

    const queueProps = {
      partyCode,
      partyName,
      isHost,
      username,
    };

    const setUsername = (newUsername) => {
      this.setState({ username: newUsername });
      localStorage.setItem('username', newUsername);
    };

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
          isHost={() => {
            this.setState({ isHost: !isHost });
          }}
          setUsername={setUsername}
        />
        <JoinPartyContainer setParty={this.changePartyCode} setUsername={setUsername} />
        <QueueContainer {...queueProps} />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
