import AuthLayout from "../../components/layout/auth-layout";
import React, {useCallback, useState} from "react";
import {
    Alert, AlertTitle,
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
import {selectClubs} from "../../redux/features/clubs/clubs-slice";
import {INVITATIONS_ACTION_CREATORS, selectInvitation} from "../../redux/features/invitations/invitations-slice";
import {useConnectWallet} from "@web3-onboard/react";
import {ContentCopy} from "@mui/icons-material";
import {useParams} from "react-router";

const InviteMemberPage = () => {

    const {enqueueSnackbar} = useSnackbar();
    const [selectedRole, setSelectedRole] = useState('member');
    const {club} = useSelector(selectClubs);
    const {clubID} = useParams();
    const [{wallet}] = useConnectWallet();
    const {invitationLoading, invitationError, invitation} = useSelector(selectInvitation);
    const dispatch = useDispatch();


    const handleInvitationGenerate = () => {
        dispatch(INVITATIONS_ACTION_CREATORS.createInvitation({
            data: {
                role: selectedRole,
                club: clubID,
                inviter: wallet.accounts[0].address
            }
        }));
    }

    const handleInvitationCopy = useCallback(async () => {
        window.navigator.clipboard.writeText(
            `You have been invited by ${club?.name} to join their club. Follow the link https://gili.vercel.app/invitations/${invitation?._id} to join the club`)
            .then(() => {
                enqueueSnackbar('Invitation link copied', {variant: 'success'});
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                                    sx={{mb: 2}}
                                    onClick={handleInvitationCopy}
                                    variant="text"
                                    startIcon={<ContentCopy color="secondary"/>}>
                                    Copy Invitation URL
                                </Button>
                            )}

                            <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item={true} xs={12} md="auto">
                                    <Link to={`/clubs/${club?._id}`} style={{textDecoration: 'none'}}>
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
                </Container>
            </Box>
        </AuthLayout>
    )
}

export default InviteMemberPage;
