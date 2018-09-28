import React from 'react';

const Container = (props) => {
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
