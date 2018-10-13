import React from 'react';
import './QueueContainer.css';
import Container from '../Util/Container';

const QueueContainer = () => (
  <Container>
    <div class="container">
      <h3 class="ml-xs">Your Playlist:</h3><br></br>
      <div class="row mt-xxs mb-0">
        <div class="offset-s2 col s10">
          <div class="col s4"><b>Title</b></div>
          <div class="col s4"><b>Artist</b></div>
          <div class="col s4"><b>Album</b></div>
        </div>
      </div>
      <div class="row queue-entry">
        <div class="col s2"><img class="responsive-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Kids_See_Ghost_Cover.jpg/220px-Kids_See_Ghost_Cover.jpg"></img></div>
        <div class="col s10 max-height valign-wrapper">
          <div class="col s4">4th Dimension</div>
          <div class="col s4">Kanye West</div>
          <div class="col s4">Kids See Ghosts</div>
        </div>
      </div>
      <div class="row queue-entry">
        <div class="col s2"><img class="responsive-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Scorpion_by_Drake.jpg/220px-Scorpion_by_Drake.jpg"></img></div>
        <div class="col s10 max-height valign-wrapper">
          <div class="col s4">Nonstop</div>
          <div class="col s4">Drake</div>
          <div class="col s4">Scorpion</div>
        </div>
      </div>
    </div>
  </Container>
);

export default QueueContainer;
