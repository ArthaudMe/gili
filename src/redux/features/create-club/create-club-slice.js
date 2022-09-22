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
});


const createClubSlice = createSlice({
    name: 'createClub',
    initialState: {
        loading: false,
        error: null,
        club: {
            "_id": "632c8461ea12c80269ec8ed9",
            "name": "STAN",
            "token": "st",
            "createdBy": "0x24bfafee350b76b4c73422a8f54ada445d938cd0",
            "goal": 1,
            "duration": {"amount": "11", "unit": "day"},
            "currency": "Ethereum",
            "maximumMemberCount": 12,
            "treasury": 0.0001,
            "minted": 0.0001,
            "safeAddress": "0x2b97bb03F186A5eC54c13640CFFd6c342843D9AD",
            "status": "Active",
            "createdAt": 1663861857045,
            "updatedAt": 1663862268067
        },
        gas: '',
        step: 5
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
export const CREATE_CLUB_ACTION_CREATORS = {
    next: createClubSlice.actions.next,
    previous: createClubSlice.actions.previous,
    saveClub: createClubSlice.actions.saveClub,
    getGas
};
export default createClubSlice.reducer;
