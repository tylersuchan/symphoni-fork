import React, { Component } from 'react';
import style from './QueueContainer.css';
import config from '../../config';

class VotingButtons extends Component {
  constructor(props) {
    super(props);
    this.votes = [];
    this.state = { voteStatus: [], voteCount: 0 };
  }

  componentWillMount() {
    this.getVoteData();
  }

  getVoteData = () => {};

  shrinkVotes = () => {
    const votesLength = this.votes.length;
    if (votesLength >= 2 && this.votes[votesLength - 2] === this.votes[votesLength - 1]) {
      this.votes = [];
    }
  };

  decideVoteStatus = () => {
    const currentVote = this.votes[this.votes.length - 1];
    const prevVote = this.votes[this.votes.length - 2];

    this.shrinkVotes();

    if (currentVote === prevVote) {
      return '';
    }

    if (currentVote === 'up') {
      return 'up';
    }

    return 'down';
  };

  registerVote = (vote) => {
    const { partyCode, username, trackURI } = this.props;
    const url = new URL(`${config.url}party/${partyCode}/vote`);
    url.search = new URLSearchParams({ vote, user: username, track_uri: trackURI });

    fetch(url, {
      method: 'PUT',
    }).then(response => response.json().then((data) => {
      if (response.ok) {
        this.votes.push(vote);
        const newVoteStatus = this.decideVoteStatus();
        this.setState({ voteStatus: newVoteStatus, voteCount: data.vote_data.votes });
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
