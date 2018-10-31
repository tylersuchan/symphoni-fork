import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import Login from '../Login';
import SpotifyPlayer from '../SpotifyPlayer';
import SpotifySearch from '../SpotifyPlayer/SpotifySearch';
import config from '../../config';
import './QueueContainer.css';

class QueueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      playerIsReady: false,
      accessToken: undefined,
    };
  }

  componentWillMount() {
    this.updatePlaylist();
  }

  updatePlaylist = () => {
    const { partyCode } = this.props;
    if (partyCode) {
      const url = `${config.url}party/${partyCode}/playlist`;
      fetch(url, {
        method: 'GET',
      }).then(response => response.json().then((data) => {
        if (response.ok) {
          this.setState({ playlist: data.playlist });
        }
      }));
    }
  };

  render() {
    const { accessToken, playlist, playerIsReady } = this.state;
    const { partyCode, partyName } = this.props;

    const playerProps = {
      partyCode,
      accessToken,
      playlist,
      name: 'Symphoni Music Player',
      volume: 0.5,
      playerIsReady: () => {
        this.setState({ playerIsReady: !playerIsReady });
      },
    };

    const songs = playlist.map(song => (
      <div className="row queue-entry">
        <div className="col s2">
          <img
            className="responsive-img"
            src={song.song.album_information.album_images[0].url}
            alt={song.song.album_information.album_name}
          />
        </div>
        <div className="col s10 max-height valign-wrapper">
          <div className="col s4">{song.song.track}</div>
          <div className="col s4">{song.song.artist_information[0].artist_name}</div>
          <div className="col s4">{song.song.album_information.album_name}</div>
        </div>
      </div>
    ));

    return (
      <Container id="queue">
        {!accessToken && (
          <Fragment>
            <Login
              setAccessToken={(newAccessToken) => {
                this.setState({ accessToken: newAccessToken });
              }}
              partyCode={partyCode}
            />
          </Fragment>
        )}
        {accessToken && (
          <Fragment>
            <div className="row grey lighten-3">
              <div className="col s4">
                <SpotifySearch partyCode={partyCode} updatePlaylist={this.updatePlaylist} />
              </div>
              <div className="col s4 center">
                <h5>{`${partyName}'s Playlist`}</h5>
              </div>
              <div className="col s4">
                <h5>{`Party Code: ${partyCode}`}</h5>
              </div>
            </div>
            <div className="row grey lighten-2 p-s">
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
              <div className="row">{songs}</div>
            </div>

            <SpotifyPlayer {...playerProps} />
          </Fragment>
        )}
      </Container>
    );
  }
}

QueueContainer.propTypes = {
  partyCode: PropTypes.string,
  partyName: PropTypes.string,
  isHost: PropTypes.bool,
};

export default QueueContainer;
