// Navbar.js

import React, { useEffect } from 'react';
import emailLogo from '../imgs/email-logo (2).png';
import outlookLogo from '../imgs/outlook-logo.png';
import twitterLogo from '../imgs/twitter-logo.png';
import facebookLogo from '../imgs/facebook-logo.png';

const Footer = () => {
  return (
<>
    <div class="footer-txt-box">
      <div>
        <h1>About E-Banking</h1>
        <p>About Us<br/>
        Fees<br/>
        Rae<br/>
        Privacy Policy<br/>
        Stay Informt</p>
      </div>
      <div>
        <h1>Consumer Loans</h1>
        <p>Personal Loans<br/>
        Retire Loans<br/>
        Travel Loans<br/>
        Emergency Loans</p>
        </div>
      <div>
      <h1>Healtt & Support</h1>
        <p>Contact Us<br/>
        Help/Support</p>
      </div>
      <div>
      <h1>Connect</h1>
        <img src={emailLogo}/>
        <img src={facebookLogo}/>
        <img src={outlookLogo}/>
        <img src={twitterLogo}/>
      </div>
    </div>
    {/* <div class="footer-bottom">
      <p>@2024, E-Banking the finesse for finance</p>
    </div> */}
</>    
    );
}
export default Footer;
