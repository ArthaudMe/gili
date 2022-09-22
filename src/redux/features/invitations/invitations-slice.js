import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {CONSTANTS} from "../../../utils/constants";

const createInvitation = createAsyncThunk(
    'invitations/createInvitation',
    async ({data, showMessage}, thunkAPI) => {
    try {
        const response = await axios({
            url: `${CONSTANTS.BASE_SERVER_URL}/user/invitations`,
            data,
            method: 'POST'
        });
        showMessage(response.data.message, {variant: 'success'});
        return response.data;
    }catch (e) {
        const {message} = e.response.data;
        showMessage(message, {variant: 'success'});
        return thunkAPI.rejectWithValue(message);
    }
});

const verifyInvitation = createAsyncThunk(
    'invitations/verifyInvitation',
    async ({invitation}, thunkAPI) => {
    try {
        const response = await axios({
            url: `${CONSTANTS.BASE_SERVER_URL}/user/invitations/${invitation}/verify`,
            method: 'GET'
        });
        return response.data;
    }catch (e) {
        const {message} = e.response.data;
        return thunkAPI.rejectWithValue(message);
    }
});

const invitationsSlice = createSlice({
    name: 'invitations',
    initialState: {
        invitationLoading: false,
        invitationError: null,
        invitation: null
    },
    reducers: {
        next: (state) => {
            if (state.step < 5) {
                state.step += 1;
            }
        },
        previous: (state) => {
            if (state.step > 1) {
                state.step -= 1;
            }
        },
        saveClub: (state, action) => {
            state.club = action.payload
        },
        saveWallet: (state, action) => {
            state.wallet = action.payload
        },
        saveNetwork: (state, action) => {
            state.selectedNetwork = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(createInvitation.pending, (state) => {
            state.invitationLoading = true;
        }).addCase(createInvitation.fulfilled, (state, action) => {
            state.invitationLoading = false;
            state.invitation = action.payload.data;
        }).addCase(createInvitation.rejected, (state, action) => {
            state.invitationLoading = false;
            state.invitationError = action.payload;
        }).addCase(verifyInvitation.pending, (state) => {
            state.invitationLoading = true;
        }).addCase(verifyInvitation.fulfilled, (state, action) => {
            state.invitationLoading = false;
            state.invitation = action.payload.data;
        }).addCase(verifyInvitation.rejected, (state, action) => {
            state.invitationLoading = false;
            state.invitationError = action.payload;
        });
    }
});

export const selectInvitation = state => state.invitation;
export const INVITATIONS_ACTION_CREATORS = {...invitationsSlice.actions, createInvitation, verifyInvitation};
export default invitationsSlice.reducer;
