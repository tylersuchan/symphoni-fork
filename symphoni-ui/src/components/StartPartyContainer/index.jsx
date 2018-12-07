import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import UsernameInput from '../Util/UsernameInput';
import config from '../../config';
import './StartPartyContainer.css';

class StartPartyContainer extends Component {
  constructor(props) {
    super(props);
    this.partyCode = undefined;
    this.state = { partyCreated: false };
  }

  getPartyCodeOnEnter = (event) => {
    if (event.key === 'Enter') {
      const partyURI = `${config.url}party/${event.target.value}`;
      fetch(partyURI, {
        method: 'PUT',
      }).then(response => response.json().then((data) => {
        const { setPartyCode, setPartyName } = this.props;

        if (response.ok) {
          this.partyCode = data.code;
          setPartyCode(this.partyCode);
          setPartyName(data.party_data.name);
          // toggleIsHost();
          window.Materialize.toast('Party created successfully!', 4000);
          this.setState({ partyCreated: true });
        } else {
          window.Materialize.toast(
            'There was an error creating your party. Please try again.',
            4000,
          );
        }
      }));
    }
  };

  render() {
    const { partyCreated } = this.state;
    const { setViewState, setUsername } = this.props;

    return (
      <Container id="start" className="fullscreen">
        {!partyCreated && (
          <Fragment>
            <div className="center">
              <h3> Start Party Here!</h3>
              <h5> Insert Party Name</h5>
            </div>
            <div className="flex-container">
              <div className="flex-horizontal-center input-field col s6">
                <i className="material-icons prefix">music_note</i>
                {' '}
                <input id="join-code" type="text" onKeyPress={this.getPartyCodeOnEnter} />
                <label htmlFor="join-code">Party Name</label>
              </div>
            </div>
          </Fragment>
        )}
        {partyCreated && (
          <UsernameInput
            setUsername={setUsername}
            partyCode={this.partyCode}
            setViewState={setViewState}
          />
        )}
        <button
          className="btn back-btn pl-m blue-grey darken-2"
          type="button"
          onClick={() => {
            setViewState('HOME');
          }}
        >
          <i className="material-icons back-arrow">arrow_back</i>
          Go back to selection
        </button>
      </Container>
    );
  }
}

StartPartyContainer.propTypes = {
  setPartyCode: PropTypes.func.isRequired,
  setPartyName: PropTypes.func.isRequired,
  isHost: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setViewState: PropTypes.func.isRequired,
};

export default StartPartyContainer;
