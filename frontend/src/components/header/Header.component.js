/*
Core Libs and Children Components
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './Header.component.css';

/*
Children Components
*/
import MenuBar              from './MenuBar/MenuBar.component';
import InAppNavBar from './InAppNavBar/InAppNavBar.component';


/**
 * The header that is only to be served on private components
 * Usage check under /router/PrivateRoute.js
 */
class Header extends Component {

    render() {
        return <div>
            <MenuBar auth={this.props.auth}/>
            <InAppNavBar />
        </div>
    }
}


export default Header;