import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import UsernameInput from '../Util/UsernameInput';
import config from '../../config';

class StartPartyContainer extends Component {
  constructor(props) {
    super(props);
    this.partyCode = undefined;
    this.state = { partyCreated: false };
  }

  getPartyCodeOnEnter = (event) => {
    if (event.key === 'Enter') {
      const partyURI = `${config.url}party/${event.target.value}`;
      fetch(partyURI, {
        method: 'PUT',
      }).then(response => response.json().then((data) => {
        const { setPartyCode, setPartyName, isHost } = this.props;
        if (response.ok) {
          this.partyCode = data.code;
          setPartyCode(this.partyCode);
          setPartyName(data.party_data.name);
          isHost();
          window.Materialize.toast('Party created successfully!', 4000);
          this.setState({ partyCreated: true });
        }
      }));
    }
  };

  render() {
    const { partyCreated } = this.state;
    const { setUsername } = this.props;

    return (
      <Container id="start" className="page-header">
        {!partyCreated && (
          <Fragment>
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
          </Fragment>
        )}
        {partyCreated && <UsernameInput setUsername={setUsername} partyCode={this.partyCode} />}
      </Container>
    );
  }
}

StartPartyContainer.propTypes = {
  setPartyCode: PropTypes.func.isRequired,
  setPartyName: PropTypes.func.isRequired,
  isHost: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default StartPartyContainer;
