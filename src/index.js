import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {THEMES} from "./utils/themes";
import {Provider} from "react-redux";
import store from "./redux/app/store";
import SafeProvider from "@gnosis.pm/safe-apps-react-sdk";
import {init, Web3OnboardProvider} from "@web3-onboard/react";
import metamask from "./assets/images/metamask.png";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import gnosisModule from "@web3-onboard/gnosis";
import {SnackbarProvider} from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'));

const walletConnect = walletConnectModule();
const injected = injectedModule();
const gnosis = gnosisModule();

const INFURA_ID = '7044fd6b60b94929a59819a4c6b1e82a';

const web3Onboard = init({
    wallets: [walletConnect, injected, gnosis],
    chains: [
        {
            id: '0x1',
            token: 'ETH',
            label: 'Ethereum',
            rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
        },
        {
            id: '0x89',
            token: 'MATIC',
            label: 'Polygon',
            rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
        },
        {
            label: 'Gnosis',
            id: '0x64',
            rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
            token: 'GNO'
        }
    ],
    apiKey: '435d3332-ad33-4dd1-98bf-7edd3e210a60',
    appMetadata: {
        name: 'Gili',
        agreement: {
            version: '1.0.0',
            termsUrl: 'https://www.blocknative.com/terms-conditions',
            privacyUrl: 'https://www.blocknative.com/privacy-policy'
        },
        description: 'Create a club to invest in crypto/NFTs + startups / real estate / art etc. with your friends',
        explore: 'https://blocknative.com',
        icon: metamask,
        logo: metamask,
        gettingStartedGuide: 'https://blocknative.com'
    }
});

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={THEMES.darkTheme}>
                    <CssBaseline enableColorScheme={true}/>
                    <SafeProvider>
                        <Web3OnboardProvider web3Onboard={web3Onboard}>
                            <SnackbarProvider
                                autoHideDuration={2000}
                                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                                maxSnack={5}>
                                <App/>
                            </SnackbarProvider>
                        </Web3OnboardProvider>
                    </SafeProvider>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
