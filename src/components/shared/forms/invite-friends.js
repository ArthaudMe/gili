import {Box, Button, Card, CardContent, Grid, LinearProgress, Typography} from "@mui/material";
import React, {useState} from "react";
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectClubs} from "../../../redux/features/clubs/clubs-slice";
import {INVITATIONS_ACTION_CREATORS, selectInvitation} from "../../../redux/features/invitations/invitations-slice";
import {ContentCopy} from "@mui/icons-material";
import {useNetwork} from "wagmi";
import {useSafeFactory} from "../../../hooks/use-safe-factory";
import {useConnectWallet} from "@web3-onboard/react";

const InviteFriends = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {chain} = useNetwork();
    const [selectedRole, setSelectedRole] = useState('Member');
    const {club} = useSelector(selectClubs);
    const {invitationLoading, invitation} = useSelector(selectInvitation);
    const dispatch = useDispatch();
    const {safe} = useSafeFactory();
    const [{wallet}] = useConnectWallet();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleInvitationGenerate = () => {
        dispatch(INVITATIONS_ACTION_CREATORS.createInvitation({
            data: {
                role: selectedRole,
                club: club?._id,
                inviter: wallet.accounts[0].address
            },
            showMessage
        }));
    }

    const handleInvitationCopy = async () => {
        window.navigator.clipboard.writeText(
            `You have been invited by ${club?.name} to join their club. Follow the link https://gili.vercel.app/invitations/${invitation._id}?safeAddress=${safe.getAddress()}&network=${chain.id} to join the club`)
            .then(() => {
                enqueueSnackbar('Invitation link copied', {variant: 'success'});
            });
    };

    return (
        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
            {invitationLoading && <LinearProgress variant="query" color="secondary"/>}
            <Typography sx={{color: 'white', py: 2}} variant="h6" align="center">
                Invite your friends to join your club
            </Typography>
            <CardContent sx={{paddingX: 3}}>
                <Box
                    onClick={() => setSelectedRole('Admin')}
                    sx={{
                        cursor: 'pointer',
                        padding: 4,
                        borderRadius: 1,
                        backgroundColor: selectedRole === 'Admin' ? 'rgba(255, 255, 255, 0.1)' : false
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
                                disabled={invitationLoading}
                                fullWidth={true}
                                color="secondary"
                                variant="contained"
                                disableElevation={true}
                                size="small">
                                Generate a link to invite admins
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box
                    onClick={() => setSelectedRole('Member')}
                    sx={{
                        cursor: 'pointer',
                        padding: 4,
                        borderRadius: 1,
                        mb: 4,
                        backgroundColor: selectedRole === 'Member' ? 'rgba(255, 255, 255, 0.1)' : false
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
                                disabled={invitationLoading}
                                fullWidth={true}
                                variant="contained"
                                color="secondary"
                                disableElevation={true}
                                size="small">
                                Generate a link to invite members
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                {invitation && (
                    <Button
                        fullWidth={true}
                        sx={{mb: 2, textTransform: 'none'}}
                        onClick={handleInvitationCopy}
                        variant="text"
                        color="primary"
                        startIcon={<ContentCopy color="primary"/>}>
                        Copy Invitation URL
                    </Button>
                )}
                <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md={4}>
                        <Link to={`/clubs/${club?._id}`} style={{textDecoration: 'none'}}>
                            <Button
                                sx={{
                                    textTransform: 'capitalize',
                                    py: 1.2
                                }}
                                fullWidth={true}
                                color="secondary"
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
