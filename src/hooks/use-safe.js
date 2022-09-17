import {createContext, useCallback, useState} from "react";
import Web3 from "web3";
import Web3Adapter from "@gnosis.pm/safe-web3-lib";
import Safe, {SafeFactory} from "@gnosis.pm/safe-core-sdk";

const SafeContext = createContext(null);

const SafeProvider = ({children}) => {

    const [safeFactory, setSafeFactory] = useState(null);
    const [safe, setSafe] = useState(null);
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(null);

    const initializeSafe = useCallback(async ({ownerAddress, safeAddress}) => {
        try {
            const provider = new Web3.providers.HttpProvider('http://localhost:3001');
            const web3 = new Web3(provider);
            const owner = `0x${ownerAddress}`;
            const ethAdapter = new Web3Adapter({
                web3,
                signerAddress: owner
            });
            const safe = await Safe.create({ethAdapter, safeAddress, isL1SafeMasterCopy: true});
            setSafe(safe);
        } catch (e) {
            setError(e.message);
        }
    }, []);


    return (
        <SafeContext.Provider value={{initializeSafe, initializeFactory}}>
            {children}
        </SafeContext.Provider>
    )
};

