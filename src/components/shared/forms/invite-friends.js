import {Box, Button, Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import {useSnackbar} from "notistack";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectClubs} from "../../../redux/features/clubs/clubs-slice";

const InviteFriends = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [selectedRole, setSelectedRole] = useState('member');
    const {club: {name, _id}} = useSelector(selectClubs);

    const handleInvitationGenerate = () => {
        window
            .navigator
            .clipboard
            .writeText(
                `You have been invited by ${name} to join their club. Follow the link https://gili.vercel.app/invitations/clubs/${_id}/${selectedRole} to join the club`)
            .then(() => {
                enqueueSnackbar('Invitation link copied', {variant: 'success'});
            })
    }

    return (
        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
            <Typography sx={{color: 'white', pt: 2}} variant="h6" align="center">
                Invite your friends to join your club
            </Typography>
            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
            <CardContent sx={{paddingX: 3}}>
                <Box
                    onClick={() => setSelectedRole('admin')}
                    sx={{
                        cursor: 'pointer',
                        padding: 4,
                        borderRadius: 1,
                        backgroundColor: selectedRole === 'admin' ? 'rgba(255, 255, 255, 0.1)' : false
                    }}>
                    <Typography sx={{color: 'text.primary', fontWeight: 'bold', mb: 1}} variant="body1">
                        Admin
                    </Typography>
                    <Typography sx={{color: 'text.secondary', mb: 2}} variant="body2">
                        They are co-owners of the club with you - they play an active role in managing the club.
                        Together, you can set up the governance rules of your club.
                    </Typography>

                    <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                onClick={handleInvitationGenerate}
                                sx={{
                                    textTransform: 'capitalize',
                                    py: 1.2
                                }}
                                fullWidth={true}
                                variant="contained"
                                disableElevation={true}
                                size="small">
                                Generate a link to invite admins
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    onClick={() => setSelectedRole('member')}
                    sx={{
                        cursor: 'pointer',
                        padding: 4,
                        borderRadius: 1,
                        mb: 4,
                        backgroundColor: selectedRole === 'member' ? 'rgba(255, 255, 255, 0.1)' : false
                    }}>
                    <Typography sx={{color: 'text.primary', fontWeight: 'bold', mb: 1}} variant="body1">
                        Members
                    </Typography>
                    <Typography sx={{color: 'text.secondary', mb: 2}} variant="body2">
                        Members are investors in your club - they don’t play an active role managing the club.
                    </Typography>

                    <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                onClick={handleInvitationGenerate}
                                sx={{
                                    textTransform: 'capitalize',
                                    py: 1.2
                                }}
                                fullWidth={true}
                                variant="contained"
                                disableElevation={true}
                                size="small">
                                Generate a link to invite members
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Link to={`/clubs/${_id}`} style={{textDecoration: 'none'}}>
                            <Button
                                onClick={handleInvitationGenerate}
                                sx={{
                                    textTransform: 'capitalize',
                                    py: 1.2
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

export default InviteFriends;
