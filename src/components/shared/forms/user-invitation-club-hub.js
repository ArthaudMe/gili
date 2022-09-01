import {Button, Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const UserInvitationClubHub = () => {

    const dispatch = useDispatch();

    return (
        <Card
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(5px)'
            }}>
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2}} variant="h6" align="center">
                Geometry club hub
            </Typography>
            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
            <CardContent sx={{paddingX: 5}}>

                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Your stake
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            2 GEO
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Your ownership
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            66%
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>

                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club treasury
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            0.3 eth
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
                            100 eth
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
                            0.3%
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Link to="/portfolio" style={{textDecoration: 'none'}}>
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
                                Portfolio
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default UserInvitationClubHub;
