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

  // class StartPartyContainer extends Component {
  // getPartyCodeOnEnter = (event) => {
  //   if (event.key === 'Enter') {
  //     const partyURI = `${config.url}party/${event.target.value}`;
  //     fetch(partyURI, {
  //       method: 'GET',
  //     }).then(response => response.json().then((data) => {
  //       const { partyCode } = this.props;
  //       partyCode(data.code);
  //     }));
  //   }
  // };

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
                  >
                    {this.state.codeFound === true && (
                      <button
                        type="button"
                        onClick={() => {
                          window.Materialize.toast({ html: 'Found the Code!' });
                        }}
                        className="btn"
                      >
                        {' '}
                        Party Found!
                        {' '}
                      </button>
                    )}
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