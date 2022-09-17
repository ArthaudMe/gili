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
            name: 'Geometry',
            goal: 5000,
            duration: {
                amount: 1,
                unit: 'month'
            },
            token: 'GEO',
            currency: 'Ethereum',
            maximumMemberCount: 10
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
