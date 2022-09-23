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
import {init, Web3OnboardProvider} from "@web3-onboard/react";
import metamask from "./assets/images/metamask.png";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import gnosisModule from "@web3-onboard/gnosis";
import {SnackbarProvider} from "notistack";
import SafeFactoryProvider from "./hooks/use-safe-factory";

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
            rpcUrl: `https://mainnet.infura.io/v3/7044fd6b60b94929a59819a4c6b1e82a`,
            token: 'GNO'
        },
        {
            label: 'Ethereum Ropsten  testnet',
            id: '0x3',
            rpcUrl: `https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
            token: 'ETH'
        },
        {
            label: 'Ethereum Rinkbey  testnet',
            id: '0x4',
            rpcUrl: `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
            token: 'ETH'
        },
        {
            label: 'Ethereum Goerli  testnet',
            id: '0x5',
            rpcUrl: `https://eth-goerli.g.alchemy.com/v2/oSgugno5wNBZN7UpN282anMAcJMtmTjo`,
            token: 'ETH'
        },
        {
            label: 'Ethereum Kovan testnet',
            id: '0x6',
            rpcUrl: `https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
            token: 'ETH'
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
                    <Web3OnboardProvider web3Onboard={web3Onboard}>
                        <SnackbarProvider
                            color="primary"
                            autoHideDuration={2000}
                            anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                            maxSnack={5}>
                            <SafeFactoryProvider>
                                <App/>
                            </SafeFactoryProvider>
                        </SnackbarProvider>
                    </Web3OnboardProvider>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
