import React, { Component } from 'react';

class NowPlaying extends Component {
  state = {};

  render() {
    const { nowPlayingData } = this.props;
    const trackData = nowPlayingData.current_track;
    return (
      <div className="row">
        <div className="col s12 center">
          {trackData.name}
⋅
          {trackData.artists[0].name}
        </div>
      </div>
    );
  }
}

export default NowPlaying;
