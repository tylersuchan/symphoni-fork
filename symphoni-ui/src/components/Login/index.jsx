import React, { Component } from 'react';
import config from '../../config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (new URL(document.location).searchParams.get('code')) {
      const { setAuthenticated } = this.props;
      setAuthenticated(true);
    }
  }

  authenticate = () => {
    const url = new URL('https://accounts.spotify.com/en/authorize?client_id=08925fe22f0f4ebea80ffc92634bb0e0&response_type=code&redirect_uri=http:%2F%2Flocalhost:3000&scope=user-library-read');
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
      <div className="flex-container">
        <button type="button" onClick={this.authenticate} className="flex-horizontal-center btn">
          Login to Spotify
        </button>
      </div>
    );
  }
}

export default Login;
