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

    // Styling grandparent with transform allowed grandchild to be moved relative to grandparent as long as the child has a fixed positioning
    const gpStyle = {
      position: 'relative',
      transform: 'rotate(0deg)',
    };

    return (
      <div className={`container scrollspy ${className}`} id={id} style={gpStyle}>
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
