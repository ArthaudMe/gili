import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const getInvestments = createAsyncThunk('investments/getInvestments', (arg, thunkAPI) => {
    try {

    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});


const getInvestment = createAsyncThunk('investments/getInvestment', (arg, thunkAPI) => {
    try {

    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});

const investmentsSlice = createSlice({
    name: 'investments',
    initialState: {
        investments: [],
        loading: false,
        error: null,
        investment: null
    },
    extraReducers: {},
    reducers: {}
});

export const selectInvestments = state => state.investments;
export const INVESTMENT_ACTION_CREATORS = {getInvestments, getInvestment};
export default investmentsSlice.reducer;
