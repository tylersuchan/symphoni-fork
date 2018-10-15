import React from 'react';
import './JoinPartyContainer.css';
import Container from '../Util/Container';

const JoinPartyContainer = () => (
  <Container id="join">
    <div className="container" id="join-party">
      <div className="row">
        <div className="center" id="join">
          <h3> Enter Room Code: </h3>
          <div className="flex-container">
            <div className="flex-horizontal-center input-field col s6">
              {' '}
              <input id="join-code" type="text" data-length="6" maxLength="6" />
              <label htmlFor="join-code">Room Code</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default JoinPartyContainer;
