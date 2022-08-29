import {Box, Typography} from "@mui/material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../redux/features/create-club/create-club-slice";

const Network = ({network}) => {

    const {selectedNetwork} = useSelector(selectCreateClub);
    const dispatch = useDispatch();

    return (
        <Box
            sx={{
                flex: 1,
                padding: 2,
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: selectedNetwork.id === network.id ? '#E6F5D0' : 'rgba(230, 245, 208, 0.4)',
                borderRadius: 0.5
            }} onClick={() => dispatch(CREATE_CLUB_ACTION_CREATORS.saveNetwork(network))}>
            <img src={network.icon} alt="Network Selected" style={{width: 30, height: 30}}/>
            <Typography align="center" variant="body2" sx={{color: '#000000'}}>{network.label}</Typography>
        </Box>
    )
}

export default Network;
