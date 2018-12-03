import React, { Component } from 'react';
import style from './QueueContainer.css';
import config from '../../config';

class VotingButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { voteStatus: '', voteCount: 0 };
  }

  componentWillMount() {
    this.getVoteData();
  }

  getVoteData = () => {};

  registerVote = (vote) => {
    const { partyCode, username, trackURI } = this.props;
    const url = new URL(`${config.url}party/${partyCode}/vote`);
    url.search = new URLSearchParams({ vote, user: username, track_uri: trackURI });

    fetch(url, {
      method: 'PUT',
    }).then(response => response.json().then((data) => {
      if (response.ok) {
        const votedSong = data.party_data.playlist.find(song => song.song.track_uri === trackURI);
        this.setState({ voteStatus: vote, voteCount: votedSong.vote });
      } else if (data.message === 'A user can only vote on song once') {
        window.Materialize.toast('You can only vote once on a track.', 2000);
      }
    }));
  };

  render() {
    const { voteStatus, voteCount } = this.state;
    return (
      <div className="flex-horizontal-center">
        <button
          type="button"
          className={style['vote-btn']}
          onClick={() => {
            this.registerVote('up');
          }}
        >
          <i className={`material-icons ${voteStatus === 'up' ? style.upvote : style['no-vote']}`}>
            keyboard_arrow_up
          </i>
        </button>
        <button
          type="button"
          className={style['vote-btn']}
          onClick={() => {
            this.registerVote('down');
          }}
        >
          <i
            className={`material-icons ${
              voteStatus === 'down' ? style.downvote : style['no-vote']
            }`}
          >
            keyboard_arrow_down
          </i>
        </button>
        <div
          className={`flex-horizontal-center center ${
            voteCount > 0 ? style.upvote : voteCount < 0 ? style.downvote : style['.no-vote-count']
          }`}
        >
          {voteCount}
        </div>
      </div>
    );
  }
}

export default VotingButtons;
