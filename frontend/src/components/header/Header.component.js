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
 * 
 */
class Header extends Component {

    render() {
        return <div>
            <MenuBar />
            <InAppNavBar />
        </div>
    }
}


export default Header;