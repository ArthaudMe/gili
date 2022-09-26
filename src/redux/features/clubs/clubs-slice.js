import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CLUBS_API} from "../../../api/clubs";
import {MEMBERS_API} from "../../../api/members";

const getClubs = createAsyncThunk('clubs/getClubs', async ({address}, thunkAPI) => {
    try {
        const response = await CLUBS_API.getClubs(address);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});


const addMember = createAsyncThunk(
    'members/addMember',
    async ({club, member, addAdminToSafe, showMessage}, thunkAPI) => {
        try {
            const response = await MEMBERS_API.addMember(club, member);
            if(addAdminToSafe){
                await addAdminToSafe(member.address);
            }
            showMessage(response.data.message, {variant: 'success'});
            return response.data;
        } catch (e) {
            const {message} = e.response.data;
            showMessage(message, {variant: 'success'});
            return thunkAPI.rejectWithValue(message);
        }
    });


const depositFunds = createAsyncThunk(
    'clubs/depositFunds',
    async ({address, club, amount}, thunkAPI) => {
        try {
            const response = await CLUBS_API.depositFunds(address, club, amount);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.error.message);
        }
    });

const getClub = createAsyncThunk('clubs/getClub', async ({clubID}, thunkAPI) => {
    try {
        const response = await CLUBS_API.getClub(clubID);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});

const getClubBySafe = createAsyncThunk('clubs/getClubBySafe', async ({address}, thunkAPI) => {
    try {
        const response = await CLUBS_API.getClubBySafe(address);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.error.message);
    }
});


const updateClub = createAsyncThunk(
    'clubs/updateClub',
    async ({data, club, resetForm}, thunkAPI) => {
        try {
            const response = await CLUBS_API.updateClub(data, club);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.error.message);
        }
    });


const createClub = createAsyncThunk(
    'clubs/createClub',
    async ({data, callback, showMessage}, thunkAPI) => {
        try {
            const response = await CLUBS_API.createClub(data);
            if (callback) {
                callback();
            }
            showMessage(response.data.message, {variant: 'success'});
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.error.message);
        }
    });


const joinClub = createAsyncThunk(
    'clubs/joinClub',
    async ({club, data, callback, showMessage}, thunkAPI) => {
        try {
            const response = await CLUBS_API.joinClub(club, data);
            callback();
            showMessage(response.data.message, {variant: 'success'});
            return response.data;
        } catch (e) {
            showMessage(e.response.data.message, {variant: 'error'});
            return thunkAPI.rejectWithValue(e.response.error.message);
        }
    });


const clubsSlice = createSlice({
    name: 'clubs',
    initialState: {
        clubs: [],
        club: null,
        loading: false,
        memberClubs: [],
        adminClubs: [],
        error: '',
        member: null,
        message: null
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
        }).addCase(getClubBySafe.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getClubBySafe.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.club = action.payload.data;
        }).addCase(getClubBySafe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(updateClub.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updateClub.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.clubs = [...state.clubs.map(club => {
                if (club._id === action.payload._id) {
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
            state.club = action.payload.data;
        }).addCase(createClub.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(joinClub.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(joinClub.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.club = action.payload.data;
            state.member = action.payload.member;
        }).addCase(joinClub.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(depositFunds.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(depositFunds.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.club = action.payload.data;
            state.member = action.payload.member;
            state.message = action.payload.message;
        }).addCase(depositFunds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(addMember.pending, (state) => {
            state.membersLoading = true;
            state.memberError = null;
        }).addCase(addMember.fulfilled, (state, action) => {
            state.membersLoading = false;
            state.member = action.payload.data;
            state.memberError = null;
        }).addCase(addMember.rejected, (state, action) => {
            state.memberLoading = false;
            state.memberError = action.payload;
        })
    }
});


export const selectClubs = state => state.clubs;
export const CLUBS_ACTION_CREATORS = {
    getClub,
    getClubs,
    updateClub,
    createClub,
    joinClub,
    getClubBySafe,
    depositFunds,
    addMember
};
export default clubsSlice.reducer;
