import React, { Component } from 'react';
import config from '../../config';

class SpotifySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  searchSpotify = (event) => {
    const { partyCode } = this.props;
    if (event.key === 'Enter') {
      const url = new URL(`${config.url}party/${partyCode}/song`);
      url.search = new URLSearchParams({ track: event.target.value });

      fetch(url, {
        method: 'GET',
      }).then(response => response.json().then((data) => {
        console.log(data);
      }));
    }
  };

  render() {
    return (
      <div>
        <input placeholder="Search For Songs" onKeyPress={this.searchSpotify} />
      </div>
    );
  }
}

export default SpotifySearch;
