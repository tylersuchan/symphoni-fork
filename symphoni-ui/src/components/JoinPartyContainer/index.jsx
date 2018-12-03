import React, { Component } from 'react';
import './JoinPartyContainer.css';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import UsernameInput from '../Util/UsernameInput';
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
    const { setPartyCode, setViewState, setUsername } = this.props;

    return (
      <Container id="join" className="fullscreen">
        <div className=" container" id="join-party">
          <div className="flex-center row">
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
                      this.partyCode = code;
                      setPartyCode(code);
                    }}
                  >
                    {/* Checks if code is correct in child, if it is, pops up a success toast */}
                    {codeFound === true
                      && window.Materialize.toast('Success! Proceeding to Queue', 4000) && (
                        <UsernameInput
                          setUsername={setUsername}
                          partyCode={this.partyCode}
                          setViewState={setViewState}
                        />
                    )}

                    {codeFound === false
                      && window.Materialize.toast('Error Incorrect Input! Please Try Again', 4000)}
                  </PartyCodeInput>
                </div>
              </div>
            </div>
          </div>
        </div>
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

JoinPartyContainer.propTypes = {
  setPartyCode: PropTypes.func.isRequired,
  setViewState: PropTypes.func.isRequired,
};

export default JoinPartyContainer;
