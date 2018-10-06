import React from 'react';
import PropTypes from 'prop-types';

const Container = (props) => {
  Container.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const { children } = props;
  return (
    <div className="container" id="start">
      <div className="row">
        {' '}
        {children}
        {' '}
      </div>
    </div>
  );
};

export default Container;
