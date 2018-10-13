import React from 'react';

const PartyButtonContainer = () => (
  <div className="flex-center">
    <a
      className=" waves-effect waves-light btn-large z-depth-3 pulse"
      href="#join"
      id="join-button"
    >
      Join Party
    </a>
    <a
      className="waves-effect waves-light btn-large z-depth-3 pulse"
      href="#start"
      id="start-button"
    >
      Start Party!
    </a>
  </div>
);

export default PartyButtonContainer;
