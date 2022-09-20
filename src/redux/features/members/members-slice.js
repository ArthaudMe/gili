import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {MEMBERS_API} from "../../../api/members";
import {LinearProgress} from "@mui/material";
import React from "react";


const getMembers = createAsyncThunk('members/getMembers', async ({club}, thunkAPI) => {
    try {
        const response = await MEMBERS_API.getMembers(club);
        return response.data;
    } catch (e) {
       const {message} = e.response.data;
       return thunkAPI.rejectWithValue(message);
    }
});


const getCurrentMember = createAsyncThunk(
    'members/getCurrentMember',
    async ({club, member}, thunkAPI) => {
    try {
        const response = await MEMBERS_API.getCurrentMember(club, member);
        return response.data;
    } catch (e) {
        const {message} = e.response.data;
        return thunkAPI.rejectWithValue(message);
    }
});


const membersSlice = createSlice({
    name: 'members',
    initialState: {
        members: [],
        membersLoading: false,
        memberError: null,
        member: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getMembers.pending, (state) => {
            state.membersLoading = true;
            state.memberError = null;
        }).addCase(getMembers.fulfilled, (state, action) => {
            state.membersLoading = false;
            state.members = action.payload.data;
        }).addCase(getMembers.rejected, (state, action) => {
            state.membersLoading = false;
            state.memberError = action.payload;
        }).addCase(getCurrentMember.pending, (state) => {
            state.membersLoading = true;
            state.memberError = null;
        }).addCase(getCurrentMember.fulfilled, (state, action) => {
            state.membersLoading = false;
            state.member = action.payload.data;
            state.memberError = null;
        }).addCase(getCurrentMember.rejected, (state, action) => {
            state.memberLoading = false;
            state.memberError = action.payload;
        })
    }
});

export const selectMembers = state => state.members;
export const MEMBERS_ACTION_CREATORS = {getMembers, getCurrentMember};
export default membersSlice.reducer;
