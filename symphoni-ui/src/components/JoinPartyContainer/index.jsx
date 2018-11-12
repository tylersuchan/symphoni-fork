import React, { Component } from 'react';
import './JoinPartyContainer.css';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import PartyCodeInput from './PartyCodeInput';

class JoinPartyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyCode: '',
      partyName: '',
      codeFound: null,
    };
  }

  render() {
    return (
      <Container id="join">
        <div className="container" id="join-party">
          <div className="row">
            <div className="center" id="join">
              <h3> Enter Room Code: </h3>
              <div className="flex-container">
                <div className="flex-horizontal-center input-field col s6">
                  <PartyCodeInput
                    changeFoundStatus={(status, code, name) => {
                      this.setState({ codeFound: status, partyCode: code, partyName: name });
                      const { partyCode, partyName } = this.props;
                      partyCode(code);
                      partyName(name);
                    }}
                  >
                    {this.state.codeFound === true
                      && window.Materialize.toast('Success! Proceeding to Queue', 4000)}

                    {this.state.codeFound === false
                      && window.Materialize.toast('Error Incorrect Input!', 4000)}
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
  setPartyName: PropTypes.func.isRequired,
};

export default JoinPartyContainer;
