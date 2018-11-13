import React, { Component } from 'react';
import './JoinPartyContainer.css';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: '_',
      backSpaceCount: 0,
    };
    this.baseState = '_';
  }

  handleInput = (event) => {
    if (event.target.value) {
      const { value } = event.target;
      const { onChange, idx } = this.props;
      this.setState({ startValue: value });
      onChange(idx, event);
      if (value.length === 1 || value.length === 0) {
        if (this.myTextInput.nextSibling && this.myTextInput.nextSibling.value === '') {
          this.myTextInput.nextSibling.focus();
        }
      }
    } else {
      this.setState({ startValue: event.key });
      this.props.onChange(this.props.idx, event);
    }
  };

  handlePress = (event) => {
    // BACKSPACE EVENT- Deletes value(Sets its value back to), then moves focus backward and

    if (
      (event.keyCode >= 48 && event.keyCode <= 57)
      || (event.keyCode >= 65 && event.keyCode <= 90)
    ) {
      event.preventDefault();
      const { value } = event.target;
      const { onChange, idx } = this.props;
      this.setState({ startValue: value });
      this.myTextInput.value = event.key;
      onChange(idx, event);
      if (this.myTextInput.nextSibling) {
        this.myTextInput.nextSibling.focus();
      }
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      const { onChange, idx } = this.props;
      const { backSpaceCount } = this.state;
      this.myTextInput.value = '';
      this.setState(preState => ({
        backSpaceCount: preState.backSpaceCount + 1,
        value: '',
      }));
      onChange(idx, event);
      if (
        this.myTextInput.previousSibling
        && backSpaceCount % 2 === 1
        && backSpaceCount > 0
        && this.myTextInput.previousSibling
      ) {
        this.myTextInput.previousSibling.focus();
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
    const { foundError } = this.props;
    if (foundError) {
      this.setState({ startValue: '_' });
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
        style={{ textTransform: 'uppercase' }}
      />
    );
  }
}
export default UserInput;
