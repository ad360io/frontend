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
                <Nav stacked={false}>
                    <NavItem className="in-app-nav-item" eventKey={1} onSelect={this.handleNavSelect}>
                        <i class="fas fa-home fa-lg"></i> <span className="nav-label">Dashboard</span>
                    </NavItem>
                    <NavItem className="in-app-nav-item" eventKey={2} onSelect={this.handleNavSelect}>
                        <i class="fas fa-suitcase fa-lg"></i> <span className="nav-label">Marketplace</span>
                    </NavItem>
                    <NavItem className="in-app-nav-item" eventKey={3} onSelect={this.handleNavSelect}>
                        <i class="fas fa-file-alt fa-lg"></i><span className="nav-label">Create</span>
                    </NavItem>
                    <NavItem className="in-app-nav-item" eventKey={4} onSelect={this.handleNavSelect}>
                        <i class="far fa-user fa-lg"></i><span className="nav-label">Profile</span>
                    </NavItem>
    
                </Nav>
            </Navbar>
        </div>;
    }
}


export default InAppNavBar;