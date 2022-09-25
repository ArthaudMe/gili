import AuthLayout from "../../components/layout/auth-layout";
import {Box, Button, Container} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../redux/features/create-club/create-club-slice";
import {West} from "@mui/icons-material";
import React from "react";
import UserInviteDepositFunds from "../../components/shared/forms/user-invite-deposit-funds";
import UserInvitationClubHub from "../../components/shared/forms/user-invitation-club-hub";
import {useParams} from "react-router";

const ClubInvitationPage = () => {

    const {step} = useSelector(selectCreateClub);
    const {invitationID} = useParams();

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

    return (
        <AuthLayout>
            <Box sx={{display: 'relative'}}>
                <Box sx={{minHeight: '100vh', justifyContent: 'center', alignItems: 'center', py: {xs: 4, lg: 0}}}>
                    <Container maxWidth="lg">
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
