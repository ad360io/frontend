/*
Core Libs and Children Components
*/
import React from 'react';

/*
Local CSS
*/
import './Header.component.css';

/*
Children Components
*/
import ConnectedMenuBar   from './MenuBar/ConnectedMenuBar';
import InAppNavBar        from './InAppNavBar/InAppNavBar.component';


/**
 * The header that is only to be served on private components
 * Usage check under /router/PrivateRoute.js
 */
const Header = (props) =>
    <div>
        <ConnectedMenuBar auth={props.auth}/>
        <InAppNavBar />
    </div>

export default Header;
