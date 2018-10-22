import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../../config';

class SpotifyPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      authCode: null,
      accessToken: null,
      refreshToken: null,
    };
  }

  componentDidMount() {
    if (window.location.search) {
      this.setState({ authCode: new URL(document.location).searchParams.get('code') });
      window.history.pushState('', document.title, window.location.origin);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { authCode, accessToken } = this.state;
    if (authCode && authCode !== prevState.authCode) {
      this.getAccessToken();
    }

    if (accessToken && accessToken !== prevState.accessToken) {
      this.setupPlayerEvents();
    }
  }

  setupPlayerEvents = () => {
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

  getAccessToken = () => {
    const { authCode } = this.state;
    const url = new URL('https://accounts.spotify.com/api/token');
    url.search = new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: config.redirect_uri,
    });

    const encodedCodes = btoa(`${config.spotify_client_id}:${config.spotify_client_secret}`);

    fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      headers: new Headers({
        Authorization: `Basic ${encodedCodes}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    }).then(response => response.json().then((data) => {
      const { partyName } = this.props;
      const body = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
      };
      this.setState({ accessToken: data.access_token, refreshToken: data.refresh_token });
      fetch(`${config.url}party/${partyName}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body),
      });
    }));
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
  partyName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  playerIsReady: PropTypes.func.isRequired,
  setPlayerDeviceID: PropTypes.func.isRequired,
};

export default SpotifyPlayer;
