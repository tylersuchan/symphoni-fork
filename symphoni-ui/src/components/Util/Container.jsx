import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Container extends Component {
  componentDidMount() {
    $('.scrollspy').scrollSpy();
  }

  render() {
    const { children } = this.props;
    return (
      <div className="container scrollspy" id="start">
        <div className="row">
          {' '}
          {children}
          {' '}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
