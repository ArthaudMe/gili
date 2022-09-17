import {createContext, useContext, useMemo, useState} from "react";
import Web3 from "web3";
import Web3Adapter from "@gnosis.pm/safe-web3-lib";
import {SafeFactory} from "@gnosis.pm/safe-core-sdk";
import {Buffer} from 'buffer';
window.Buffer = window.Buffer || Buffer;

const SafeFactoryContext = createContext(null);

const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/7044fd6b60b94929a59819a4c6b1e82a`);
const web3 = new Web3(provider);
const safeDeploymentConfig = {
    saltNonce: `${Math.floor(Math.random() * 1000)}`
};

const SafeFactoryProvider = ({children}) => {

    const [safeFactory, setSafeFactory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(null);
    const [safeAddress, setSafeAddress] = useState(null);
    const [ownerAddress, setOwnerAddress] = useState(null);

    const initializeFactory = async (ownerAddress) => {
        try {
            const safeAccountConfig = {
                owners: [ownerAddress],
                threshold: 1,
            };
            const ethAdapter = new Web3Adapter({
                web3,
                signerAddress: ownerAddress
            });
            setOwnerAddress(ownerAddress);
            setLoading(true);
            setConnected(false);
            const safeFactory = await SafeFactory.create({ethAdapter});
            setSafeFactory(safeFactory);
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
    }

    const deploySafe = async () => {
        try {
            const safeAccountConfig = {
                owners: [ownerAddress],
                threshold: 1,
            }
            setLoading(true);
            const safe = await safeFactory.deploySafe({
                safeAccountConfig,
                safeDeploymentConfig
            });
            setLoading(false);
            return safe;
        } catch (e) {
            console.log(e.message, 'error use safe factory');
        }
    }

    const contextValue = useMemo(() => ({
        initializeFactory,
        safeAddress,
        deploySafe,
        error,
        connected,
        loading,
        safeFactory
    }), [initializeFactory, safeAddress, deploySafe, error, connected, loading, safeFactory]);

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
