/*
Core Libs
*/
import React from 'react';

/*
Material UI Components
*/
import { Card, CardText } from 'material-ui/Card';
import Divider            from 'material-ui/Divider';

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
 * Wallet Component should display accurate balances
 *         Work to be done:
 *              - Pull data on componentsWillMount
 */
const DashboardWallet = () =>
    <div className='wallet-container'>
        <Card className='wallet-info-card' style={{marginBottom:'2%'}}>
            <h2 className='wallet-card-title'>Your Balances</h2>
            <Divider style={{width: '75%', marginBottom:'4%'}}/>
            <CardText>
            <ul>
                <li className='currency-item'>
                    <img className='eqc-icon' src={eqc_icon} alt='eqc-icon'/>
                    <span className='wallet-currency-label'>0.123455 EQC </span>
                </li>
                <li className='currency-item'>
                    <img className='xqc-icon' src={xqc_icon} alt='xqc-icon'/>
                    <span className='wallet-currency-label'>12345.12 XQC </span>
                </li>
            </ul>
            </CardText>
        </Card>
    </div>

export default DashboardWallet;
