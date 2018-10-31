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
                    changeFoundStatus={(status) => {
                      this.setState({ codeFound: status });
                    }}
                    // IF code found is true toast returns Found Code!
                  >
                    {this.state.codeFound === true && (
                     <button onClick={() => {window.Materialize.toast('Success! Proceeding to Queue', 10000)} } />
                     )
                    }
                  
                   // IF code not found toast returns Error, should send a delete all down to the child
                   {this.state.codeFound === false && (
                     <button onClick={() => {window.Materialize.toast('Error Incorrect Input!', 10000)} }/>
                     )
                    }
                  </PartyCodeInput>
                  <label htmlFor="join-code" />
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
