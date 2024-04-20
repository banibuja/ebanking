import React, { useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import './Home.css';
import Navbar from '../HeaderNav&Footer/Navbar';
import arrowImage from '../imgs/arrow.png';
import eLogo from '../imgs/e-bankinglogo.png';
import RetireWell from '../imgs/Retire well.png';
import Scheme  from '../imgs/Scheme.png';
import Security from '../imgs/security.png';
import TransferLove from '../imgs/transfer love.png';
import Explore from '../imgs/explore.png';
import unExpected from '../imgs/unExpected.png';
import logoNoBackground from '../imgs/elogo-removed-background.png';
import Footer from '@/HeaderNav&Footer/Footer';

export const Home = () => {

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
            <div class="carusel-cards" id="carusel-cards-1">
              <img src={RetireWell} class="carusel-img"/>
              <div class="carusel-gold-line"></div>
              <h1 class="carusel-title">Retire Well</h1>
              <p class="carusel-txt">Build your dream bridge bridge today for a confident tomorrow.</p>
            </div>
          </Col>
            <Col>
              <div class="carusel-cards" id="carusel-cards-2">
                <img src={Security} class="carusel-img"/>
                <div class="carusel-gold-line"></div>
                <h1 class="carusel-title">Security</h1>
                <p class="carusel-txt">Trust's pricless gem in every transaction.</p>
              </div>
            </Col>
            <Col>
              <div class="carusel-cards" id="carusel-cards-3">
                <img src={Scheme} class="carusel-img"/>
                <div class="carusel-gold-line"></div>
                <h1 class="carusel-title">Scheme</h1>
                <p class="carusel-txt">Balancing rick and reward, shaping tomorrow's aspirations.</p>
              </div>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row>
            <Col>
              <div class="carusel-cards">
                <img src={TransferLove} class="carusel-img"/>
                <div class="carusel-gold-line"></div>
                <h1 class="carusel-title">Transfer Love</h1>
                <p class="carusel-txt">Across distances, we send love alongside funds, uniting hearts through screens.</p>
              </div>
            </Col>
            <Col>
            <div class="carusel-cards">
              <img src={Explore} class="carusel-img"/>
              <div class="carusel-gold-line"></div>
              <h1 class="carusel-title">Explore</h1>
              <p class="carusel-txt">Saved pennies lead to unforgettable experiences, showing travel's value beyond cost.</p>
            </div>
            </Col>
            <Col>
              <div class="carusel-cards">
                <img src={unExpected} class="carusel-img"/>
                <div class="carusel-gold-line"></div>
                <h1 class="carusel-title">Prepare</h1>
                <p class="carusel-txt">In tough times, savings offer stability and solace, showcasing resilience.</p>
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

  <Footer/>

</>

  );
}

export default Home;