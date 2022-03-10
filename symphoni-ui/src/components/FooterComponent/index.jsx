import React from 'react';
import './FooterComponent.css';
import Container from '../Util/Container';

const FooterComponent = () => (
  <Container>
    <div>
      <ul className="collapsible">
        <li>
          <div className="collapsible-header">
            <i className="material-icons">people_outline</i>
            Contact Us!
          </div>
          <div className="collapsible-body">
            <span>
              Tyler Suchan - tylersuc@buffalo.edu
              {' '}
              <br />
              Ohad Katz - ohadkatz@buffalo.edu
              {' '}
              <br />
              Ross Ventresca - rossvent@buffalo.edu
              {' '}
              <br />
              Corwyn Nielsen - corwynni@buffalo.edu
              {' '}
              <br />
              Vincent Bruno - vnbruno@buffalo.edu
              {' '}
              <br />
            </span>
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons">screen_lock_landscape</i>
            Privacy Policy
          </div>
          <div className="collapsible-body">
            <span>
              We honestly don't collect any information ourselves, but we inegrate with Spotify on
              an authentication level and
              {' '}
              <b>they collect information</b>
              {' '}
not us. To review what
              they collect please visit their
              {' '}
              <a href="https://www.spotify.com/us/legal/privacy-policy/">Privacy Policy</a>
            </span>
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            <i className="material-icons">headset</i>
            About Us!
          </div>
          <div className="collapsible-body">
            <span>
              Symphoni's goal is to create a democratic way for people to throw ragers. We provide a
              way to democratize the way you listen to music. You can create party rooms invite your
              friends and then everyone can requests songs they want to hear and vote what song
              comes up next. If you have any questions please visit the
              {' '}
              <b>Contact Us</b>
              {' '}
above.
            </span>
          </div>
        </li>
      </ul>
    </div>
  </Container>
);

export default FooterComponent;
