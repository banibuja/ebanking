import React, { useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import './page2.css';
import Navbar from '../HeaderNav/Navbar';
import arrowImage from '../imgs/arrow.png';
import eLogo from '../imgs/e-bankinglogo.png';
import RetireWell from '../imgs/Retire well.png';
import Scheme  from '../imgs/Scheme.png';
import Security from '../imgs/security.png';
import TransferLove from '../imgs/transfer love.png';
import Explore from '../imgs/explore.png';
import unExpected from '../imgs/unExpected.png';
import logoNoBackground from '../imgs/elogo-removed-background.png';
import footerImg from '../imgs/black&white-logo.png';
import emailLogo from '../imgs/email-logo (2).png';
import outlookLogo from '../imgs/outlook-logo.png';
import twitterLogo from '../imgs/twitter-logo.png';
import facebookLogo from '../imgs/facebook-logo.png';

export const Page2 = () => {

  return (
<>
<Navbar/>

    <div className="container">
      <div className="flexbox">
        <h1 class="gateway">Gateway</h1>
        <button className="StartBanking-button">
          <span className="arrow-slide"></span>
          <img src={arrowImage} className="arrow-img" alt="Arrow" />
          <p>StartBanking</p>
        </button>
      </div>
      <div className="flexbox">
        <p class="paragraph-p">Experience seamless blend of finance and finesse for effortless transfers, balance and more.</p>
        <img src={eLogo} className="eLogo-img" alt="eLogo" />
        <h1 className="-banking">-Banking</h1>
      </div>
    </div>

    <Container className="carusel-space">
      <Carousel>
        <Carousel.Item>
          <Row>
          <Col>
              <div className="carusel-cards" id="carusel-cards-2">
                <img src={TransferLove} alt="Transfer Love" className="carusel-img" />
                <div className="carusel-gold-line"></div>
                <h1 className="carusel-title">Transfer Love</h1>
                <p className="carusel-txt">Across distances, we send love alongside funds, uniting hearts through screens.</p>
              </div>
            </Col>
            <Col>
              <div className="carusel-cards">
                <img src={Explore} alt="Explore" className="carusel-img" />
                <div className="carusel-gold-line"></div>
                <h1 className="carusel-title">Explore</h1>
                <p className="carusel-txt">Saved pennies lead to unforgettable experiences, showing travel's value beyond cost.</p>
              </div>
            </Col>
            <Col>
              <div className="carusel-cards">
                <img src={unExpected} alt="Prepare" className="carusel-img" />
                <div className="carusel-gold-line"></div>
                <h1 className="carusel-title">Prepare</h1>
                <p className="carusel-txt">In tough times, savings offer stability and solace, showcasing resilience.</p>
              </div>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row>
            <Col>
              <div className="carusel-cards" id="carusel-cards-2">
                <img src={TransferLove} alt="Transfer Love" className="carusel-img" />
                <div className="carusel-gold-line"></div>
                <h1 className="carusel-title">Transfer Love</h1>
                <p className="carusel-txt">Across distances, we send love alongside funds, uniting hearts through screens.</p>
              </div>
            </Col>
            <Col>
              <div className="carusel-cards">
                <img src={Explore} alt="Explore" className="carusel-img" />
                <div className="carusel-gold-line"></div>
                <h1 className="carusel-title">Explore</h1>
                <p className="carusel-txt">Saved pennies lead to unforgettable experiences, showing travel's value beyond cost.</p>
              </div>
            </Col>
            <Col>
              <div className="carusel-cards">
                <img src={unExpected} alt="Prepare" className="carusel-img" />
                <div className="carusel-gold-line"></div>
                <h1 className="carusel-title">Prepare</h1>
                <p className="carusel-txt">In tough times, savings offer stability and solace, showcasing resilience.</p>
              </div>
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </Container>

<div class="info-place">
  <img src={logoNoBackground} alt="Logo"/>
  <h1>E-banking offers everything you need for seamless financial management: account services, fund transfers, bill payment, mobile banking, deposits, loans, and support.</h1>
</div>

<div class="footer">
    <img src={footerImg} class="footerImg" />
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
    <div class="footer-bottom">
      <p>@2024, E-Banking the finesse for finance</p>
    </div>
</div>
</>
  );
}

export default Page2;