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
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Button, ButtonGroup, DropdownButton }         from 'react-bootstrap';

/*
Other Custom Componenets
*/
import InAppNavBar          from '../InAppNavBar/InAppNavBar.component'

/**
 * Work to be done:
 *      - actions, icons, inappbar integration
 */
class MenuBar extends Component {

    constructor(props){
        super(props);
        this.handleModeSelection = this.handleModeSelection.bind(this);
        this.state = {
            mode: 'Advertiser'
        }
    }

    handleModeSelection(eventKey){
        let newState = {};

        if(eventKey === 1.1){
            newState = {
                mode: 'Advertiser'
            }
        }

        if(eventKey === 1.2){
            newState = {
                mode: 'Publisher'
            }
        }

        this.setState(newState);
    }

    render() {
        
        const menuBar = (
            <div>
            <Navbar collapseOnSelect fixedTop className="menu-container">
                <Navbar.Header className="menu-header">
                    <Navbar.Brand>
                        <a href="/dashboard" className="logo-redirect"><img src={qchain_logo} className="logo_img" alt="logo"/></a>
                    </Navbar.Brand>
                    <Navbar.Toggle className="burger-button"/>
                </Navbar.Header>
                
                <Navbar.Collapse>

                <ButtonGroup bsSize="large" className="currency-selector">
                    <Button><img src={eth_logo} className="currency-logo"/>EQC</Button>
                    <Button><img src={nem_logo} className="currency-logo"/>XQC</Button>
                </ButtonGroup>
                    
                <DropdownButton bsSize="large" eventKey={1} title={this.state.mode} className="mode-selector">
                    <MenuItem eventKey={1.1} onSelect={this.handleModeSelection}>Advertiser</MenuItem>
                    <MenuItem eventKey={1.2} onSelect={this.handleModeSelection}>Publisher</MenuItem>
                </DropdownButton>
        
                <Nav pullRight>
                    <Navbar.Link href="/profile">
                        <div className="menu-user-action menu-user-action-top">
                            <i class="far fa-user"></i>User Name
                        </div>
                    </Navbar.Link>
                    <Navbar.Link href="#">
                        <div className="menu-user-action">
                            <i class="fas fa-sign-out-alt"></i>Sign Out
                        </div>
                    </Navbar.Link>
                </Nav>
                </Navbar.Collapse>
                
            </Navbar>
            </div>
        );
        return menuBar;
    }
}


export default MenuBar;