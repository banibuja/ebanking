import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Buffer } from 'buffer';

import './Home.css';
import Navbar from '../Layout/Navbar';
import arrowImage from '../../imgs/arrow.png';
import eLogo from '../../imgs/e-bankinglogo.png';
import logoNoBackground from '../../imgs/elogo-removed-background.png';
import Footer from '../Layout/Footer';

export const Home = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchInfo();
    fetchCarouselItems();
  }, []);

  const fetchInfo = () => {
    axios.post('http://localhost:8080/getInfoSection')
      .then(res => {
        const fetchedInfo = res.data;
        setInfo(fetchedInfo);
      })
      .catch(err => console.log(err));
  };

  const fetchCarouselItems = () => {
    axios.post('http://localhost:8080/getCarusel')
      .then(res => {
        const items = res.data;
        const processedItems = items.map(item => {
          const base64Image = Buffer.from(item.Photo.data).toString('base64');
          const imageSrc = `data:image/jpeg;base64,${base64Image}`;
          return { ...item, Photo: imageSrc };
        });
        const chunkedItems = chunkItems(processedItems, 3);
        setCarouselItems(chunkedItems);
      })
      .catch(err => console.log(err));
  };

  const chunkItems = (items, size) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container">
        <div className="flexbox1">
          <h1 className="h1">Gateway</h1>
          <a href="/login" className="StartBanking-button">
            <span className="arrow-slide"></span>
            <img src={arrowImage} className="arrow-img" alt="Arrow" />
            <p className="start-banking-text">StartBanking</p>
          </a>
        </div>
        <div className="flexbox">
          <p className="paragraph-p">Experience seamless blend of finance and finesse for effortless transfers, balance and more, If you don't have account you can apply online</p>
          <div className="e-logoimage">
            <img src={eLogo} className="eLogo-img" alt="eLogo" />
          </div>
          <h1 className="-ebanking">-Banking</h1>
        </div>
      </div>

      <Container className="carusel-space">
        <Carousel className='carusel-inner'>
          {carouselItems.map((itemGroup, index) => (
            <Carousel.Item key={index}>
              <Row>
                {itemGroup.map((item, subIndex) => (
                  <Col key={subIndex}>
                    <div className="carusel-cards" id={`carusel-cards-1`}>
                      <img src={item.Photo} alt="Carousel Item" className='carusel-img'/>
                      <div className="carusel-gold-line"></div>
                      <h1 className="carusel-title">{item.Titulli}</h1>
                      <p className="carusel-txt">{item.Teksti}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <div className="info-place">
        <img src={logoNoBackground} alt="Logo" />
        {info.map((item, index) => (
          <h1 key={index}>{item.Info}</h1>
        ))}
      </div>

      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default Home;
