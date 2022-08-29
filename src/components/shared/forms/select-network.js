import {Box, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import React from "react";
import ethereum from "./../../../assets/images/ethereum.png";
import polygon from "./../../../assets/images/polygon.png";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../../redux/features/create-club/create-club-slice";
import {useDispatch, useSelector} from "react-redux";
import Network from "../network";
import {useSetChain} from "@web3-onboard/react";

const SelectNetwork = () => {
    const dispatch = useDispatch();
    const {selectedNetwork} = useSelector(selectCreateClub);
    const [{}, setChain] = useSetChain();


    const handleNetworkSelected = async () => {
        if (selectedNetwork) {
            const success = await setChain({chainId: selectedNetwork.chainID});
            if (success) {
                dispatch(CREATE_CLUB_ACTION_CREATORS.saveNetwork(selectedNetwork));
                dispatch(CREATE_CLUB_ACTION_CREATORS.next());
            }
        }
    }

    const networks = [
        {
            id: '0x1',
            label: 'Ethereum',
            chainID: 1,
            token: 'ETH',
            icon: ethereum
        },
        {
            id: '0x89',
            label: 'Polygon',
            chainID: 137,
            token: 'MATIC',
            icon: polygon
        }
    ]

    return (
        <Box>
            <Card elevation={0} sx={{mb: 3, backgroundColor: 'white'}}>
                <CardContent>
                    <Typography variant="h5" sx={{color: '#000000', fontWeight: 100, mb: 2}}>
                        Choose your Network
                    </Typography>
                    <Grid container={true} spacing={3} sx={{mb: 2}}>
                        {networks.map(network => {
                            return (
                                <Grid key={network.id} item={true} xs={12} md={6}>
                                    <Network network={network}/>
                                </Grid>
                            )
                        })}
                    </Grid>

                    <Grid container={true} justifyContent="flex-end">
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                fullWidth={true}
                                onClick={handleNetworkSelected}
                                sx={{
                                    textTransform: 'capitalize',
                                    backgroundColor: '#6052FF',
                                    '&:hover': {backgroundColor: '#6052FF'}
                                }}
                                disabled={!selectedNetwork}
                                variant="contained"
                                disableElevation={true}
                                size="small">
                                Select
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Typography variant="body2" sx={{color: 'white'}}>
                We recommend using Polygon to save on gas
            </Typography>
        </Box>
    )
}

export default SelectNetwork;
