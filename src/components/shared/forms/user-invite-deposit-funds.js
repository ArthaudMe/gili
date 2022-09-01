import {Button, Card, CardContent, Divider, Grid, Stack, Typography} from "@mui/material";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import React from "react";
import {useDispatch} from "react-redux";

const UserInviteDepositFunds = () => {

    const dispatch = useDispatch();

    return (
        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2}} variant="h6" align="center">
                Geometry club hub
            </Typography>
            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
            <CardContent sx={{paddingX: 5}}>
                <Stack direction="column" spacing={3} sx={{mb: 2}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club token
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            app.gili.club/0x42fhdgd534
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club token minted
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            0x42fhdgd534
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club max. token supply
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            etherscan.com/02349294
                        </Typography>
                    </Stack>
                </Stack>
                <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Button
                            onClick={() => dispatch(CREATE_CLUB_ACTION_CREATORS.next())}
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: '#6052FF',
                                '&:hover': {backgroundColor: '#6052FF'}
                            }}
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

export default UserInviteDepositFunds;
