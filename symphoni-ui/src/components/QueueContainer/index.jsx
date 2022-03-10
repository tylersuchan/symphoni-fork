import React, { Fragment, Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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
      tokenInterval: setInterval(this.refreshAccessToken, 3500000),
    };
  }

  componentWillMount() {
    this.updatePlaylist();
  }

  componentWillUnmount() {
    const { tokenInterval } = this.state;
    clearInterval(tokenInterval);
  }

  refreshAccessToken = () => {
    const { accessToken } = this.state;
    if (accessToken) {
      const { partyCode } = this.props;
      const url = `${config.url}token/${partyCode}`;
      fetch(url, {
        method: 'GET',
      }).then(response => response.json().then((data) => {
        if (response.ok) {
          this.setState({ accessToken: data.access_token });
        }
      }));
    }
  };

  updatePlaylist = () => {
    const { partyCode } = this.props;
    if (partyCode) {
      const url = `${config.url}party/${partyCode}/playlist`;
      fetch(url, {
        method: 'GET',
      }).then(response => response.json().then((data) => {
        if (response.ok) {
          this.setState({ playlist: data.playlist });
        } else {
          this.setState({ playlist: [] });
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
      partyCode, partyName, username, setViewState, allStates,
    } = this.props;
    const lastState = allStates[allStates.length - 2];

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
      <div className="col s12 card-panel valign-wrapper" key={song.song.track_uri}>
        <div className="col s2">
          <img
            className="responsive-img valign-wrapper"
            src={song.song.album_information.album_images[0].url}
            alt={song.song.album_information.album_name}
          />
        </div>
        <div className="col s6 max-height">
          <div className="col s4 truncate">{song.song.track}</div>
          <div className="col s4 truncate">{song.song.artist_information[0].artist_name}</div>
          <div className="col s4 truncate">{song.song.album_information.album_name}</div>
        </div>
        <div className="col s2 flex-container">
          <VotingButtons
            setPlayList={(newPlayList) => {
              this.setState({ playlist: newPlayList });
            }}
            partyCode={partyCode}
            username={username}
            trackURI={song.song.track_uri}
          />
        </div>
        <div className="col s2 center">
          <button
            type="button"
            className="btn-floating red accent-4 white-text"
            onClick={() => {
              this.deleteFromPlaylist(song.song.track_uri);
            }}
          >
            <i className="material-icons">remove</i>
          </button>
        </div>
      </div>
    ));

    return (
      <div>
        {!accessToken && (
          <Fragment>
            <Container id="queue" className="fullscreen">
              <Login
                partyCode={partyCode}
                setAccessToken={(newAccessToken) => {
                  localStorage.setItem('accessToken', newAccessToken);
                  this.setState({ accessToken: newAccessToken });
                }}
              />
            </Container>
          </Fragment>
        )}
        {accessToken && (
          <Fragment>
            <Container id="queue" className="fullscreen grey lighten-3">
              <div className="col s4">
                <SpotifySearch partyCode={partyCode} updatePlaylist={this.updatePlaylist} />
              </div>
              <div className="col s4 center">
                <h5>{`${partyName}'s Playlist`}</h5>
              </div>
              <div className="col s4">
                <h5>{`Party Code: ${partyCode}`}</h5>
              </div>
              <div className="col s12 grey lighten-2 p-s center">
                <div className="mt-xxs mb-0">
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
              </div>
              <div className="row">
                <CSSTransitionGroup
                  transitionName={{
                    enter: style['slide-in-enter'],
                    enterActive: style['slide-in-enter-active'],
                    leave: style['slide-out-leave'],
                    leaveActive: style['slide-out-leave-active'],
                  }}
                  transitionEnterTimeout={1000}
                  transitionLeaveTimeout={1000}
                >
                  {songs}
                </CSSTransitionGroup>
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
