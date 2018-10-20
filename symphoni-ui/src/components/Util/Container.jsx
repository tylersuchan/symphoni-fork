import React, { Component } from 'react';

import PropTypes from 'prop-types';

const { $ } = window;
class Container extends Component {
  componentDidMount() {
    $('.scrollspy').scrollSpy();
    $('.collapsible').collapsible();
  }

  render() {
    const { children, id } = this.props;
    return (
      <div className="container scrollspy" id={id}>
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
  id: PropTypes.string.isRequired,
};
export default Container;
