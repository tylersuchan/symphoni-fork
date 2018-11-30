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

    const showHome = localStorage.getItem('showHome');
    if (showHome === null) {
      localStorage.setItem('showHome', true);
    }

    this.state = {
      partyCode: localStorage.getItem('partyCode'),
      partyName: localStorage.getItem('partyName'),
      showHome: localStorage.getItem('showHome') === 'true',
      showJoin: localStorage.getItem('showJoin') === 'true',
      showStart: localStorage.getItem('showStart') === 'true',
      inParty: localStorage.getItem('inParty') === 'true',
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
      partyName, partyCode, isHost, inParty, showJoin, showStart, showHome,
    } = this.state;

    const togglers = {
      toggleShowHome: () => {
        this.setState({ showHome: !showHome });
        localStorage.setItem('showHome', !showHome);
      },
      toggleShowStart: () => {
        this.setState({ showStart: !showStart });
        localStorage.setItem('showStart', !showStart);
      },
      toggleShowJoin: () => {
        this.setState({ showJoin: !showJoin });
        localStorage.setItem('showJoin', !showJoin);
      },
      toggleIsHost: () => {
        this.setState({ isHost: !isHost });
        localStorage.setItem('isHost', !isHost);
      },
      toggleInParty: () => {
        this.setState({ inParty: !inParty });
        localStorage.setItem('inParty', !inParty);
      },
    };

    const homeContainerProps = {
      toggleShowHome: togglers.toggleShowHome,
      toggleShowStart: togglers.toggleShowStart,
      toggleShowJoin: togglers.toggleShowJoin,
    };

    const queueProps = {
      partyCode,
      partyName,
      isHost,
      inParty,
    };

    return (
      <div>
        {showHome && <HomeContainer {...homeContainerProps} />}
        {showStart && (
          <StartPartyContainer
            setPartyCode={(newPartyCode) => {
              this.setState({ partyCode: newPartyCode });
              localStorage.setItem('partyCode', newPartyCode);
            }}
            setPartyName={(newPartyName) => {
              this.setState({ partyName: newPartyName });
              localStorage.setItem('partyName', newPartyName);
            }}
            toggleShowStart={togglers.toggleShowStart}
            toggleIsHost={togglers.toggleIsHost}
            toggleInParty={togglers.toggleInParty}
          />
        )}
        {showJoin && (
          <JoinPartyContainer
            setPartyCode={(newPartyCode) => {
              this.setState({ partyCode: newPartyCode });
              localStorage.setItem('partyCode', newPartyCode);
            }}
            toggleShowJoin={togglers.toggleShowJoin}
          />
        )}
        {inParty && <QueueContainer {...queueProps} />}
        <FooterComponent />
      </div>
    );
  }
}

export default App;
