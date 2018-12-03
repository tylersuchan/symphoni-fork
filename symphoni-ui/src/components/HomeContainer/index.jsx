import React from 'react';
import PropTypes from 'prop-types';
import './HomeContainer.css';

const HomeContainer = (props) => {
  const { setViewState } = props;
  return (
    <div>
      <header className="fullscreen flex-container">
        <div className="flex-center">
          <a
            className="mr-s waves-effect waves-light btn-large z-depth-3 blue-grey"
            href="#start"
            id="start-button"
            onClick={() => {
              setViewState('START');
            }}
          >
            Start Party!
          </a>
          <a
            className="ml-s pl-m pr-m waves-effect waves-light btn-large z-depth-3 blue-grey"
            href="#join"
            id="join-button"
            onClick={() => {
              setViewState('JOIN');
            }}
          >
            Join Party!
          </a>
        </div>
      </header>
    </div>
  );
};

HomeContainer.propTypes = {
  setViewState: PropTypes.func.isRequired,
};

export default HomeContainer;
