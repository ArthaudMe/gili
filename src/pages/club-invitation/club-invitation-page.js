import AuthLayout from "../../components/layout/auth-layout";
import {Box, Button, Container} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../redux/features/create-club/create-club-slice";
import {West} from "@mui/icons-material";
import React, {useEffect} from "react";
import UserInviteDepositFunds from "../../components/shared/forms/user-invite-deposit-funds";
import UserInvitationClubHub from "../../components/shared/forms/user-invitation-club-hub";
import {useParams} from "react-router";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useConnectWallet} from "@web3-onboard/react";

const ClubInvitationPage = () => {

    const {step} = useSelector(selectCreateClub);
    const {invitationID} = useParams();
    const [connect] = useConnectWallet();
    const {address} = useSelector(selectAuth);

    const dispatch = useDispatch();

    const renderForm = step => {
        switch (step) {
            case 1:
                return <UserInviteDepositFunds invitationID={invitationID}/>;
            case 2:
                return <UserInvitationClubHub/>;
            default:
                return <UserInviteDepositFunds/>;
        }
    }

    useEffect(() => {
        if(!address){
            dispatch(AUTH_ACTION_CREATORS.connect({connect}));
        }
    }, [address]);

    return (
        <AuthLayout>
            <Box sx={{display: 'relative'}}>
                <Box sx={{minHeight: '100vh', justifyContent: 'center', alignItems: 'center', py: {xs: 4, lg: 0}}}>
                    <Container sx={{minHeight: '100vh'}}>
                        <Box
                            sx={{
                                minHeight: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Box
                                sx={{minWidth: '40%', maxWidth: {xs: '100%', lg: '70%'}}}>
                                {renderForm(step)}
                                {step > 1 && (
                                    <Box sx={{mt: 4}}>
                                        <Button
                                            onClick={() => dispatch(CREATE_CLUB_ACTION_CREATORS.previous())}
                                            startIcon={<West/>}
                                            variant="text" sx={{color: 'text.secondary', textTransform: 'capitalize'}}>
                                            Back
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </AuthLayout>
    )
}

export default ClubInvitationPage;
