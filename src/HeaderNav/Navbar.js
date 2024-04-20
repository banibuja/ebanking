// Navbar.js
import React, { useEffect } from 'react';
import menuLogo from '../imgs/menu-logo.png';


<div className="right">
<a href="/"><i className="fas fa-phone-alt"></i> 045963828</a>
<a id="sign" href="/login"><i className="fas fa-sign-in-alt"></i> Signup/Login</a>
</div>
const Navbar = () => {
  return (
<nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <ul className="nav navbar-nav">
        <li><a href="/">Home</a></li>
        <li><a href="/adminLogin">Admin Login</a></li>
        <li className="dropdown">
        <a href="/Stafflogin">Staff Login</a>
        </li>
        <li><a href="/login">Login</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
          <li><a href=""><img src={menuLogo}/></a></li>
      </ul>
    </div>
</nav>
  );
}

export default Navbar;
