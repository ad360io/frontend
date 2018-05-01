/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './Footer.component.css';


/**
 * 
 */
class Footer extends Component {
    render() {
        return <div className="footer-container">
            <footer className="footer" >
                <div class="container">
                    <p>Copyright &copy; 2017 Qchain Co.</p>
                    <p>Irvine, CA</p>
                    <p><a href="mailto:team@qchain.co" style={{textDecoration: + 'none'}}>team@qchain.co</a></p>
                    <p><a href="https://qchain.co/privacy">Privacy Policy</a></p>
                </div>
            </footer>
        </div>;
    }
}


export default Footer;