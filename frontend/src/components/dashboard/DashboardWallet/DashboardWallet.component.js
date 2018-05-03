/*
Core Libs and Children Components
*/
import React, { Component } from 'react';

/*
Material UI Components
*/
import { Card, CardText } from 'material-ui/Card';

/*
Image Resources
*/
import eqc_icon from '../../../assets/images/eqc_icon.png';
import xqc_icon from '../../../assets/images/xqc_icon.png';

/*
Local CSS
*/
import './DashboardWallet.component.css'

/**
 * 
 */
class DashboardWallet extends Component {

    render() {
        return <div className="wallet-container">
            <Card className="wallet-info-card" style={{background:"#fafafa"}}>
                <CardText>
                <h3 className="wallet-card-title"> Your Balances </h3>
                <ul>
                    <li>
                        <img className="eqc-icon" src={eqc_icon} alt="eqc-icon"/>
                        <span className="wallet-currency-label">0.123455 EQC </span>
                    </li>
                    <li>
                        <img className="xqc-icon" src={xqc_icon} alt="xqc-icon"/>
                        <span className="wallet-currency-label">12345.12 XQC </span>
                    </li>
                </ul>
                </CardText>
            </Card>
        </div>
    }
}


export default DashboardWallet;