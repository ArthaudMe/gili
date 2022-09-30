import axios from "axios";
import {CONSTANTS} from "../utils/constants";

const getClubs = (address) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/members/${address}/clubs`
    })
}

const getClub = (id) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${id}`
    });
}

const getClubBySafe = (address) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${address}/safe`
    });
}

const updateClub = (data, club) => {
    return axios({
        method: 'PUT',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${club}`,
        data
    });
}

const createClub = (data) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs`,
        data
    })
}

const joinClub = (club, data) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${club}/join`,
        data
    })
}

const depositFunds = (address, club, amount) => {
    return axios({
        method: 'PUT',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${club}/funds/deposit`,
        data: {amount, club, address}
    })
}

const addMember = async (club, member) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${club}/members`,
        data: member
    });
}

export const CLUBS_API = {getClubs, createClub, updateClub, getClub, joinClub, getClubBySafe, depositFunds, addMember};
