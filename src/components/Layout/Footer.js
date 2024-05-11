// Navbar.js

import React, { useEffect } from 'react';
import emailLogo from '../../imgs/email-logo (2).png';
import outlookLogo from '../../imgs/outlook-logo.png';
import twitterLogo from '../../imgs/twitter-logo.png';
import facebookLogo from '../../imgs/facebook-logo.png';

const Footer = () => {
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h1 style={{ letterSpacing: '3px' }}>About E-Banking</h1>
        <p style={{ fontSize: '25px', fontWeight: 500, letterSpacing: '1px' }}>About Us<br />
          Fees<br />
          Rae<br />
          Privacy Policy<br />
          Stay Informt</p>
      </div>
      <div className="col-md-6">
        <h1 style={{ letterSpacing: '3px' }}>Consumer Loans</h1>
        <p style={{ fontSize: '25px', fontWeight: 500, letterSpacing: '1px' }}>Personal Loans<br />
          Retire Loans<br />
          Travel Loans<br />
          Emergency Loans</p>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <h1 style={{ letterSpacing: '3px' }}>Health & Support</h1>
        <p style={{ fontSize: '25px', fontWeight: 500, letterSpacing: '1px' }}>Contact Us<br />
          Help/Support</p>
      </div>
      <div className="col-md-6">
        <h1 style={{ letterSpacing: '3px' }}>Connect</h1>
        <img src={emailLogo} style={{ padding: '10px', width: '60px', height: 'auto' }} className="img-fluid" alt="email" />
        <img src={facebookLogo} style={{ padding: '10px', width: '60px', height: 'auto' }} className="img-fluid" alt="facebook" />
        <img src={outlookLogo} style={{ padding: '10px', width: '60px', height: 'auto' }} className="img-fluid" alt="outlook" />
        <img src={twitterLogo} style={{ padding: '10px', width: '60px', height: 'auto' }} className="img-fluid" alt="twitter" />
      </div>
    </div>
  </div>

    );
}
export default Footer;
