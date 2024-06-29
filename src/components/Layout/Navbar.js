import React, { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import menuLogo from '../../imgs/menu-logo.png';
import './nav.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-inverse">
      {/* <div className="container-fluid"> */}
       
        <Menu right isOpen={menuOpen} onStateChange={handleStateChange}>
          <a id='a' href="/" onClick={closeMenu}>Home</a>
          <a href="/contactform" onClick={closeMenu}>ContactUs</a>
          <a href="/applyonline" onClick={closeMenu}>Apply Online</a>
          <a href="/aboutus" onClick={closeMenu}>About us</a>
          <a href="/login" onClick={closeMenu}>Login</a>
        </Menu>
        <ul className="nav navbar-nav navbar-right">
          <a href="#" onClick={toggleMenu}><img src={menuLogo} alt="Menu Logo" /></a>
        </ul>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
