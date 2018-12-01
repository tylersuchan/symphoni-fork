import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import config from '../../config';
import './StartPartyContainer.css';

class StartPartyContainer extends Component {
  getPartyCodeOnEnter = (event) => {
    if (event.key === 'Enter') {
      const partyURI = `${config.url}party/${event.target.value}`;
      fetch(partyURI, {
        method: 'PUT',
      }).then(response => response.json().then((data) => {
        const {
          setPartyCode,
          setPartyName,
          toggleIsHost,
          toggleInParty,
          toggleShowStart,
        } = this.props;

        if (response.ok) {
          setPartyCode(data.code);
          setPartyName(data.party_data.name);
          toggleIsHost();
          toggleInParty();
          toggleShowStart();
          window.Materialize.toast('Party created successfully!', 4000);
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
    return (
      <Container id="start" className="fullscreen">
        <div className="center" id="start-party">
          <h3> Start Party Here!</h3>
          <h5> Insert Party Name</h5>
        </div>
        <div className="flex-container">
          <div className="flex-horizontal-center input-field col s6">
            <i className="material-icons prefix">music_note</i>
            <input
              className="enterParty"
              id="join-code"
              type="text"
              onKeyPress={(event) => {
                this.getPartyCodeOnEnter(event);
              }}
            />
            <label htmlFor="join-code">Party Name</label>
          </div>
        </div>
      </Container>
    );
  }
}

StartPartyContainer.propTypes = {
  setPartyCode: PropTypes.func.isRequired,
  setPartyName: PropTypes.func.isRequired,
  toggleShowStart: PropTypes.func.isRequired,
  toggleInParty: PropTypes.func.isRequired,
  toggleIsHost: PropTypes.func.isRequired,
};

export default StartPartyContainer;
