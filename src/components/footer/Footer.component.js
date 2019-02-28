/*
Core Libs
*/
import React from 'react';

/*
Local CSS
*/
import './Footer.component.css';


/**
 * Simple footer for BrandLedger
 */
const Footer = () =>
    <div className='footer-container'>
        <footer className='footer' >
            <div className='footer-content-container'>
                <p>Copyright &copy; 2019 <a href="https://ad360.io">AD360 Pte Ltd</a></p>
                <p>Singapore</p>

                <p style={{ fontSize: '6px' }}>&nbsp;</p>

                {/* <span><a href='/termsofservice.pdf'>Terms of Service</a></span> &nbsp;&nbsp;&nbsp;
                <span><a href='/privacypolicy.pdf'>Privacy Policy</a></span> */}

                <p style={{ fontSize: '6px' }}>&nbsp;</p>
            </div>
        </footer>
    </div>


export default Footer;
