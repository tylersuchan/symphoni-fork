import React from 'react';
import './StartPartyContainer.css';
import Container from '../Util/Container';

const StartPartyContainer = () => (
  <Container>
    <div className="center" id="start-party">
      <h3> Start Party Here!</h3>
      <h5> Insert Party Name</h5>
    </div>
    <div className="flex-container">
      <div className="flex-horizontal-center input-field col s6">
        <i className="material-icons prefix">music_note</i>
        {' '}
        <input id="join-code" type="text" />
        <label htmlFor="join-code">Party Name</label>
      </div>
    </div>
  </Container>
);

export default StartPartyContainer;
