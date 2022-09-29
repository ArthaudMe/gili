import {createContext, useCallback, useContext, useMemo, useState} from "react";
import Web3 from "web3";
import Web3Adapter from "@gnosis.pm/safe-web3-lib";
import Safe, {SafeFactory} from "@gnosis.pm/safe-core-sdk";
import {Buffer} from 'buffer';
import EthersAdapter from "@gnosis.pm/safe-ethers-lib";
import {ethers} from "ethers";

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
    const ethAdapter = new EthersAdapter({ethers, signer});

    const initializeFactory = useCallback(async (ownerAddress) => {
        try {
            const safeAccountConfig = {
                owners: [ownerAddress],
                threshold: 1,
            };

            setOwnerAddress(ownerAddress);
            setLoading(true);
            setConnected(false);
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

    const connectSafe = useCallback(async (safeAddress) => {
        try {
            setLoading(true);
            setConnected(false);
            const safe = await Safe.create({ethAdapter, safeAddress});
            setSafe(safe);
            setConnected(true);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            console.log(e.message, 'connect safe error')
            setLoading(false);
        }
    }, [ethAdapter]);

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
