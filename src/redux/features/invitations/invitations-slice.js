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
        } catch (e) {
            const {message} = e.response.data;
            showMessage(message, {variant: 'success'});
            return thunkAPI.rejectWithValue(message);
        }
    });

const verifyInvitation = createAsyncThunk(
    'invitations/verifyInvitation',
    async ({invitation, showMessage, connectSafe}, thunkAPI) => {
        try {
            const response = await axios({
                url: `${CONSTANTS.BASE_SERVER_URL}/user/invitations/${invitation}/verify`,
                method: 'GET'
            });
            // showMessage(response.data.message, {variant: 'success'});
            // await connectSafe(response.data.club.safeAddress);
            console.log('called connect safe')
            return response.data;
        } catch (e) {
            const {message} = e.response.data;
            console.log(e.message, 'error from verify invitation');
            showMessage(message, {variant: 'error'});
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
        }
    },
    extraReducers: builder => {
        builder.addCase(createInvitation.pending, (state) => {
            state.invitationLoading = true;
            state.invitationError = null;
        }).addCase(createInvitation.fulfilled, (state, action) => {
            state.invitationError = null;
            state.invitationLoading = false;
            state.invitation = action.payload.data;
        }).addCase(createInvitation.rejected, (state, action) => {
            state.invitationLoading = false;
            state.invitationError = action.payload;
        }).addCase(verifyInvitation.pending, (state) => {
            state.invitationError = null;
            state.invitationLoading = true;
        }).addCase(verifyInvitation.fulfilled, (state, action) => {
            state.invitationLoading = false;
            state.invitationError = null;
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
