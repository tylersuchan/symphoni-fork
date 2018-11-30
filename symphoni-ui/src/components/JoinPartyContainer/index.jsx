import React, { Component } from 'react';
import './JoinPartyContainer.css';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import PartyCodeInput from './PartyCodeInput';

class JoinPartyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeFound: null,
    };
  }

  render() {
    const { codeFound } = this.state;
    const {
      setPartyCode, toggleShowJoin, isHost, inParty,
    } = this.props;

    return (
      <Container id="join" className="fullscreen">
        <div className="container" id="join-party">
          <div className="row">
            <div className="center" id="join">
              <h3> Room Code: </h3>
              <div className="flex-container">
                <div className="flex-horizontal-center input-field col s6">
                  <PartyCodeInput
                    // Grabs Status from child if it did or didn't find the code
                    changeFoundStatus={(status) => {
                      this.setState({ codeFound: status });
                    }}
                    changePartyStatus={(code) => {
                      setPartyCode(code);
                    }}
                  >
                    {/* Checks if code is correct in child, if it is, pops up a success toast */}
                    {codeFound === true
                      && window.Materialize.toast('Success! Proceeding to Queue', 4000)
                      && inParty()
                      && toggleShowJoin()}

                    {codeFound === false
                      && window.Materialize.toast('Error Incorrect Input! Please Try Again', 4000)}
                  </PartyCodeInput>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

JoinPartyContainer.propTypes = {
  setPartyCode: PropTypes.func.isRequired,
  toggleShowJoin: PropTypes.func.isRequired,
  isHost: PropTypes.func.isRequired,
  inParty: PropTypes.func.isRequired,
};

export default JoinPartyContainer;
