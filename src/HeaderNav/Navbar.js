// Navbar.js
import React, { useEffect } from 'react';
import menuLogo from '../imgs/menu-logo.png';

const Navbar = () => {
  return (
<nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <ul className="nav navbar-nav">
        <li><a href="#">Home</a></li>
        <li><a href="#">Accounts</a></li>
        <li className="dropdown">
          <a href="#">Cards</a>
        </li>
        <li><a href="#">Education & Goals</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
          <li><a href=""><img src={menuLogo}/></a></li>
      </ul>
    </div>
</nav>
  );
}

export default Navbar;
