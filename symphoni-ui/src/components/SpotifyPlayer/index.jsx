import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SpotifyPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.deviceID = undefined;
    // this.state = { refreshInterval: setInterval(this.refreshTokens, 36000) };
  }

  componentWillMount() {
    this.setupPlayer();
  }

  componentDidMount() {
    const { playlist } = this.props;
    if (playlist.length > 0) {
      const songURIs = playlist.map(song => song.song_uri);
      this.play(this.deviceID, songURIs);
    }
  }

  refreshTokens = () => {};

  waitForSpotify = () => new Promise((resolve) => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      resolve();
    };
  });

  setupPlayer = async () => {
    await this.waitForSpotify();
    const {
      accessToken, volume, name, playerIsReady,
    } = this.props;
    const playerOptions = {
      name,
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
      volume,
    };
    const player = new window.Spotify.Player(playerOptions);
    this.player = player;

    player.on('ready', ({ device_id }) => {
      this.deviceID = device_id;
      playerIsReady();
    });

    player.connect();
  };

  play = (deviceId, songURIs) => {
    const url = new URL('https://api.spotify.com/v1/me/player/play');
    url.search = new URLSearchParams({ device_id: deviceId });

    const { accessToken } = this.props;

    const body = {
      uris: songURIs,
    };

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col s6 offset-s4">
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (this.player) this.player.previousTrack();
            }}
          >
            <i className="material-icons">fast_rewind</i>
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              this.player.getCurrentState().then((state) => {
                console.log(state);
                if (!state && this.props.playlist.length > 0) {
                  const songURIs = this.props.playlist.map(song => song.song.track_uri);
                  this.play(this.deviceID, songURIs);
                } else if (state.paused) {
                  this.player.resume();
                } else {
                  this.player.pause();
                }
              });
            }}
          >
            <i className="material-icons">play_circle_filled</i>
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (this.player) this.player.nextTrack();
            }}
          >
            <i className="material-icons">fast_forward</i>
          </button>
        </div>
      </div>
    );
  }
}

SpotifyPlayer.propTypes = {
  partyCode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  playerIsReady: PropTypes.func.isRequired,
};

export default SpotifyPlayer;
