import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NowPlaying from './NowPlaying';
import config from '../../config';

class SpotifyPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.deviceID = undefined;
    this.state = {
      nowPlayingData: undefined,
      songTotalTime: undefined,
      songCurrentTime: undefined,
      loadingBarPosition: {
        width: '0%',
      },
    };
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

  componentWillUnmount() {
    clearInterval(this.songTimeInterval);
  }

  updateSongTime = () => {
    this.player.getCurrentState().then((state) => {
      if (state) {
        const { position, duration } = state;

        const songSecondsCurrent = Math.round(position / 1000) % 60;
        const songMinutesCurrent = Math.floor(position / 60000);
        const songSecondsTotal = Math.round(duration / 1000) % 60;
        const songMinutesTotal = Math.floor(duration / 60000);
        const songCurrentTime = songSecondsCurrent > 9
          ? `${songMinutesCurrent}:${songSecondsCurrent}`
          : `${songMinutesCurrent}:0${songSecondsCurrent}`;
        const songTotalTime = songSecondsTotal > 9
          ? `${songMinutesTotal}:${songSecondsTotal}`
          : `${songMinutesTotal}:0${songSecondsTotal}`;
        const loadingBarPosition = `${(position / duration) * 100}%`;

        this.setState({ songCurrentTime, songTotalTime, loadingBarPosition });
      }
    });
  };

  waitForSpotify = () => new Promise((resolve) => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      resolve();
    };
  });

  setupPlayer = async () => {
    await this.waitForSpotify();
    const {
      accessToken, volume, name, playerIsReady, partyCode,
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
      this.songTimeInterval = setInterval(this.updateSongTime, 1000);
      this.refreshInterval = setInterval(this.refreshTokens, 3600000);
      playerIsReady();
    });

    player.on('player_state_changed', (playbackState) => {
      const { track_window } = playbackState;

      this.setState({
        nowPlayingData: track_window,
      });
    });

    player.on('authentication_error', () => {
      const { setAccessToken } = this.props;
      const url = `${config.url}token/${partyCode}`;
      fetch(url, {
        method: 'GET',
      }).then(response => response.json().then((data) => {
        setAccessToken();
      }));
      localStorage.clear();
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
    const {
      nowPlayingData, loadingBarPosition, songCurrentTime, songTotalTime,
    } = this.state;
    const { playlist } = this.props;

    return (
      <div>
        {nowPlayingData && <NowPlaying nowPlayingData={nowPlayingData} />}

        <div className="row">
          <div className="col s6 offset-s4 ">
            <button
              type="button"
              className="btn blue-grey"
              onClick={() => {
                if (this.player) this.player.previousTrack();
              }}
            >
              <i className="material-icons">fast_rewind</i>
            </button>
            <button
              type="button"
              className="btn blue-grey"
              onClick={() => {
                this.player.getCurrentState().then((state) => {
                  if (!state && playlist.length > 0) {
                    const songURIs = playlist.map(song => song.song.track_uri);
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
              className="btn blue-grey"
              onClick={() => {
                if (this.player) this.player.nextTrack();
              }}
            >
              <i className="material-icons">fast_forward</i>
            </button>
          </div>
        </div>
        {nowPlayingData && (
          <Fragment>
            <div className="center">
              <div className="col s2">{songCurrentTime}</div>
              <div className="col s8">
                <div className="progress grey lighten-2">
                  <div className="determinate light-blue" style={{ width: loadingBarPosition }} />
                </div>
              </div>
              <div className="col s2">{songTotalTime}</div>
            </div>
          </Fragment>
        )}
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
