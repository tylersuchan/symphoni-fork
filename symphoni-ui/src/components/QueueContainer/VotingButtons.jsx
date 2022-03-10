import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  decideVoteStatus = (upvotes, downvotes) => {
    const { username } = this.props;

    const userInUpvotes = upvotes.includes(username);
    const userInDownvotes = downvotes.includes(username);

    if (userInUpvotes) {
      return 'up';
    }

    if (userInDownvotes) {
      return 'down';
    }

    return '';
  };

  getVoteData = () => {
    const { partyCode, trackURI } = this.props;
    const url = new URL(`${config.url}party/${partyCode}/vote`);
    url.search = new URLSearchParams({ track_uri: trackURI });

    fetch(url, {
      method: 'GET',
    }).then(response => response.json().then((data) => {
      if (response.ok) {
        const voteData = data.vote_data;
        const newVoteStatus = this.decideVoteStatus(voteData.upvotes, voteData.downvotes);
        this.setState({ voteStatus: newVoteStatus, voteCount: voteData.votes });
      }
    }));
  };

  registerVote = (vote) => {
    const {
      partyCode, username, trackURI, setPlayList,
    } = this.props;
    const url = new URL(`${config.url}party/${partyCode}/vote`);
    url.search = new URLSearchParams({ vote, user: username, track_uri: trackURI });

    fetch(url, {
      method: 'PUT',
    }).then(response => response.json().then((data) => {
      if (response.ok) {
        const voteData = data.vote_data;
        const newVoteStatus = this.decideVoteStatus(voteData.upvotes, voteData.downvotes);
        this.setState({ voteStatus: newVoteStatus, voteCount: voteData.votes });
        setPlayList(data.playlist);
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

VotingButtons.propTypes = {
  partyCode: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  trackURI: PropTypes.string.isRequired,
};

export default VotingButtons;
