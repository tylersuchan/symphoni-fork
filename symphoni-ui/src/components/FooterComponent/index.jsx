import React from 'react';
import './FooterComponent.css';
import Container from '../Util/Container';

const FooterComponent = () => (
  
  <Container>
    
    <footer class="page-footer grey lighten-3">
      <div class="container" id="privacy">
        <div class="row">
          <div class="col 16 s12">
            <div id="Privacy Policy">
              <h5 class="black-text">Privacy Policy</h5>
              <p class="black-text"> 
                <a href="priv.html">Privacy Policy</a>    
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="container" id="contactus">
        <div class="row">
          <div class="col 16 s12">
            <div id="Contact Us">
              <h5 class="black-text">Contact Us</h5>
              <p class="black-text"> Information about contacting the developers will be placed here in the future </p>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-copyright">
        <div class="container">
          © 2018 Copyright Symphoni
          <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
      </div>
    </footer>


  </Container>
);

export default FooterComponent;