import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

import {ViewEnum} from "../enums/index";
import FilesView from "../containers/view-files"
import MainView from "../containers/view-main"
import GraphView from "../containers/view-graph"
import LoginView from "../containers/view-login"
import SignUpView from "../containers/view-signup"
import NavBar from "../containers/NavBar";

import {currencyDb} from "../Utils/database";

import {fx} from "money";

var fxSetup;

class App extends Component {

    fetchExchangeRates(){
        fetch("https://openexchangerates.org/api/latest.json?app_id=c54e9d3417e541bdbab0af14227a7b93")
            .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong');
                    }
                }
            )
            .then(json => {

                currencyDb.currenciesConvert.update(1, {id:1,base: json.base, rates: json.rates})

                if (typeof fx !== "undefined" && fx.rates) {
                    fx.rates = json.rates;
                    fx.base = json.base;
                } else {
                    fxSetup = {
                        rates: json.rates,
                        base: json.base
                    }
                }
            })
            .catch(() => {
                {
                    currencyDb.currenciesConvert.get(1, (json) => {
                        console.log(json);
                        if (typeof fx !== "undefined" && fx.rates) {
                            fx.rates = json.rates;
                            fx.base = json.base;
                        } else {
                            fxSetup = {
                                rates: json.rates,
                                base: json.base
                            }
                        }
                    });
                }
            });
    };

    constructor(props) {
        super(props);
        currencyDb.currenciesConvert.count((count) => {
            if (count === 0) {
                currencyDb.currenciesConvert.add(
                    {
                        id: 1,
                        base: "USD",
                        rates: {
                            AED: 3.6729,
                            AFN: 67.655,
                            ALL: 123.38,
                            AMD: 484.777879,
                            ANG: 1.780867,
                            AOA: 165.9125,
                            ARS: 15.39,
                            AUD: 1.351747,
                            AWG: 1.800506,
                            AZN: 1.6775,
                            BAM: 1.7881,
                            BBD: 2,
                            BDT: 82.922,
                            BGN: 1.78757,
                            BHD: 0.376965,
                            BIF: 1715.5,
                            BMD: 1,
                            BND: 1.400724,
                            BOB: 6.953353,
                            BRL: 3.178324,
                            BSD: 1,
                            BTC: 0.000644168523,
                            BTN: 64.156574,
                            BWP: 10.503772,
                            BYN: 1.884393,
                            BYR: 20026.25,
                            BZD: 2.010971,
                            CAD: 1.371858,
                            CDF: 1405,
                            CHF: 0.990909,
                            CLF: 0.025113,
                            CLP: 673.945,
                            CNH: 6.894364,
                            CNY: 6.895325,
                            COP: 2930.5,
                            CRC: 558.765,
                            CUC: 1,
                            CUP: 25.5,
                            CVE: 101.45,
                            CZK: 24.530908,
                            DJF: 178.77,
                            DKK: 6.794426,
                            DOP: 47.355,
                            DZD: 109.026308,
                            EGP: 18.0447,
                            ERN: 15.341029,
                            ETB: 23.075,
                            EUR: 0.913639,
                            FJD: 2.091496,
                            FKP: 0.774329,
                            GBP: 0.774329,
                            GEL: 2.43594,
                            GGP: 0.774329,
                            GHS: 4.2,
                            GIP: 0.774329,
                            GMD: 46.1,
                            GNF: 9130,
                            GTQ: 7.344884,
                            GYD: 206.812795,
                            HKD: 7.78183,
                            HNL: 23.453643,
                            HRK: 6.7944,
                            HTG: 69.066083,
                            HUF: 285.217714,
                            IDR: 13322.359733,
                            ILS: 3.617415,
                            IMP: 0.774329,
                            INR: 64.22,
                            IQD: 1182.5,
                            IRR: 32452.977422,
                            ISK: 106.15,
                            JEP: 0.774329,
                            JMD: 129.305993,
                            JOD: 0.709402,
                            JPY: 112.74725,
                            KES: 103.075,
                            KGS: 67.646501,
                            KHR: 4030,
                            KMF: 451.559785,
                            KPW: 899.91,
                            KRW: 1134.825,
                            KWD: 0.3044,
                            KYD: 0.833638,
                            KZT: 315.98024,
                            LAK: 8201,
                            LBP: 1505.997207,
                            LKR: 152.620035,
                            LRD: 94,
                            LSL: 13.395,
                            LYD: 1.413845,
                            MAD: 9.899934,
                            MDL: 19.044427,
                            MGA: 3205,
                            MKD: 56.3415,
                            MMK: 1352.124087,
                            MNT: 2413.211133,
                            MOP: 8.019244,
                            MRO: 361.5,
                            MUR: 34.799,
                            MVR: 15.400126,
                            MWK: 725.49,
                            MXN: 18.99625,
                            MYR: 4.32835,
                            MZN: 64,
                            NAD: 13.48125,
                            NGN: 317.5,
                            NIO: 29.8,
                            NOK: 8.666678,
                            NPR: 102.70188,
                            NZD: 1.459942,
                            OMR: 0.385016,
                            PAB: 1,
                            PEN: 3.25747,
                            PGK: 3.2845,
                            PHP: 49.896,
                            PKR: 104.7,
                            PLN: 3.851731,
                            PYG: 5584.65,
                            QAR: 3.64175,
                            RON: 4.153531,
                            RSD: 112.541425,
                            RUB: 58.0666,
                            RWF: 826,
                            SAR: 3.75045,
                            SBD: 7.855214,
                            SCR: 13.601,
                            SDG: 6.695,
                            SEK: 8.822344,
                            SGD: 1.401069,
                            SHP: 0.774329,
                            SLL: 7466.285482,
                            SOS: 579,
                            SRD: 7.5375,
                            SSP: 117.2039,
                            STD: 22462.269743,
                            SVC: 8.753755,
                            SYP: 214.343333,
                            SZL: 13.395,
                            THB: 34.62875,
                            TJS: 8.819123,
                            TMT: 3.50998,
                            TND: 2.43225,
                            TOP: 2.328256,
                            TRY: 3.551998,
                            TTD: 6.733191,
                            TWD: 30.152,
                            TZS: 2235,
                            UAH: 26.498708,
                            UGX: 3634.7,
                            USD: 1,
                            UYU: 28.016143,
                            UZS: 3755,
                            VEF: 10.060796,
                            VND: 22737.870922,
                            VUV: 109.417723,
                            WST: 2.581965,
                            XAF: 599.841072,
                            XAG: 0.06123145,
                            XAU: 0.00081326,
                            XCD: 2.70255,
                            XDR: 0.730504,
                            XOF: 600.987479,
                            XPD: 0.00125707,
                            XPF: 109.896117,
                            XPT: 0.00111034,
                            YER: 250.3,
                            ZAR: 13.569299,
                            ZMK: 5252.024745,
                            ZMW: 9.265,
                            ZWL: 322.322775
                        }
                    })
                    .then(() => {
                        this.fetchExchangeRates();
                    });
            } else {
                this.fetchExchangeRates();
            }
        });
    }


    currentLayout() {
        switch (this.props.activeView) {
            case ViewEnum.MAIN_VIEW:{
                return (
                    <MainView />
                );
            }
            case ViewEnum.FILES_VIEW: {
                return (
                    <FilesView />
                );
            }
            case ViewEnum.GRAPH_VIEW: {
                return (
                    <GraphView />
                );
            }
            case ViewEnum.LOGIN_VIEW: {
                return (
                    <LoginView />
                );
            }
            case ViewEnum.SIGN_UP_VIEW: {
                return (
                    <SignUpView />
                );
            }
            default:
                return <div>ERROR</div>
        }
    }

    render() {
        var layout =
            <div>
                <NavBar />
                {
                    this.currentLayout()
                }
            </div>;

        return layout;
    }
}


function mapStateToProps(state) {
    return {
        activeView: state.activeView
    };
}


export default connect(mapStateToProps)(App);
