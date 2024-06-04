import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AboutUs.css';
import Navbar from '../Layout/Navbar';

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
      </div>
    </>
  );
}

export default AboutUs;
