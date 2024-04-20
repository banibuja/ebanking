import React from 'react';
import '../Home/Home';

import Navbar from '../HeaderNav&Footer/Navbar';
import menuLogo from '../imgs/menu-logo.png';
import footerImg from '../imgs/black&white-logo.png';


export const ContactUs2 = () => {

  return (
<>
 <Navbar/>
      
<div class="contact-us">

        <img src={footerImg} class="contactus-img" />
  <div class="contactus-form">
    <form>
      <div class="form-group">
        <label for="usr">Name:</label>
        <input type="text" class="form-control" id="usr"/>
      </div>
        <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" class="form-control" id="pwd"/>
      </div>
      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea class="form-control" rows="5" id="comment"></textarea>
      </div>
    </form>
  </div>
</div>

</>
  );
}

export default ContactUs2;