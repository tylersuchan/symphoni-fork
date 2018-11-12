import React, { Component } from 'react';
import './JoinPartyContainer.css';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '_',
      backSpaceCounts: 0,
    };
    this.baseState = '_';
  }

  handleInput = (event) => {
    if (event.target.value) {
      const { value } = event.target;
      this.setState({ value: event.target.value });
      this.props.onChange(this.props.idx, event);
      if (value.length === 1 || value.length === 0) {
        if (this.myTextInput.nextSibling) {
          this.myTextInput.nextSibling.focus();
        }
      }
    } else {
      this.setState({ value: event.key });
      this.props.onChange(this.props.idx, event.key);
    }
  };

  handlePress = (event) => {
    // BACKSPACE EVENT- Deletes value(Sets its value back to), then moves focus backward and

    // if ((event.key >= 48 && event.key <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)) {
    //   event.preventDefault();
    //   this.myTextInput.value = event.key;
    //   if (this.myTextInput.nextSibling) {
    //     this.myTextInput.nextSibling.focus();
    //   }
    // }

    if (event.key === 'Backspace') {
      event.preventDefault();
      this.myTextInput.value = '';
      this.setState(prevState => ({ backSpaceCounts: prevState.count + 1, value: ' ' }));
      this.props.onChange(this.props.idx, event);
      if (this.state.backSpaceCounts % 2 === 0) {
        if (this.myTextInput.previousSibling) {
          this.myTextInput.previousSibling.focus();
        }
      }
    }

    // Left arrow key does the same thing as backspace without deletion
    if (event.key === 'ArrowLeft') {
      if (this.myTextInput.previousSibling) {
        event.preventDefault();
        this.myTextInput.previousSibling.focus();
      }
    }

    // Right arrow key just traverses right on the values
    if (event.key === 'ArrowRight') {
      if (this.myTextInput.nextSibling) {
        this.myTextInput.nextSibling.focus();
      }
    }
  };

  handleError = (event) => {
    if (this.props.foundError) {
      this.setState({ value: '_' });
    }
  };

  render() {
    return (
      <input
        ref={(input) => {
          this.myTextInput = input;
        }}
        onChange={this.handleInput}
        onKeyDown={this.handlePress}
        placeholder="_"
        maxLength="1"
        // onKeyPress={this.handlePress}
        style={{ textTransform: 'uppercase' }}
      />
    );
  }
}
export default UserInput;
