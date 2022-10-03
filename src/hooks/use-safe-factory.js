import {createContext, useCallback, useContext, useMemo, useState} from "react";
import Safe, {SafeFactory} from "@gnosis.pm/safe-core-sdk";
import {Buffer} from 'buffer';
import EthersAdapter from "@gnosis.pm/safe-ethers-lib";
import {ethers} from "ethers";
import SafeServiceClient from "@gnosis.pm/safe-service-client";
import {UTILS} from "../utils/utils";
import {getProxyFactoryDeployment} from "@gnosis.pm/safe-deployments";

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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const initializeFactory = useCallback(async (ownerAddress) => {
        try {
            const safeAccountConfig = {
                owners: [ownerAddress],
                threshold: 1,
            };

            setOwnerAddress(ownerAddress);
            setLoading(true);
            setConnected(false);
            const ethAdapter = new EthersAdapter({ethers, signer});
            const safeFactory = await SafeFactory.create({ethAdapter});
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
    }, [signer]);

    const deploySafe = useCallback(async () => {
        try {
            const safeAccountConfig = {
                owners: [ownerAddress],
                threshold: 1,
            }
            setLoading(true);
            const safe = await safeFactory.deploySafe({
                safeAccountConfig,
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

    const connectSafe = useCallback(async (safeAddress, network) => {
        try {
            setLoading(true);
            setConnected(false);
            const contractNetworks = {
                [network]: {
                    safeProxyFactoryAddress: getProxyFactoryDeployment({network}).defaultAddress,
                }
            }
            const ethAdapter = new EthersAdapter({ethers, signer});
            const safe = await Safe.create({ethAdapter, safeAddress, contractNetworks, isL1SafeMasterCopy: true});
            setSafe(safe);
            setConnected(true);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            console.log(e.message, 'connect safe error')
            setLoading(false);
        }
    }, [signer]);

    const getSafeServiceClient = useCallback(async (network) => {
        const ethAdapter = new EthersAdapter({ethers, signer});
        const txServiceUrl = UTILS.getNetworkById(network).txServiceURL;
        return new SafeServiceClient({txServiceUrl, ethAdapter});
    }, [signer]);

    const contextValue = useMemo(() => {

        return {
            getSafeServiceClient,
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
        }
    }, [
        getSafeServiceClient,
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
    ]);

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
