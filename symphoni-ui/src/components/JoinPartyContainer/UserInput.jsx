import React, { Component } from 'react';
import './JoinPartyContainer.css';

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '_'
        };
    }

    keyhandler = (event) => {
        this.props.onChange(this.props.idx, event); // event.target.value = event.key;
    }

    render() { 
        return ( <input placeholder={this.state.value} onChange={this.keyhandler} maxLength="1"></input> );
    }
}
export default UserInput;