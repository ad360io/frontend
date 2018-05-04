/*
Core Libs
*/
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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

    // handleNavSelect(eventKey) {
    //     switch(eventKey){
    //         case 1:
    //             browserHistory.push("/dashboard")
    //         case 2:
    //             browserHistory.push("/marketplace");
    //         case 3:
    //             browserHistory.push("/create")
    //         case 4:
    //             browserHistory.push("/profile");
    //         default:
    //             break;
    //     }
    // }

    render() {
        return <div className="navbar-container">
            <NavLink activeClassName="selected-nav-item" className="in-app-nav-item noselect" to="/dashboard">
                <i className="fas fa-home fa-lg"></i> 
                <span className="nav-label">Dashboard</span>
            </NavLink>

            <NavLink activeClassName="selected-nav-item" className="in-app-nav-item noselect" to="/marketplace">
                <i className="fas fa-suitcase fa-lg"></i> 
                <span className="nav-label">Marketplace</span>
            </NavLink>

            <NavLink activeClassName="selected-nav-item" className="in-app-nav-item noselect" to="/create">
                <i className="fas fa-file-alt fa-lg"></i>
                <span className="nav-label">Create</span>
            </NavLink>

            <NavLink activeClassName="selected-nav-item" className="in-app-nav-item noselect" to="/profile">
                <i className="far fa-user fa-lg"></i>
                <span className="nav-label">Profile</span>
            </NavLink>
        </div>;
    }
}


export default InAppNavBar;