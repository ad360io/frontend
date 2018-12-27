/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/*
Local CSS
*/
import './TinyWallet.component.css'

/*
React Bootstrap
*/
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

/*
NEM SDK
*/
import nem from 'nem-sdk';
import {formatNumberAbbr} from "../../../common/format";
import {walletState} from "../../../common/wallet-state";
import {FComponent} from "../../../common/f-component";
import {isEqual} from "lodash";
import {getJson} from "../../../common/api/method/get-json";

/*
Children Component
*/
// import NemEndpoint from '../../nem-endpoint/NemEndpoint.component';


/**
 * Wallet Component should display accurate balances
 *         Work to be done:
 *              - Pull data on componentsWillMount
 */
class TinyWallet extends FComponent {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            err: null,
            xqc_balance: 'Loading...',
            eqc_balance: 'Loading...',
        }

        // console.log('hithere');
        // console.log(this.props);
        // console.log(JSON.stringify(this.props.profile));


        /* CONFIG */
        this.mainnet_NIS = 'http://san.nem.ninja';
        this.testnet_NIS = 'http://192.3.61.243';

        this.NEM_port = 7890;

        this.NEM_mainnet_networkId = 104;
        this.NEM_testnet_networkId = -104;

        // this.NEM_node_URI = this.mainnet_NIS;
        this.NEM_node_URI = this.testnet_NIS;

        // this.NEM_networkId = nem.model.network.data.mainnet.id;
        this.NEM_networkId = nem.model.network.data.testnet.id;


        /* Create connection to NIS supernode */
        this.endpoint = nem.model.objects.create('endpoint')(this.NEM_node_URI, this.NEM_port);

        this.onUnmount(walletState.onChange(() => this.forceUpdate()));


    }

    // componentWillMount() {
    //     // this.getWalletInfo();
    // }
    //
    // componentWillReceiveProps() {
    //     // this.getWalletInfo();
    // }

    componentDidUpdate(prevProps) {
        if(!isEqual(prevProps.profile, this.props.profile)) {
            this.getBalance(this.props.profile.nem_address);
        }
    }

    // getWalletInfo = () => {
    //     const walletURL = "https://marketplacedb.qchain.co/wallet_view";
    //     const config = {
    //         headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
    //     };
    //     axios.get(walletURL, config)
    //         .then((response) => {
    //             this.setState({
    //                 ...this.state,
    //                 finished: true,
    //                 xqc_balance: `${response.data[0].xqc_balance} XQC`,
    //                 eqc_balance: `${response.data[0].eqc_balance} EQC`
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             this.setState({
    //                 ...this.state,
    //                 finished: true,
    //                 err: err
    //             })
    //         })
    // }

    sleep(milliseconds) {
        console.log('sleeping');

        var start = new Date().getTime();

        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    // getWalletInfo(address) {
    //     // var walletURL = "http://192.3.61.243:7890/account/mosaic/owned?address=TABCP73ZM4HIXITP6SZMYVB3EPX7OSHKP5PCEJQY";

    //     var walletURL = "http://192.3.61.243:7890/account/mosaic/owned?address=";

    //     // walletURL += this.props.profile.nem_address.split('-').join('');
    //     walletURL += address.split('-').join('');

    //     // const config = {
    //     //     headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
    //     // };

    //     // console.log('asdfasdf');
    //     // console.log(this.state);
    //     // console.log(this.props);

    //     axios.get(walletURL)
    //     // axios.get(walletURL, config)
    //         .then((response) => {
    //             this.setState({
    //                 ...this.state,
    //                 finished: true,
    //                 xqc_balance: `${response.data.data.filter(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc')[0].quantity} XQC`,
    //                 // eqc_balance: `${response.data[0].eqc_balance} EQC`
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             this.setState({
    //                 ...this.state,
    //                 finished: true,
    //                 err: err
    //             })
    //         });
    // }

    getBalance = async (address) => {
        if (this.props.currencyFilter === 'XQC') {
            // const { allApis: { getJson } } = this.props;
            let walletUrl = `https://nis.qchain.co/account/mosaic/owned`;

            let resp = await getJson(walletUrl, { queryParams: { address: address.split('-').join('')}, fromBaseUrl: false});

            if(resp.data) {
                let balance = resp.data.data.find(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc').quantity;
                walletState.setState(balance);
            }
        } else if (this.props.currencyFilter === 'EQC') {

        } else {

        }
    };

    // get_XQC_balance(address) {
    //     if (address === 'undefined' || address === '') {
    //         return this.state.xqc_balance;
    //     }
    //
    //     var walletURL = "https://nis.qchain.co/account/mosaic/owned?address=";
    //
    //     // var walletURL = "http://192.3.61.243:7890/account/mosaic/owned?address=";
    //     // walletURL += address.split('-').join('');
    //
    //     // var walletURL = "http://192.3.61.243:7890/account/mosaic/owned?address=TABCP73ZM4HIXITP6SZMYVB3EPX7OSHKP5PCEJQY";
    //
    //     var self = this;
    //
    //     var check_undef = setInterval(function() {
    //         if (typeof(address) !== 'undefined') {
    //     //     //     // console.log('not yet');
    //     //     //     // this.sleep(2000);
    //     //     // } else {
    //     //         // console.log('k ready now');
    //     //
    //             address = address.split('-').join('');
    //     //         // console.log(address);
    //     //
    //             walletURL += address.split('-').join('');
    //     //         // console.log(walletURL);
    //     //
    //     //
    //             axios.get(walletURL)
    //                 .then((response) => {
    //                     var xqc_balance_1e6 = '0 XQC'
    //
    //
    //
    //                     xqc_balance_1e6 = response.data.data.filter(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc')[0].quantity;
    //                     console.log(formatNumberAbbr(xqc_balance_1e6, 2));
    //
    //                     xqc_balance_1e6 = parseInt(xqc_balance_1e6, 10) / 1e6;
    //
    //                     var num_digits = xqc_balance_1e6.toString().replace('.', '').length;
    //
    //                     if (num_digits > 9) {
    //                         var num_int_digits = Math.trunc(xqc_balance_1e6).toString().length;
    //
    //                         if (num_int_digits >= 9) {
    //                             xqc_balance_1e6 = Math.trunc(xqc_balance_1e6);
    //                         } else {
    //                             xqc_balance_1e6 = xqc_balance_1e6.toFixed(9 - num_int_digits);
    //                         }
    //                     }
    //
    //                     xqc_balance_1e6 = xqc_balance_1e6.toString() + ' XQC';
    //
    //                     self.setState({
    //                         ...self.state,
    //                         finished: true,
    //                         xqc_balance: xqc_balance_1e6,
    //     //                     // xqc_balance: `${response.data.data.filter(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc')[0].quantity} XQC`,
    //                     })
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                     self.setState({
    //                         ...self.state,
    //                         finished: true,
    //                         err: err
    //                     })
    //                 });
    //     //
    //     //
    //     //         // nem.com.requests.account.mosaics.owned(self.endpoint, address).then(function(res) {
    //     //         //     // get mosaics owned by account
    //     //         //     var mosaics = res.data;
    //     //
    //     //         //     // filter XQC variable
    //     //         //     var xqc_balance = mosaics.filter(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc')[0].quantity;
    //     //         //     xqc_balance = parseInt(xqc_balance, 10) / 1e6;
    //     //         //     xqc_balance = xqc_balance.toString() + ' XQC';
    //     //
    //     //         //     self.setState({xqc_balance: xqc_balance});
    //     //         // }, function(err) {
    //     //         //     console.error(err);
    //     //         // })
    //     //
    //     //
    //             clearInterval(check_undef);
    //         }
    //     }, 1000);
    //
    //     if (this.state.xqc_balance !== 'Loading...') {
    //         clearInterval(check_undef);
    //     }
    //
    //     return this.state.xqc_balance;
    //
    //
    //     // console.log(this.state.xqc_balance);
    //
    //     // if (address === 'TATDB5NXVQO2O6PCLEFT33TKU6ELA2QVY6YLXORF') {
    //     //     return '18550 XQC';
    //     // } else {
    //     //     return this.state.xqc_balance;
    //     // }
    // }

    // get_XQC_balance() {
    //     const Http = new XMLHttpRequest();
    //     const url='http://192.3.61.243:7890/account/mosaic/owned?address=TABCP73ZM4HIXITP6SZMYVB3EPX7OSHKP5PCEJQY';

    //     Http.open('GET', url);
    //     Http.send();

    //     var mosaics;
    //     var xqc;

    //     Http.onreadystatechange = (e) => {
    //         mosaics = JSON.parse(Http.responseText).data;
    //         // console.log(mosaics);

    //     var xqc = mosaics.filter(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc')[0].quantity;
    //     }

    //     this.setState({xqc_balance: xqc});
    // }

    render() {
        let _walletBalance = walletState.getState();

        // console.log(_walletBalance);

        return (
            <LinkWithTooltip
                tooltip_body={
                    (this.props.currencyFilter === 'EQC'
                        ? <span><strong>ETH address:</strong> {this.props.eth_address}</span>
                        : <span><strong>NEM address:</strong> {this.props.profile.nem_address}</span>
                        // : <span><strong>NEM address:</strong> {JSON.stringify(this.props.profile)}</span>
                        // : <span><strong>NEM address:</strong> {this.props.nem_address}</span>
                    )
                }
            >

                <div className='tiny-wallet-container' style={{ cursor: 'default' }}>
                    <p className='tiny-wallet-title'>CURRENT BALANCE</p>

                    {/* {
                        (this.props.currencyFilter === 'EQC'
                            ? <WalletBalanceRenderer balance={this.state.eqc_balance} />
                            : <WalletBalanceRenderer balance={this.get_XQC_balance(this.props.profile.nem_address)} />
                            // : <WalletXqcRenderer balance={this.state.xqc_balance} />
                        )
                    } */}
                    {/*this.props.currencyFilter === 'EQC' ? this.state.eqc_balance : this.get_XQC_balance(this.props.profile.nem_address)*/}

                    <WalletBalanceRenderer
                        balance={!_walletBalance ? `Loading...` : `${formatNumberAbbr(_walletBalance, this.props.currencyFilter)} ${this.props.currencyFilter}`}/>

                </div>

            </LinkWithTooltip>
        );
    }
}

const WalletBalanceRenderer = ({ balance }) => (
    <div className='tiny-currency-item'>
        <span className='tiny-wallet-currency-label'>{balance}</span>
    </div>
)


const mapStateToProps = (state) => {
    return {
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        profile: state.ProfileReducer.profile,
        nem_address: state.ProfileReducer.profile.nem_address,
        eth_address: state.ProfileReducer.profile.eth_address,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export function LinkWithTooltip({ tooltip_body, children }) {
    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="NEM or ETH address">{tooltip_body}</Tooltip>}>
            {children}
        </OverlayTrigger>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TinyWallet);
