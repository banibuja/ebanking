// Header.js
import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="left">
        <a href="/"><i className="fas fa-building"></i> Business</a>
        <a href="/"><i className="fas fa-user"></i> Personal</a>
        <a href="/Alogin"><i className="fas fa-user"></i> Admin Login</a>
        <a href="/Stafflogin"><i className="fas fa-user"></i> Staff Login</a>


      </div>

      <div className="right">
        <a href="/"><i className="fas fa-phone-alt"></i> 045963828</a>
        <a id="sign" href="/login"><i className="fas fa-sign-in-alt"></i> Signup/Login</a>
      </div>
    </header>
  );
}

export default Header;
