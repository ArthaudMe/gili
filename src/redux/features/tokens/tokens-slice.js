import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const getTokens = createAsyncThunk('tokens/getTokens', (arg, thunkAPI) => {
    try {

    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});


const getToken = createAsyncThunk('tokens/getToken', (arg, thunkAPI) => {
    try {

    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});

const tokensSlice = createSlice({
    name: 'tokens',
    initialState: {
        tokens: [],
        loading: false,
        error: null,
        token: null
    },
    extraReducers: {},
    reducers: {}
});

export const selectTokens = state => state.tokens;
export const TOKEN_ACTION_CREATORS = {getToken, getTokens};
export default tokensSlice.reducer;
