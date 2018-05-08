/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './MenuBar.component.css';
import qchain_logo from '../../../assets/images/Qchain_logo.png';
import eth_logo    from '../../../assets/images/Ethereum_logo.png';
import nem_logo    from '../../../assets/images/NEM_logo.png';

/*
React-Bootstrap Components
*/
import { Navbar, Nav, NavItem }     from 'react-bootstrap';
import { ButtonGroup }        from 'react-bootstrap';

/*
Action classes
*/
import CurrencySelector                     from  './CurrencySelector/CurrencySelector.component';
import { ModeDropdownButton, ModeMenuItem } from  './ModeSelector/ModeSelector.component';

/**
 * The bar that is at the very top of each component
 * Has a selection of actions that are not navigation, hence called menu
 * 
 * -Caution: When changing css, be aware of the signout part that might extend to next line
 * --------- causing blockage to InAppNavBar.
 */
class MenuBar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        const { logout } = this.props.auth;
        logout();
    }

    render() {

        return (
            <div>
            <Navbar collapseOnSelect fixedTop className="menu-container">

                {/*Start of Logo section*/}
                <Navbar.Header className="menu-header">
                    <Navbar.Brand>
                        <a href="/dashboard" className="logo-redirect"><img src={qchain_logo} className="logo_img" alt="logo"/></a>
                    </Navbar.Brand>
                    <Navbar.Toggle className="burger-button"/>
                </Navbar.Header>
                {/* End of Logo section*/}

                <Navbar.Collapse> {/* Any children inside Collapse will be stored in hamburger menu on small screen*/}

                    {/* Start of Currency selector */}
                    <ButtonGroup bsSize="large" className="currency-selector">
                        <CurrencySelector currency="EQC">
                            <img src={eth_logo} className="currency-logo" alt="eth-logo"/>EQC
                        </CurrencySelector>
                        <CurrencySelector currency="XQC">
                            <img src={nem_logo} className="currency-logo" alt="nem-logo"/>XQC
                        </CurrencySelector>
                    </ButtonGroup>
                    {/* End of Currency selector */}

                    {/* Start of Mode selector */}
                    <ModeDropdownButton id="mode-selector" bsSize="large" className="mode-selector">
                        <ModeMenuItem mode="Advertiser">Advertiser</ModeMenuItem>
                        <ModeMenuItem mode="Publisher">Publisher</ModeMenuItem>
                    </ModeDropdownButton>
                    {/* End of Mode selector*/}

                    {/* Start of Sign Out menu*/}
                    <Nav pullRight stacked className="logout-container">
                        <NavItem className="user-label" eventKey={0} href="/profile">
                            <div className="menu-user-action">
                                <i className="far fa-user"></i>User Name
                            </div>
                        </NavItem>
                        <NavItem className="logout-label" eventKey={0} onClick={this.handleLogout} href="/">
                            <div className="menu-user-action">
                                <i className="fas fa-sign-out-alt"></i>Sign Out
                            </div>
                        </NavItem>
                    </Nav>
                    {/* End of Sign Out menu */}
                    
                </Navbar.Collapse>
                
            </Navbar>
            </div>
        );
    }
}


export default MenuBar;