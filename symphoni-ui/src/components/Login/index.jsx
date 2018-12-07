import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../../config';
import './Login.css';

class Login extends Component {
  componentWillMount() {
    // When the component is about to mount, check if the spotify access token and refresh tokens are in uri
    // If they are, propograte them up to the parent state and send that data to the API
    if (window.location.search) {
      const parameters = new URL(document.location).searchParams;
      const accessToken = parameters.get('access_token');
      const refreshToken = parameters.get('refresh_token');
      const { partyCode, setAccessToken } = this.props;
      window.history.pushState('', document.title, window.location.origin);

      setAccessToken(accessToken);

      const body = {
        access_token: accessToken,
        expires_in: 3600,
        refresh_token: refreshToken,
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

  authenticate = () => {
    const url = new URL('https://accounts.spotify.com/authorize');
    url.search = new URLSearchParams({
      client_id: config.spotify_client_id,
      response_type: 'code',
      redirect_uri: config.redirect_uri,
      scope: ['streaming', 'user-read-birthdate', 'user-read-email', 'user-read-private'],
    });

    window.location.replace(url);
  };

  render() {
    return (
      <div className="flex-container fullscreen ">
        <div className="flex-center">
          <button
            type="button"
            onClick={this.authenticate}
            className="flex-horizontal-center btn spotifyLogin"
          >
            Login to Spotify
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  partyCode: PropTypes.string.isRequired,
  setAccessToken: PropTypes.func.isRequired,
};

export default Login;
