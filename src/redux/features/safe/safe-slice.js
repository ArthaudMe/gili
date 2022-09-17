import {createSlice} from "@reduxjs/toolkit";
import {SAFE_API} from "../../../api/safe";


const safeSlice = createSlice({
    name: 'safe',
    initialState: {
        connected: false,
        safeFactory: null,
        safe: null,
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(SAFE_API.initializeFactory.pending, (state) => {
            state.connected = false;
            state.error = null;
            state.loading = true;
        }).addCase(SAFE_API.initializeFactory.fulfilled, (state, action) => {
            state.connected = true;
            state.error = null;
            state.loading = false;
            state.safeFactory = action.payload.safeFactory;
        }).addCase(SAFE_API.initializeFactory.rejected, (state, action) => {
            state.connected = false;
            state.loading = false;
            state.error = action.payload;
        }).addCase(SAFE_API.initializeSafe.pending, (state) => {
            state.connected = false;
            state.error = null;
            state.loading = true;
        }).addCase(SAFE_API.initializeSafe.fulfilled, (state, action) => {
            state.connected = true;
            state.error = null;
            state.loading = false;
            state.safe = action.payload.safe;
        }).addCase(SAFE_API.initializeSafe.rejected, (state, action) => {
            state.connected = false;
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const selectSafe = state => state.safe;
export const SAFE_ACTION_CREATORS = {initializeSafe: safeSlice.actions.initializeSafe};
export default safeSlice.reducer;
