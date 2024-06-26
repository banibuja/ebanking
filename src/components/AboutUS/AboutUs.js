import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AboutUs.css';
import Navbar from '../Layout/Navbar';
import Ernita from '../../imgs/Ernita.jpg';
import Arion from '../../imgs/arjoni.jpg';
import Elsa from '../../imgs/elsa.webp';
import Shaban from '../../imgs/foto.png';
import Dior from '../../imgs/diori 2.0.jpg';

export const AboutUs = () => {
  const [AboutUsItems, setAboutUsItems] = useState([]);

  useEffect(() => {
    fetchAboutUsItems();
  }, []);

  const fetchAboutUsItems = () => {
    axios.get('http://localhost:8080/getAboutUs')
      .then(res => {
        const fetchedAboutUsItems = res.data;
        setAboutUsItems(fetchedAboutUsItems);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="AboutUS">
        <div className="Header">
          <h1>Welcome to E-Banking</h1>
          <p>Innovation meets convenience.</p>
        </div>

        {AboutUsItems.length > 0 ? (
          AboutUsItems.map((item, index) => (
            <section key={index} id={`section-${index}`}>
              <h2>{item.Tittle}</h2>
              <p>{item.Info}</p>
            </section>
          ))
        ) : (
          <p>Loading...</p>
        )}

<section id="team">
                  <h2>Meet the Team</h2>
                  <div class="team-member">
                      <img src={Ernita} />
                      <h3>Ernita Grabovci, CEO</h3>
                      <p>With over 20 years in the banking industry...</p>
                  </div>
                  <div class="team-member">
                      <img src={Arion} />
                      <h3>Arion Rexhepi, CTO</h3>
                      <p>A tech visionary leading our innovation charge...</p>
                  </div>
                  <div class="team-member">
                      <img src={Elsa} />
                      <h3>Elsa Morina, CTO</h3>
                      <p>A tech visionary leading our innovation charge...</p>
                  </div>
                  <div class="team-member">
                      <img src={Shaban} />
                      <h3>Shaban Buja, CTO</h3>
                      <p>A tech visionary leading our innovation charge...</p>
                  </div>
                  <div class="team-member">
                      <img src={Dior} />
                      <h3>Dior Hyseni, CTO</h3>
                      <p>A tech visionary leading our innovation charge...</p>
                  </div>
              </section>


              <section id="community">
                  <h2>Community Engagement</h2>
                  <p>We believe in giving back to the community. E-Banking is proud to support local charities and financial literacy programs.</p>
              </section>

              <section id="contact">
                  <h2>Contact Us</h2>
                  <p>Email: support@E-Bannking.com</p>
                  <p>Phone: +383-44 349 013</p>
                  <p>Live Chat: Available 24/7 on our website</p>
              </section>

              <section id="cta">
                  <h2>Join Us Today!</h2>
                  <p>Join the thousands of satisfied customers who trust E-Bank with their financial needs. <a href="#">Sign up today</a> and experience the future of banking!</p>
              </section>
      </div>
    </>
  );
}

export default AboutUs;
