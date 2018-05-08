/*
Core Libs
*/
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

/*
Local CSS
*/
import './InAppNavBar.component.css';


/**
 * Navigation bar that is directly under MenuBar component
 * Main purpose is to navigate between main components
 */
class InAppNavBar extends Component {

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