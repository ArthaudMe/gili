import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const getGas = createAsyncThunk('createClub/getGas', async (arg, {rejectWithValue}) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.blocknative.com/gasprices/blockprices'
        });
        return response.data;
    }catch (e) {
        return rejectWithValue(e.response.data);
    }
})

const clubInvitationsSlice = createSlice({
    name: 'clubInvitations',
    initialState: {
        loading: false,
        error: null,
        club: {
            name: '',
            goal: '',
            durationAmount: '',
            durationUnit: '',
            token: '',
            currency: '',
            maximumMemberCount: 1
        },
        wallet: {
            type: '',
            account: null,
        },
        selectedNetwork: {
            token: '',
            id: '',
            chainID: '',
            icon: '',
            label: ''
        },
        gas: '',
        step: 1
    },
    reducers: {
        next: (state) => {
            if (state.step < 5) {
                state.step += 1;
            }
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
            state.wallet = action.payload
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

export const selectClubInvitation = state => state.clubInvitation;
export const CREATE_CLUB_ACTION_CREATORS = {...clubInvitationsSlice.actions, getGas};
export default clubInvitationsSlice.reducer;
