import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const getCollectibles = createAsyncThunk('collectibles/getCollectibles', (arg, thunkAPI) => {
    try {

    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});


const getCollectible = createAsyncThunk('collectibles/getCollectible', (arg, thunkAPI) => {
    try {

    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});

const collectiblesSlice = createSlice({
    name: 'collectibles',
    initialState: {
        collectibles: [],
        loading: false,
        error: null,
        collectible: null
    },
    extraReducers: {},
    reducers: {}
});

export const selectCollectibles = state => state.collectibles;
export const INVESTMENT_ACTION_CREATORS = {getCollectibles, getCollectible};
export default collectiblesSlice.reducer;
