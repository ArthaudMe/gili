import Web3 from "web3";
import Safe, {SafeFactory} from "@gnosis.pm/safe-core-sdk";
import Web3Adapter from "@gnosis.pm/safe-web3-lib";
import {createAsyncThunk} from "@reduxjs/toolkit";

const initializeFactory = createAsyncThunk(
    'safe/initializeFactory',
    async ({ownerAddress}, thunkAPI) => {
        try {
            const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/7044fd6b60b94929a59819a4c6b1e82a`);
            const web3 = new Web3(provider);
            const ethAdapter = new Web3Adapter({
                web3,
                signerAddress: ownerAddress
            });
            const safeFactory = await SafeFactory.create({ethAdapter});
            return {safeFactory};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    });


const initializeSafe = createAsyncThunk(
    'safe/initializeSafe',
    async ({ownerAddress, safeAddress}, thunkAPI) => {
        try {
            const provider = new Web3.providers.HttpProvider('http://localhost:3000');
            const web3 = new Web3(provider);
            const owner = `0x${ownerAddress}`;
            const ethAdapter = new Web3Adapter({
                web3,
                signerAddress: owner
            });
            const safe = await Safe.create({ethAdapter, safeAddress, isL1SafeMasterCopy: true});
            return {safe};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    });



export const SAFE_API = {initializeFactory, initializeSafe};
