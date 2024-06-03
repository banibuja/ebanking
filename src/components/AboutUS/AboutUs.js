import React, { useEffect } from 'react';
import './AboutUs.css';
import Ernita from '../../imgs/Ernita.jpg';
import Arion from '../../imgs/arjoni.jpg';
import Elsa from '../../imgs/elsa.webp';
import Shaban from '../../imgs/shabani.jpg';
import Dior from '../../imgs/diori 2.0.jpg';
import Navbar from '../Layout/Navbar';




export const AboutUs= () => {


  return (
    <>
      <Navbar/>
          
          <div className="AboutUS">

              <div className="Heder">
                  <h1>Welcome to E-Bannking</h1>
                  <p>Innovation meets convenience.</p>
              </div>


              <section id="mission">
                  <h2>Our Mission</h2>
                  <p>Our mission is to provide seamless, secure, and accessible financial services to everyone, empowering you to manage your money with confidence and ease.</p>
              </section>

              <section id="story">
                  <h2>Our Story</h2>
                  <p>E-Bank was founded in 2020 with the vision of transforming traditional banking. Our founders saw an opportunity to leverage technology to make banking more accessible and user-friendly for people everywhere.</p>
              </section>

              <section id="values">
                  <h2>Core Values</h2>
                  <ul>
                      <li><strong>Security:</strong> Ensuring the highest level of security for your financial data.</li>
                      <li><strong>Innovation:</strong> Continuously improving our services with cutting-edge technology.</li>
                      <li><strong>Customer-Centricity:</strong> Prioritizing your needs and providing exceptional customer support.</li>
                      <li><strong>Transparency:</strong> Being clear and straightforward in our operations and communications.</li>
                  </ul>
              </section>

              <section id="services">
                  <h2>Services Offered</h2>
                  <ul>
                      <li>Online account management</li>
                      <li>Mobile banking apps</li>
                      <li>Instant money transfers</li>
                      <li>Bill payments and recharges</li>
                      <li>Loan applications and management</li>
                      <li>Investment and savings tools</li>
                  </ul>
              </section>

              <section id="security">
                  <h2>Security Measures</h2>
                  <p>Security is our top priority. We use advanced encryption technologies, multi-factor authentication, and constant monitoring to safeguard your personal and financial information.</p>
              </section>

              <section id="testimonials">
                  <h2>Customer Testimonials</h2>
                  <div class="testimonial">
                      <p>“E-Bannking has made managing my finances so much easier. The app is intuitive, and the customer service is fantastic!” – Jane Doe, Customer since 2022</p>
                  </div>
              </section>

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

              <script src="aboutUs.js"></script>
          </div></>

  );
}

export default AboutUs;