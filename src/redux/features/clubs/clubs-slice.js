import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CLUBS_API} from "../../../api/clubs";
import {clubs} from "./clubs-data";

const getClubs = createAsyncThunk('clubs/getClubs', async ({address}, thunkAPI) => {
    try {
        const response = await CLUBS_API.getClubs(address);
        return response.data;
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});

const getClub = createAsyncThunk('clubs/getClub', async ({token, id}, thunkAPI) => {
    try {
        const response = await CLUBS_API.getClubs(token, id);
        return response.data;
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});


const updateClub = createAsyncThunk('clubs/updateClub', async ({token, data, id}, thunkAPI) => {
    try {
        const response = await CLUBS_API.updateClub(token, data, id);
        return response.data;
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});


const createClub = createAsyncThunk(
    'clubs/createClub',
    async ({token, data, handleNext}, thunkAPI) => {
    try {
        const response = await CLUBS_API.createClub(token, data);
        handleNext();
        return response.data;
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});

const clubsSlice = createSlice({
    name: 'clubs',
    initialState: {
        clubs: [...clubs],
        club: clubs[0],
        loading: false,
        memberClubs: [],
        adminClubs: [],
        error: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getClubs.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getClubs.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.clubs = action.payload.data;
        }).addCase(getClubs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.clubs = [];
        }).addCase(getClub.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getClub.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.club = action.payload.data;
        }).addCase(getClub.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(updateClub.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updateClub.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.clubs = [...state.clubs.map(club => {
                if(club._id === action.payload._id){
                    return action.payload;
                }
                return club;
            })];
        }).addCase(updateClub.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(createClub.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createClub.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.clubs = [action.payload.data, ...state.clubs];
        }).addCase(createClub.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});



export const selectClubs = state => state.clubs;
export const CLUBS_ACTION_CREATORS = {getClub, getClubs, updateClub, createClub};
export default clubsSlice.reducer;
