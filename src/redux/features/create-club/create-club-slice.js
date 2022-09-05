import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const getGas = createAsyncThunk('createClub/getGas', async (arg, {rejectWithValue}) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.blocknative.com/gasprices/blockprices'
        });
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
})

const createClubSlice = createSlice({
    name: 'createClub',
    initialState: {
        loading: false,
        error: null,
        club: {
            _id: 'geometryresearch',
            name: 'Geometry',
            goal: '5000',
            durationAmount: '50',
            durationUnit: 'day',
            token: 'GEO',
            currency: 'Ethereum',
            maximumMemberCount: 10
        },
        selectedWallet: {
            type: '',
            address: null,
        },
        selectedNetwork: {
            token: '',
            id: '',
            chainID: '',
            icon: '',
            label: ''
        },
        gas: '',
        step: 2
    },
    reducers: {
        next: (state) => {
            state.step += 1;
        },
        previous: (state) => {
            if (state.step > 1) {
                state.step -= 1;
            }
        },
        saveClub: (state, action) => {
            state.club = action.payload
        },
        saveWallet: (state, action) => {
            state.selectedWallet = action.payload
        },
        saveNetwork: (state, action) => {
            state.selectedNetwork = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getGas.pending, (state) => {
            state.loading = true;
        }).addCase(getGas.fulfilled, (state, action) => {
            state.loading = false;
            state.gas = action.payload;
        }).addCase(getGas.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const selectCreateClub = state => state.createClub;
export const CREATE_CLUB_ACTION_CREATORS = {...createClubSlice.actions, getGas};
export default createClubSlice.reducer;
