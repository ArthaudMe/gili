import {Button, Card, CardContent, Divider, Grid, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../../redux/features/create-club/create-club-slice";
import React, {useEffect} from "react";

const CreateClubSummary = () => {

    const {club, selectedNetwork, wallet, gas} = useSelector(selectCreateClub);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.getGas());
    }, []);

    return (
        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2}} variant="h6" align="center">
                Finalise the creation of your club
            </Typography>
            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
            <CardContent sx={{paddingX: 5}}>
                <Stack direction="column" spacing={3} sx={{mb: 2}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club name
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            {club.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club Token
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            {club.token}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Fundraising goal
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            {`${club.goal} ${selectedNetwork?.label}`}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Fundraising duration
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            {`${club.durationAmount} ${club.durationUnit}${club.durationAmount > 1 ? 's': ''}`}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Maximum number of members
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            {club.maximumMemberCount}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            SAFE address
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            {`${wallet?.address?.slice(0, 5)}...${wallet?.address?.slice(wallet?.address?.length - 5)}`}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Network
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            {selectedNetwork?.label}
                        </Typography>
                    </Stack>
                </Stack>
                <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            gas cost :{gas && `${gas.maxPrice} ${gas.unit}`}
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Button
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: '#6052FF',
                                '&:hover': {backgroundColor: '#6052FF'}
                            }}
                            fullWidth={true}
                            variant="contained"
                            disableElevation={true}
                            size="small">
                            Sign the transaction
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CreateClubSummary;
