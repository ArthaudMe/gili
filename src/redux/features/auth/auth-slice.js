import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const connect = createAsyncThunk('auth/connect', async ({connect}, thunkAPI) => {
    try {
        const response = await connect();
        return response[0].accounts[0].address;
    }catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        address: '',
        authLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(connect.pending, (state) => {
            state.authLoading = true;
        }).addCase(connect.fulfilled, (state, action) => {
            state.authLoading = false;
            state.address = action.payload;
        }).addCase(connect.rejected, (state, action) => {
            state.authLoading = false;
            state.error = action.payload;
            console.log(action.payload)
            console.log('rejected');
        })
    }
});

export const selectAuth = state => state.auth;
export const AUTH_ACTION_CREATORS = {connect};
export default authSlice.reducer;
