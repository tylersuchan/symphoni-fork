import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Util/Container';
import Login from '../Login';
import SpotifyPlayer from '../SpotifyPlayer';
import SpotifySearch from '../SpotifySearch';
import VotingButtons from './VotingButtons';
import style from './QueueContainer.css';
import config from '../../config';

class QueueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      playerIsReady: false,
      accessToken: localStorage.getItem('accessToken'),
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

  deleteFromPlaylist = (track_uri) => {
    const { partyCode } = this.props;
    const url = new URL(`${config.url}party/${partyCode}/playlist`);
    url.search = new URLSearchParams({ track_uri });
    fetch(url, {
      method: 'DELETE',
    }).then(response => response.json().then((data) => {
      if (response.ok) {
        this.setState({ playlist: data.party_data.playlist });
      }
    }));
  };

  render() {
    const { accessToken, playlist, playerIsReady } = this.state;
    const {
      partyCode, partyName, username, isHost, setViewState, allStates,
    } = this.props;

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
      <div className={`row ${style['queue-entry']}`} key={song.song.track_uri}>
        <div className="col s2">
          <img
            className="responsive-img"
            src={song.song.album_information.album_images[0].url}
            alt={song.song.album_information.album_name}
          />
        </div>
        <div className="col s6 max-height valign-wrapper">
          <div className="col s4">{song.song.track}</div>
          <div className="col s4">{song.song.artist_information[0].artist_name}</div>
          <div className="col s4">{song.song.album_information.album_name}</div>
        </div>
        <div className="col s2 flex-container">
          <VotingButtons partyCode={partyCode} username={username} trackURI={song.song.track_uri} />
        </div>
        <div className="col s2">
          <button
            type="button"
            onClick={() => {
              this.deleteFromPlaylist(song.song.track_uri);
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    ));

    const setAccessToken = (newAccessToken) => {
      localStorage.setItem('accessToken', newAccessToken);
      this.setState({ accessToken: newAccessToken });
    };

    const lastState = allStates[allStates.length - 2];

    return (
      <div className={style['queue-container']}>
        {!accessToken && (
          <Fragment>
            <Container id="queue" className="fullscreen">
              <Login partyCode={partyCode} setAccessToken={setAccessToken} />
            </Container>
          </Fragment>
        )}
        {accessToken && (
          <Fragment>
            <Container id="queue" className="fullscreen">
              <div className="row grey lighten-3">
                <div className="col s4">
                  <SpotifySearch
                    partyCode={partyCode}
                    updatePlaylist={this.updatePlaylist}
                    setAccessToken={setAccessToken}
                  />
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
                  <div className="offset-s2 col s2">
                    <b>Title</b>
                  </div>
                  <div className="col s2">
                    <b>Artist</b>
                  </div>
                  <div className="col s2">
                    <b>Album</b>
                  </div>
                  <div className="col s2 center">
                    <b>Votes</b>
                  </div>
                </div>
                <div className="row">{songs}</div>
              </div>
              <SpotifyPlayer {...playerProps} />
            </Container>
          </Fragment>
        )}
        <button
          className={`btn ${style['queue-back-btn']} pl-m blue-grey darken-2`}
          type="button"
          onClick={() => {
            setViewState(lastState);
          }}
        >
          <i className="material-icons back-arrow">arrow_back</i>
          Go back to
          {lastState === 'JOIN' ? ' JOIN' : ' START'}
        </button>
      </div>
    );
  }
}

QueueContainer.propTypes = {
  partyCode: PropTypes.string.isRequired,
  partyName: PropTypes.string.isRequired,
  isHost: PropTypes.bool.isRequired,
  setViewState: PropTypes.func.isRequired,
  allStates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QueueContainer;
