import {Button, Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectClubs} from "../../../redux/features/clubs/clubs-slice";
import {UTILS} from "../../../utils/utils";

const UserInvitationClubHub = () => {

    const {club, member} = useSelector(selectClubs);

    console.log(member, 'get current member');

    return (
        <Card
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(5px)'
            }}>
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2}} variant="h6" align="center">
                {club?.name} club hub
            </Typography>
            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
            <CardContent sx={{paddingX: 5}}>

                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            Your stake
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            {member?.stake} {club && UTILS.selectCurrency(club?.currency)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            Your ownership
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            {Number.parseFloat(`${member?.ownership * 100}`).toFixed(2)}%
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    sx={{mb: 2}}
                    container={true}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            Club treasury
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            {`${club?.treasury} ${club && UTILS.selectCurrency(club?.currency)}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            Club max. token supply
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            {`${club?.goal} ${club && UTILS.selectCurrency(club?.currency)}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            Club token minted
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            {club?.minted}%
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Link to={`/clubs/${club?._id}`} style={{textDecoration: 'none'}}>
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
