import React, { Component } from 'react';
import config from '../../config';
import './SpotifySearch.css';

class SpotifySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], isVisible: false };
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
      // if there is an value(some output) then set background to visible else invisible
      // !! IS AMAZING #CORRY
      this.setState({ isVisible: !!event.target.value });
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
      this.setState({ isVisible: false });
    }));
  };

  render() {
    const { results, isVisible } = this.state;
    const resultItems = results.map(result => (
      <li key={result.track_uri}>
        <div className="row">
          <button
            type="button"
            className="flex-container btn searchItem"
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
          className="max-width typeSearch"
          placeholder="Search For Songs"
          onKeyPress={this.searchSpotify}
        />
        <ul className={`${isVisible ? 'visible' : 'invisible'} centerList`}>{resultItems}</ul>
      </div>
    );
  }
}

export default SpotifySearch;
