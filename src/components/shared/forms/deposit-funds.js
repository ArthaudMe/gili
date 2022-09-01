import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import React from "react";
import {useDispatch} from "react-redux";

const DepositFunds = () => {

    const dispatch = useDispatch();

    const handleValidatePost = () => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.next());
    }
    return (
        <Card
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(5px)'
            }}>
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2, mb: 4}} variant="h6" align="center">
                Geometry club hub
            </Typography>
            <CardContent sx={{paddingX: 5}}>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club token
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            app.gili.club/0x42fhdgd534
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club token minted
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            0x42fhdgd534
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club max. token supply
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            etherscan.com/02349294
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            onClick={handleValidatePost}
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: '#6052FF',
                                '&:hover': {backgroundColor: '#6052FF'}
                            }}
                            fullWidth={true}
                            variant="contained"
                            disableElevation={true}
                            size="small">
                            Validate deposit
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default DepositFunds;
