import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Home.css';
import Navbar from '../Layout/Navbar';
import arrowImage from '../../imgs/arrow.png';
import eLogo from '../../imgs/e-bankinglogo.png';
import RetireWell from '../../imgs/Retire well.png';
import Scheme from '../../imgs/Scheme.png';
import Security from '../../imgs/security.png';
import TransferLove from '../../imgs/transfer love.png';
import Explore from '../../imgs/explore.png';
import unExpected from '../../imgs/unExpected.png';
import logoNoBackground from '../../imgs/elogo-removed-background.png';
import Footer from '../Layout/Footer';

export const Home = () => {
  const [Info, setInfo] = useState([]);

     useEffect(() => {
      fetchInfo();
  }, []);

  const navigate = useNavigate();

  const fetchInfo = () => {
      axios.post('http://localhost:8080/getInfoSection')
          .then(res => {
              const fetchInfo = res.data;
              setInfo(fetchInfo);
          })
          .catch(err => console.log(err));
  };
  return (
   
    <>
    <header>
      <Navbar/>
    </header>
 <body> 
      <div className="container">
        <div className="flexbox1">
          <h1 class="h1">Gateway</h1>
            <a href="/login" className="StartBanking-button">
            <span className="arrow-slide"></span>
            <img src={arrowImage} className="arrow-img" alt="Arrow" />
            <p className="start-banking-text">StartBanking</p>
            </a>
        </div>
        <div className="flexbox">
          <p class="paragraph-p">Experience seamless blend of finance and finesse for effortless transfers, balance and more, If you don't have account you can apply online</p>
          <div class="e-logoimage"><img src={eLogo} className="eLogo-img" alt="eLogo" /></div>
          <h1 className="-ebanking">-Banking</h1>
        </div>
      </div>
      

      <Container className="carusel-space">
          <Carousel className='carusel-inner'>
          <Carousel.Item>
            <Row>
              <Col>
                <div class="carusel-cards" id="carusel-cards-1">
                  <img src={RetireWell} class="carusel-img" />
                  <div class="carusel-gold-line"></div>
                  <h1 class="carusel-title">Retire Well</h1>
                  <p class="carusel-txt">Build your dream bridge bridge today for a confident tomorrow.</p>
                </div>
              </Col>
              <Col>
                <div class="carusel-cards" id="carusel-cards-2">
                  <img src={Security} class="carusel-img" />
                  <div class="carusel-gold-line"></div>
                  <h1 class="carusel-title">Security</h1>
                  <p class="carusel-txt">Trust's pricless gem in every transaction.</p>
                </div>
              </Col>
              <Col>
                <div class="carusel-cards" id="carusel-cards-3">
                  <img src={Scheme} class="carusel-img" />
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
                  <img src={TransferLove} class="carusel-img" />
                  <div class="carusel-gold-line"></div>
                  <h1 class="carusel-title">Transfer Love</h1>
                  <p class="carusel-txt">Across distances, we send love alongside funds, uniting hearts through screens.</p>
                </div>
              </Col>
              <Col>
                <div class="carusel-cards">
                  <img src={Explore} class="carusel-img" />
                  <div class="carusel-gold-line"></div>
                  <h1 class="carusel-title">Explore</h1>
                  <p class="carusel-txt">Saved pennies lead to unforgettable experiences, showing travel's value beyond cost.</p>
                </div>
              </Col>
              <Col>
                <div class="carusel-cards">
                  <img src={unExpected} class="carusel-img" />
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
        <img src={logoNoBackground} alt="Logo" />
        {Info.map((item, index) => (
          <h1 key={index}>{item.Info}</h1>
        ))}
      </div>
        <footer className="footer">
          <Footer/>
        </footer>
      </body>
    </>
  
   

  );
}

export default Home;