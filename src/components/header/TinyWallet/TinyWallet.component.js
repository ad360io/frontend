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
// import nem from 'nem-sdk';

/*
Children Component
*/
// import NemEndpoint from '../../nem-endpoint/NemEndpoint.component';


/**
 * Wallet Component should display accurate balances
 *         Work to be done:
 *              - Pull data on componentsWillMount
 */
class TinyWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            err: null,
            xqc_balance: '----------',
            eqc_balance: '----------',
            nem_address: this.props.nem_address,
            eth_address: this.props.eth_address
        }

        // console.log('hithere');
        // console.log(this.props);
        // console.log(JSON.stringify(this.props.profile));
    }

    componentWillMount() {
        // this.getWalletInfo();
    }

    componentWillReceiveProps() {
        // this.getWalletInfo();
    }

    // getWalletInfo = () => {
    //     const walletURL = "https://qchain-marketplace-postgrest.herokuapp.com/wallet_view";
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

    getWalletInfo(address) {
        // var walletURL = "http://192.3.61.243:7890/account/mosaic/owned?address=TABCP73ZM4HIXITP6SZMYVB3EPX7OSHKP5PCEJQY";

        var walletURL = "http://192.3.61.243:7890/account/mosaic/owned?address=";

        // walletURL += this.props.profile.nem_address.split('-').join('');
        walletURL += address.split('-').join('');

        // const config = {
        //     headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        // };

        // console.log('asdfasdf');
        // console.log(this.state);
        // console.log(this.props);

        axios.get(walletURL)
        // axios.get(walletURL, config)
            .then((response) => {
                this.setState({
                    ...this.state,
                    finished: true,
                    xqc_balance: `${response.data.data.filter(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc')[0].quantity} XQC`,
                    // eqc_balance: `${response.data[0].eqc_balance} EQC`
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    ...this.state,
                    finished: true,
                    err: err
                })
            });
    }

    get_XQC_balance(address) {
        var walletURL = "http://192.3.61.243:7890/account/mosaic/owned?address=";
        // walletURL += address.split('-').join('');

        // var walletURL = "http://192.3.61.243:7890/account/mosaic/owned?address=TABCP73ZM4HIXITP6SZMYVB3EPX7OSHKP5PCEJQY";

        var self = this;

        var check_undef = setInterval(function() {
            if (typeof(address) != 'undefined') {
            //     // console.log('not yet');
            //     // this.sleep(2000);
            // } else {
                // console.log('k ready now');

                address = address.split('-').join('');
                // console.log(address);

                walletURL += address.split('-').join('');
                // console.log(walletURL);

                axios.get(walletURL)
                    .then((response) => {
                        var xqc_balance_1e6 = response.data.data.filter(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc')[0].quantity;
                        xqc_balance_1e6 = parseInt(xqc_balance_1e6, 10) / 1e6;
                        xqc_balance_1e6 = xqc_balance_1e6.toString() + ' XQC';

                        self.setState({
                            ...self.state,
                            finished: true,
                            xqc_balance: xqc_balance_1e6,
                            // xqc_balance: `${response.data.data.filter(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc')[0].quantity} XQC`,
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        self.setState({
                            ...self.state,
                            finished: true,
                            err: err
                        })
                    });

                clearInterval(check_undef);
            }
        }, 1000);

        if (this.state.xqc_balance != '----------') {
            clearInterval(check_undef);
        }

        console.log(this.state.xqc_balance);

        return this.state.xqc_balance;
    }

    asdf(asdf) {
        // console.log(asdf + 'yo');
        return asdf + 'yo';
    }

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

                <div className='tiny-wallet-container'>
                    <p className='tiny-wallet-title'>CURRENT BALANCE</p>

                    {
                        (this.props.currencyFilter === 'EQC'
                            ? <WalletEqcRenderer balance={this.state.eqc_balance} />
                            : <WalletXqcRenderer balance={this.get_XQC_balance(this.props.profile.nem_address)} />
                            // : <WalletXqcRenderer balance={this.state.xqc_balance} />
                        )
                    }
                </div>

            </LinkWithTooltip>
        );
    }
}

const WalletEqcRenderer = ({ balance }) => (
    <p className='tiny-currency-item'>
        <span className='tiny-wallet-currency-label'>{balance} </span>
    </p>
)

const WalletXqcRenderer = ({ balance }) => (
    <p className='tiny-currency-item'>
        <span className='tiny-wallet-currency-label'>{balance} </span>
    </p>
)

const mapStateToProps = (state) => {
    return {
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        profile: state.ProfileReducer.profile,
        // nem_address: state.ProfileReducer.profile.nem_address,
        // eth_address: state.ProfileReducer.profile.eth_address,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

function LinkWithTooltip({ tooltip_body, children }) {
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
