import {Button, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {UTILS} from "../../../utils/utils";
import {selectClubs} from "../../../redux/features/clubs/clubs-slice";

const ClubHub = () => {

    const dispatch = useDispatch();
    const {club} = useSelector(selectClubs);

    const handleFundsDeposit = async () => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.next());
    }

    return (
        <Card
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(5px)'
            }}>
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2, mb: 4}} variant="h6" align="center">
                {club.name} club hub
            </Typography>
            <CardContent sx={{paddingX: 5}}>
                <Grid sx={{mb: 3}} container={true} justifyContent="space-between" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            Club token
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            {club?.token}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid sx={{mb: 3}} container={true} justifyContent="space-between" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            Club token minted
                        </Typography>
                    </Grid>

                    <Grid item={true} xs={12} md="auto">
                        <Stack direction="row" spacing={0}>
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                {club?.minted}
                            </Typography>
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                %
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 3}} container={true} justifyContent="space-between" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            Club max. token supply
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Stack direction="row" spacing={1}>
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                {club?.goal}
                            </Typography>
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                {UTILS.selectCurrency(club.currency)}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>

                <Grid sx={{mb: 3}} container={true} justifyContent="space-between" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            Amount raised
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Stack direction="row" spacing={1}>
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                {club?.treasury}
                            </Typography>
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                {UTILS.selectCurrency(club.currency)}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container={true} justifyContent="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Button
                            onClick={handleFundsDeposit}
                            sx={{
                                textTransform: 'none',
                                py: 1.2
                            }}
                            color="secondary"
                            fullWidth={true}
                            variant="contained"
                            disableElevation={true}
                            size="small">
                            Deposit funds to join the club
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ClubHub;
