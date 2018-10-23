import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../../config';

class SpotifyPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      accessToken: null,
      refreshToken: null,
    };
  }

  componentDidMount() {
    if (window.location.search) {
      const parameters = new URL(document.location).searchParams;
      const access_token = parameters.get('access_token');
      const refresh_token = parameters.get('refresh_token');
      const { partyCode } = this.props;
      // window.history.pushState('', document.title, window.location.origin);

      this.setState({
        accessToken: access_token,
        refreshToken: refresh_token,
      });

      const body = {
        access_token,
        expires_in: 3600,
        refresh_token,
      };

      fetch(`${config.url}token/${partyCode}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { accessToken } = this.state;
    if (accessToken && accessToken !== prevState.accessToken) {
      this.setupPlayerEvents();
    }
  }

  waitForSpotify = () => new Promise((resolve) => {
    if ('Spotify' in window) {
      resolve();
    } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve();
      };
    }
  });

  setupPlayerEvents = async () => {
    await this.waitForSpotify();
    const { accessToken } = this.state;
    const {
      volume, name, playerIsReady, setPlayerDeviceID,
    } = this.props;
    const playerOptions = {
      name,
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
      volume,
    };
    const player = new window.Spotify.Player(playerOptions);
    this.setState({ player });

    player.on('ready', ({ device_id }) => {
      setPlayerDeviceID(device_id);
      playerIsReady();
    });

    player.connect();
  };

  play = (deviceId) => {
    const url = new URL('https://api.spotify.com/v1/me/player/play');
    const { accessToken } = this.state;
    console.log(accessToken);
    url.search = new URLSearchParams({ device_id: deviceId });
    fetch(url, {
      method: 'PUT',
      // mode: 'no-cors',
      body: '{"uris": ["spotify:track:5ya2gsaIhTkAuWYEMB0nw5"]}',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    });
  };

  render() {
    return <div />;
  }
}

SpotifyPlayer.propTypes = {
  partyCode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  playerIsReady: PropTypes.func.isRequired,
  setPlayerDeviceID: PropTypes.func.isRequired,
};

export default SpotifyPlayer;
