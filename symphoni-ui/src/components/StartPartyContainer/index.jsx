import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import './StartPartyContainer.css';
import config from '../../config';

class StartPartyContainer extends Component {
  getPartyCodeOnEnter = (event) => {
    if (event.key === 'Enter') {
      const partyURI = `${config.url}party/${event.target.value}`;
      fetch(partyURI, {
        method: 'PUT',
      }).then(response => response.json().then((data) => {
        const { partyCode } = this.props;
        partyCode(data.code);
      }));
    }
  };

  render() {
    return (
      <Container id="start">
        <div className="center" id="start-party">
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
      </Container>
    );
  }
}

StartPartyContainer.propTypes = {
  partyCode: PropTypes.func.isRequired,
};

export default StartPartyContainer;