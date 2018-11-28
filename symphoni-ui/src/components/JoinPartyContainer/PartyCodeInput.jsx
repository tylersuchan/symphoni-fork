import React, { Component } from 'react';

import UserInput from './UserInput';
import config from '../../config';

class PartyCodeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: Array(6),
    };
  }

  // Calls backend API and URI to check if code is found
  // If URI has data, we know the code is in there, and we push the status up to the parent
  // ** NEEDS BACKEND ON AND RUNNING TO WORK **
  checkCode = (event) => {
    event.preventDefault();

    const { userCode } = this.state;
    const { changeFoundStatus } = this.props;
    const partyURI = `${config.url}party/${userCode.join('')}`;

    fetch(partyURI, {
      method: 'GET',
    }).then(response => response.json().then((data) => {
      if (data.code) {
        changeFoundStatus(true, data.code);
      } else {
        this.setState({ userCode: Array(6) });
        changeFoundStatus(false, []);
        return false;
      }
    }));
  };

  // Places values into array UpperCase since all party codes are uppercase with numbers
  // There are two events, one with a target and one with a key depending on how the user inputs the values
  arrayHandler = (i, event) => {
    const { userCode } = this.state;
    const inputVals = userCode.slice();
    if (event.target) {
      inputVals[i] = event.target.value.toUpperCase();
    } else {
      inputVals[i] = event.key;
    }
    this.setState({ userCode: inputVals });
  };

  render() {
    return (
      <div>
        <UserInput idx="0" onChange={this.arrayHandler} onKeyPress={this.checkCode} />
        <UserInput idx="1" onChange={this.arrayHandler} onKeyPress={this.checkCode} />
        <UserInput idx="2" onChange={this.arrayHandler} onKeyPress={this.checkCode} />
        <UserInput idx="3" onChange={this.arrayHandler} onKeyPress={this.checkCode} />
        <UserInput idx="4" onChange={this.arrayHandler} onKeyPress={this.checkCode} />
        <UserInput idx="5" onChange={this.arrayHandler} onKeyPress={this.checkCode} />
        <a className="waves-effect waves-light btn-small" onClick={this.checkCode}>
          <i className="material-icons">arrow_drop_down</i>
        </a>
        {/*
          Current Method of Clearing Values, Needs to Be Implemented :(
         <a className="waves-effect waves-light btn-small" onClick={this.handleClick}>
          <i className="material-icons">clear</i>
        </a> */}
      </div>
    );
  }
}

export default PartyCodeInput;
