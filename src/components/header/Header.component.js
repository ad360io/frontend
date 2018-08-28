/*
Core Libs and Children Components
*/
import React from 'react';
import { withRouter } from 'react-router-dom';

/*
Local CSS
*/
import './Header.component.css';

/*
Children Components
*/

import MenuBar          from './MenuBar/MenuBar.component';

/**
 * The header that is only to be served on private components
 * Usage check under /router/PrivateRoute.js
 */
const Header = ({auth}) => (
    <div>
        <MenuBar auth={auth}/>
    </div>
)


export default withRouter(Header);
