import React from 'react';
import PropTypes from 'prop-types';
import './HomeContainer.css';

const HomeContainer = (props) => {
  const { toggleShowStart, toggleShowJoin, toggleShowHome } = props;
  return (
    <div>
      <header className="fullscreen flex-container">
        <div className="flex-center">
          <a
            className="mr-s waves-effect waves-light btn-large z-depth-3 blue-grey"
            href="#start"
            id="start-button"
            onClick={() => {
              toggleShowStart();
              toggleShowHome();
            }}
          >
            Start Party!
          </a>
          <a
            className="ml-s pl-m pr-m waves-effect waves-light btn-large z-depth-3 blue-grey"
            href="#join"
            id="join-button"
            onClick={() => {
              toggleShowJoin();
              toggleShowHome();
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
  toggleShowHome: PropTypes.func.isRequired,
  toggleShowStart: PropTypes.func.isRequired,
  toggleShowJoin: PropTypes.func.isRequired,
};

export default HomeContainer;
