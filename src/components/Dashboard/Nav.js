import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [name, setName] = useState('');
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('http://localhost:8080/getUsersWithSession', {withCredentials:'true'})
      .then(res => {
        const userData = res.data;
        if (userData && userData.length > 0) {
          setName(userData[0].name);
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const fetchSessionTime = () => {
      axios.get('http://localhost:8080/sessionTimeRemaining', {withCredentials:true})
        .then(res => {
          const { timeRemaining } = res.data;
          if (timeRemaining === 0) {
            // handleLogout();
          } else {
            setSessionTimeRemaining(timeRemaining);
          }
        })
        .catch(err => console.log(err));
    };

    fetchSessionTime();
  }, []); 

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTimeRemaining(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          // handleLogout();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8080/logout')
      .then(res => {
        if (res.data.success) {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: 'white', height: '60px', padding: '0 20px', borderBottom: '1px solid #ccc' }}>
      <div style={{ color: 'red' }}>Welcome, {name}</div>
      <small>Session Time Remaining: {formatTime(sessionTimeRemaining)}</small>
      <a href="#" className="nav-link link-dark" onClick={handleLogout}>
        <i className="bi me-2 fas fa-sign-out-alt fa-1x text-gray-300"></i>
        Log Out
      </a>
    </div>
  );
}

export default Nav;
