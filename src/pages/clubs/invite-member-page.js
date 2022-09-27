import AuthLayout from "../../components/layout/auth-layout";
import React, {useEffect, useState} from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {CLUBS_ACTION_CREATORS, selectClubs} from "../../redux/features/clubs/clubs-slice";
import {INVITATIONS_ACTION_CREATORS, selectInvitation} from "../../redux/features/invitations/invitations-slice";
import {useConnectWallet} from "@web3-onboard/react";
import {ContentCopy} from "@mui/icons-material";
import {useParams} from "react-router";

const InviteMemberPage = () => {

    const {enqueueSnackbar} = useSnackbar();
    const [selectedRole, setSelectedRole] = useState('Member');
    const {club} = useSelector(selectClubs);
    const {clubID} = useParams();
    const [{wallet}] = useConnectWallet();
    const {invitationLoading, invitationError, invitation} = useSelector(selectInvitation);
    const dispatch = useDispatch();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleInvitationGenerate = () => {
        dispatch(INVITATIONS_ACTION_CREATORS.createInvitation({
            data: {
                role: selectedRole,
                club: clubID,
                inviter: wallet.accounts[0].address
            },
            showMessage
        }));
    }

    const handleInvitationCopy = () => {
        window.navigator.clipboard.writeText(
            `You have been invited by ${club?.name} to join their club. Follow the link https://gili.vercel.app/invitations/${invitation._id} to join the club`)
            .then(() => {
                enqueueSnackbar('Invitation link copied', {variant: 'success'});
            });
    }

    useEffect(() => {
        dispatch(CLUBS_ACTION_CREATORS.getClub({clubID}));
    }, [clubID]);
    return (
        <AuthLayout>
            <Box sx={{py: 4, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Container maxWidth="md">

                    <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
                        {invitationLoading && <LinearProgress variant="query" color="secondary"/>}
                        <Typography sx={{color: 'white', pt: 2}} variant="h6" align="center">
                            Invite your friends to join your club
                        </Typography>
                        <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
                        <CardContent sx={{paddingX: 3}}>
                            {invitationError && (
                                <Alert severity="error" sx={{mb: 2}}><AlertTitle>{invitationError}</AlertTitle></Alert>
                            )}
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
                                    They are co-owners of the club with you - they play an active role in managing the
                                    club.
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
                                            color="secondary"
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
                                    Members are investors in your club - they don’t play an active role managing the
                                    club.
                                </Typography>

                                <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item={true} xs={12} md="auto">
                                        <Button
                                            onClick={handleInvitationGenerate}
                                            sx={{
                                                textTransform: 'capitalize',
                                                py: 1.2
                                            }}
                                            color="secondary"
                                            fullWidth={true}
                                            variant="contained"
                                            disableElevation={true}
                                            size="small">
                                            Generate a link to invite members
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>

                            {invitation && (
                                <Button
                                    sx={{mb: 2, textTransform: 'none'}}
                                    fullWidth={true}
                                    onClick={handleInvitationCopy}
                                    variant="text"
                                    size="large"
                                    startIcon={<ContentCopy color="secondary"/>}>
                                    Copy Invitation URL
                                </Button>
                            )}

                            <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item={true} xs={12} md={4}>
                                    <Link to={`/clubs/${clubID}`} style={{textDecoration: 'none'}}>
                                        <Button
                                            onClick={handleInvitationGenerate}
                                            sx={{textTransform: 'capitalize'}}
                                            color="secondary"
                                            fullWidth={true}
                                            variant="contained"
                                            disableElevation={true}
                                            size="large">
                                            Portfolio
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </AuthLayout>
    )
}

export default InviteMemberPage;
