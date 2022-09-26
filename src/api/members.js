import axios from "axios";
import {CONSTANTS} from "../utils/constants";

const getMembers = async (club) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${club}/members`
    });
}

const getCurrentMember = async (club, member) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${club}/members/${member}`
    });
}

const addMember = async (club, member) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${club}/member/add`,
        data: member
    });
}

export const MEMBERS_API = {getMembers, getCurrentMember, addMember};
