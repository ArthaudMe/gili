import axios from "axios";
import {CONSTANTS} from "../utils/constants";

const getClubs = (token, query) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs?${query}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getClub = (token, id) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const updateClub = (token, data, id) => {
    return axios({
        method: 'PUT',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data
    })
}

const createClub = (token, data) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.BASE_SERVER_URL}/user/clubs`,
        headers: {
            Authorization: `Bearer ${token}`
        },
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

export const CLUBS_API = {getClubs, createClub, updateClub, getClub, joinClub};
