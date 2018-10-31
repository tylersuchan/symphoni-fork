import React, { Component } from 'react';
import config from '../../config';

class SpotifySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  searchSpotify = (event) => {
    const { partyCode } = this.props;
    if (event.key === 'Enter') {
      const url = new URL(`${config.url}party/${partyCode}/song`);
      url.search = new URLSearchParams({ track: event.target.value });

      fetch(url, {
        method: 'GET',
      }).then(response => response.json().then((data) => {
        this.setState({ results: data.results });
      }));
    }
  };

  addSongToPlaylist = (song) => {
    const { partyCode, updatePlaylist } = this.props;

    const body = {
      song,
    };

    const url = `${config.url}party/${partyCode}/playlist`;

    fetch(url, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    }).then(response => response.json().then((data) => {
      updatePlaylist();
    }));
  };

  render() {
    const { results } = this.state;

    const resultItems = results.slice(0, 5).map(result => (
      <li key={result.track_uri}>
        <div className="row">
          <button
            type="button"
            onClick={() => {
              this.addSongToPlaylist(result);
              this.setState({ results: [] });
            }}
          >
            <div className="col s4">{result.track}</div>
            <div className="col s4">{result.artist_information[0].artist_name}</div>
            <div className="col s4">{result.album_information.album_name}</div>
          </button>
        </div>
      </li>
    ));

    return (
      <div>
        <input
          className="max-width"
          placeholder="Search For Songs"
          onKeyPress={this.searchSpotify}
        />
        <ul>{resultItems}</ul>
      </div>
    );
  }
}

export default SpotifySearch;
