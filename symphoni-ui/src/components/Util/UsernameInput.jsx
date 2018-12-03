import React, { Component } from 'react';
import config from '../../config';

class UsernameInput extends Component {
  constructor(props) {
    super(props);
    this.username = '';
  }

  addUserToParty = (event) => {
    const { key } = event;
    const { value } = event.target;
    const { partyCode, setUsername } = this.props;
    if (key === 'Enter') {
      const url = new URL(`${config.url}party/${partyCode}/user`);
      url.search = new URLSearchParams({ username: value });

      fetch(url, {
        method: 'PUT',
      }).then(response => response.json().then((data) => {
        if (response.ok) {
          setUsername(value);
          window.Materialize.toast('Username added to party successfuly.', 4000);
        } else if (data.message === 'User already exists please specify new username') {
          window.Materialize.toast(
            `The username ${value} already exists for the party with the code ${partyCode}. Please select a different username.`,
          );
        }
      }));
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col s12 input-field">
          <i className="material-icons prefix">face</i>
          <input
            id="icon_prefix"
            type="text"
            className="validate"
            onKeyPress={this.addUserToParty}
          />
          <label htmlFor="icon_prefix">Enter a username</label>
        </div>
      </div>
    );
  }
}

export default UsernameInput;
