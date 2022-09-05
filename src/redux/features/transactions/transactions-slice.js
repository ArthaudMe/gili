import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const getTransactions = createAsyncThunk('transactions/getTransactions', (arg, thunkAPI) => {
    try {

    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});


const getTransaction = createAsyncThunk('transactions/getTransaction', (arg, thunkAPI) => {
    try {

    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        loading: false,
        error: null,
        transaction: null
    },
    extraReducers: {},
    reducers: {}
});

export const selectTransactions = state => state.transactions;
export const TRANSACTION_ACTION_CREATORS = {};
export default transactionsSlice.reducer;
