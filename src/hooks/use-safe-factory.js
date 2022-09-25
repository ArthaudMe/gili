import {createContext, useCallback, useContext, useMemo, useState} from "react";
import Web3 from "web3";
import Web3Adapter from "@gnosis.pm/safe-web3-lib";
import Safe, {SafeFactory} from "@gnosis.pm/safe-core-sdk";
import {Buffer} from 'buffer';
import {ethers} from 'ethers'
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';

window.Buffer = window.Buffer || Buffer;

const SafeFactoryContext = createContext(null);

const SafeFactoryProvider = ({children}) => {

    const [safeFactory, setSafeFactory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [safe, setSafe] = useState(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(null);
    const [safeAddress, setSafeAddress] = useState(null);
    const [ownerAddress, setOwnerAddress] = useState(null);
    const [txHash, setTXHash] = useState(null);

    const initializeFactory = useCallback(async (ownerAddress) => {
        try {
            const safeAccountConfig = {
                owners: [ownerAddress],
                threshold: 1,
            };

            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const web3 = new Web3(window.ethereum);
            const web3Adapter = new Web3Adapter({web3, signerAddress: accounts[0]});

            setOwnerAddress(ownerAddress);
            setLoading(true);
            setConnected(false);

            const safeFactory = await SafeFactory.create({ethAdapter: web3Adapter, isL1SafeMasterCopy: true});
            setSafeFactory(safeFactory);
            const safeDeploymentConfig = {
                saltNonce: `${Math.floor(Math.random() * 1000)}`
            };
            const safeAddress = await safeFactory.predictSafeAddress({
                safeAccountConfig,
                safeDeploymentConfig
            });
            setSafeAddress(safeAddress);
            setLoading(false);
            setConnected(true);
            return safeFactory;
        } catch (e) {
            setError(e.message);
        }
    }, []);

    const deploySafe = useCallback(async () => {
        try {
            const safeAccountConfig = {
                owners: [ownerAddress],
                threshold: 1,
            }
            setLoading(true);
            const safeDeploymentConfig = {
                saltNonce: `${Math.floor(Math.random() * 1000)}`
            };
            const safe = await safeFactory.deploySafe({
                safeAccountConfig,
                safeDeploymentConfig,
                callback: setTXHash
            });
            setLoading(false);
            setSafe(safe);
            return safe;
        } catch (e) {
            console.log(e.message, 'error use safe factory');
            setLoading(false);
        }
    }, [ownerAddress, safeFactory]);

    const connectSafe = useCallback(async (safeAddress) => {
        try {
            const web3Provider = new Web3.providers.HttpProvider(
                'https://mainnet.infura.io/v3/7044fd6b60b94929a59819a4c6b1e82a'
            );
            const provider = new ethers.providers.Web3Provider(web3Provider);
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const safeOwner = provider.getSigner(accounts[0]);
            const ethAdapter = new EthersAdapter({
                ethers,
                signer: safeOwner
            });
            setLoading(true);
            setConnected(false);
            const safe = await Safe.create({ethAdapter, safeAddress, isL1SafeMasterCopy: true});
            setSafe(safe);
            setConnected(true);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            console.log(e.message, 'connect safe error')
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({
        initializeFactory,
        safeAddress,
        deploySafe,
        error,
        connected,
        loading,
        safeFactory,
        safe,
        txHash,
        setLoading,
        connectSafe
    }), [initializeFactory, safeAddress, deploySafe, error, connected, loading, safeFactory, safe, txHash, setLoading, connectSafe]);

    return (
        <SafeFactoryContext.Provider value={contextValue}>
            {children}
        </SafeFactoryContext.Provider>
    )
};

export const useSafeFactory = () => {
    const value = useContext(SafeFactoryContext);

    if (!value) {
        throw new Error(`'You probably forgot to put <SafeFactoryProvider>.'`)
    }
    return value;
}

export default SafeFactoryProvider;
