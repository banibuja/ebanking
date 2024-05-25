import React, { useEffect } from 'react';
import emailLogo from '../../imgs/email-logo (2).png';
import outlookLogo from '../../imgs/outlook-logo.png';
import twitterLogo from '../../imgs/twitter-logo.png';
import facebookLogo from '../../imgs/facebook-logo.png';
import './Footer.css'

const Footer = () => {
  return (
<div className="container container-footer">
<div className="row mb-3 row-footer">
        <div className="col text-center">
          <h1 className="mb-4">Empower Your Finances</h1>
          <p className="mb-4">Our e-banking system simplifies your financial tasks securely and conveniently. <br/>Join us now for effortless banking.</p>
          <a href="/login" className="StartBanking-footer-button mb-4">
            <p>StartBanking</p>
          </a>
        </div>
      </div>
      <div className="row mb-3 row-footer">
        <div className="col-md-3 text-center">
          <h1 className="mb-4">About Us</h1>
          <p className="mb-4 text-left">
            <a>About Us</a><br />
            <a>Fees</a><br />
            <a>Rae</a><br />
            <a>Stay Informt</a>
          </p>
        </div>
        <div className="col-md-3 text-center">
          <h1 className="mb-4">Consumer Loans</h1>
          <p className="mb-4 text-left">
            <a>Personal Loans</a><br/>
            <a>Retire Loans</a><br/>
            <a>Travel Loans</a><br/>
            <a>Emergency Loans</a>
          </p>
        </div>
        <div className="col-md-3 text-center">
          <h1 className="mb-4">Help & Support</h1>
          <p className="mb-4 text-left"><a>Contact Us</a><br/>
          <a>Help/Support</a></p>
        </div>
        <div className="col-md-3 text-center">
          <h1 className="mb-4">Connect</h1>
          <img src={emailLogo} style={{ padding: '10px', width: '45px', height: 'auto' }} className="img-fluid" alt="email" />
          <img src={facebookLogo} style={{ padding: '10px', width: '45px', height: 'auto' }} className="img-fluid" alt="facebook" />
          <img src={outlookLogo} style={{ padding: '10px', width: '45px', height: 'auto' }} className="img-fluid" alt="outlook" />
          <img src={twitterLogo} style={{ padding: '10px', width: '45px', height: 'auto' }} className="img-fluid" alt="twitter" />
        </div>
      </div>
      <div className="row row-footer-b">
      <div className="col d-flex justify-content-between">
        <p>@2024, E-Banking the finesse for finance</p>
        <p>Privacy Policy</p>
      </div>
      </div>
    </div>
  );
}
export default Footer;
