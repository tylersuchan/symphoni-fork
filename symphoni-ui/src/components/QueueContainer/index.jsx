import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import Login from '../Login';
import SpotifyPlayer from '../SpotifyPlayer';
import config from '../../config';
import './QueueContainer.css';

class QueueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      authenticated: false,
      playerIsReady: false,
      player: undefined,
    };
  }

  componentWillMount() {
    const { code } = this.props;

    if (code) {
      const url = `${config.url}party/${code}playlist`;
      fetch(url, {
        method: 'GET',
      }).then(response => response.json().then((data) => {
        this.setState({ playlist: data.results });
      }));
    }
  }

  render() {
    const { authenticated, playlist, playerIsReady } = this.state;
    const { partyName, code } = this.props;

    const playerProps = {
      partyName,
      name: 'Symphoni Music Player',
      volume: 0.5,
      playerIsReady: () => {
        this.setState({ playerIsReady: !playerIsReady });
      },
      setPlayerDeviceID: (deviceID) => {
        this.setState({ deviceID });
      },
      setPlayer: (player) => {
        this.setState({ player });
      },
    };

    const songs = playlist.map(song => (
      <div className="row queue-entry">
        <div className="col s2">
          <img
            className="responsive-img"
            src={song.album_information.album_images.url}
            alt={song.album_information.album_name}
          />
        </div>
        <div className="col s10 max-height valign-wrapper">
          <div className="col s4">{song.track}</div>
          <div className="col s4">{song.artist_information[0].artist_name}</div>
          <div className="col s4">{song.album_information.album_name}</div>
        </div>
      </div>
    ));

    return (
      <Container id="queue">
        {!authenticated && (
          <Fragment>
            <Login
              setAuthenticated={isAuthenticated => this.setState({ authenticated: isAuthenticated })
              }
            />
          </Fragment>
        )}
        {authenticated && (
          <Fragment>
            <SpotifyPlayer {...playerProps} />
            <h3 className="ml-xs">Your Playlist:</h3>
            <br />
            <div className="row mt-xxs mb-0">
              <div className="offset-s2 col s10">
                <div className="col s4">
                  <b>Title</b>
                </div>
                <div className="col s4">
                  <b>Artist</b>
                </div>
                <div className="col s4">
                  <b>Album</b>
                </div>
              </div>
            </div>
            {songs}
          </Fragment>
        )}
      </Container>
    );
  }
}

QueueContainer.propTypes = {
  code: PropTypes.string.isRequired,
};

export default QueueContainer;
