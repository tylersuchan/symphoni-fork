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
    return (
      <Container id="join">
        <div className="container" id="join-party">
          <div className="row">
            <div className="center" id="join">
              <h3> Room Code: </h3>
              <div className="flex-container">
                <div className="flex-horizontal-center input-field col s6">
                  <PartyCodeInput
                    changeFoundStatus={(status) => {
                      this.setState({ codeFound: status });
                    }}
                    changePartyStatus={(code) => {
                      const { setParty } = this.props;
                      setParty(code);
                    }}
                  >
                    {this.state.codeFound === true
                      && window.Materialize.toast('Success! Proceeding to Queue', 4000)}

                    {this.state.codeFound === false
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
  setParty: PropTypes.func.isRequired,
};

export default JoinPartyContainer;
