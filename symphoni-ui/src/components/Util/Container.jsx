import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { $ } = window;

class Container extends Component {
  componentDidMount() {
    $('.scrollspy').scrollSpy();
    $('.collapsible').collapsible();
  }

  render() {
    const { children, id, className } = this.props;
    return (
      <div className={`container scrollspy ${className}`} id={id}>
        <div className="row">{children}</div>
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Container;
