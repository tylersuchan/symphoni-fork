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

    this.validStates = ['HOME', 'START', 'JOIN', 'QUEUE'];

    const allStates = localStorage.getItem('allStates');
    if (allStates === null) {
      localStorage.setItem('allStates', JSON.stringify(['HOME']));
    }

    this.state = {
      partyCode: localStorage.getItem('partyCode'),
      partyName: localStorage.getItem('partyName'),
      username: localStorage.getItem('username'),
      allStates: JSON.parse(localStorage.getItem('allStates')),
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
      partyName, partyCode, isHost, allStates, username,
    } = this.state;

    const setViewState = (newState) => {
      const newAllStates = allStates.slice();
      newAllStates.push(newState);

      if (this.validStates.includes(newState)) {
        this.setState({ allStates: newAllStates });
        localStorage.setItem('allStates', JSON.stringify(newAllStates));
      }
    };

    const startPartyContainerProps = {
      setPartyCode: (newPartyCode) => {
        this.setState({ partyCode: newPartyCode });
        localStorage.setItem('partyCode', newPartyCode);
      },
      setPartyName: (newPartyName) => {
        this.setState({ partyName: newPartyName });
        localStorage.setItem('partyName', newPartyName);
      },
      setUsername: (newUsername) => {
        this.setState({ username: newUsername });
        localStorage.setItem('username', newUsername);
      },
      setViewState,
    };

    const joinPartyContainerProps = {
      setPartyCode: (newPartyCode) => {
        this.setState({ partyCode: newPartyCode });
        localStorage.setItem('partyCode', newPartyCode);
      },
      setUsername: (newUsername) => {
        this.setState({ username: newUsername });
        localStorage.setItem('username', newUsername);
      },
      setViewState,
    };

    const queueProps = {
      partyCode,
      partyName,
      isHost,
      username,
      setViewState,
      allStates,
    };

    return (
      <div>
        {(() => {
          switch (allStates[allStates.length - 1]) {
            case 'HOME':
              return <HomeContainer setViewState={setViewState} />;
            case 'START':
              return <StartPartyContainer {...startPartyContainerProps} />;
            case 'JOIN':
              return <JoinPartyContainer {...joinPartyContainerProps} />;
            case 'QUEUE':
              return <QueueContainer {...queueProps} />;
            default:
          }
        })()}
        <FooterComponent />
      </div>
    );
  }
}

export default App;
