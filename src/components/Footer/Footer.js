import React from 'react';
import './Footer.css'


function Footer(props) {
    return (
        <React.Fragment>
        <footer className = 'footer'>
        <div className='footer-content'>
         <h3>Bank Management System </h3>
         <p>Version 1.1</p>   
        </div>
         <div className='footer-bottom'>
        <h1>copyright &copy;2021 Bank </h1>
        </div>
        </footer>
        </React.Fragment>
    );
}

export default Footer;