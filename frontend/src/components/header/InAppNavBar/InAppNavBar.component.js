/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './InAppNavBar.component.css';

/*
React-Bootstrap Components
*/
import { Navbar, Nav, NavItem } from 'react-bootstrap';


/**
 * 
 */
class InAppNavBar extends Component {

    handleNavSelect(eventKey) {
        switch(eventKey){
            case 1:
                break;
                //BrowserHistory.push("/dashboard");
            case 2:
                break;
                //BrowserHistory.push("/marketplace");
            case 3:
                break;
                //BrowserHistory.push("/create");
            case 4:
                break;  
                //BrowserHistory.push("/profile");
            default:
                break;
        }
    }

    render() {
        return <div className="navbar-container">
            <Navbar>
                <Nav>
                    <NavItem eventKey={1} onSelect={this.handleNavSelect}>
                        <i class="fas fa-home fa-lg"></i>Dashboard
                    </NavItem>
                    <NavItem eventKey={2} onSelect={this.handleNavSelect}>
                        <i class="fas fa-suitcase fa-lg"></i>Marketplace
                    </NavItem>
                    <NavItem eventKey={3} onSelect={this.handleNavSelect}>
                        <i class="fas fa-file-alt fa-lg"></i>Create
                    </NavItem>
                    <NavItem eventKey={4} onSelect={this.handleNavSelect}>
                        <i class="far fa-user fa-lg"></i>Profile
                    </NavItem>
    
                </Nav>
            </Navbar>
        </div>;
    }
}


export default InAppNavBar;