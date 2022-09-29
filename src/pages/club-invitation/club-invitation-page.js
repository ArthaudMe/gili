import AuthLayout from "../../components/layout/auth-layout";
import {Box, Container} from "@mui/material";
import {useSelector} from "react-redux";
import React from "react";
import UserInviteDepositFunds from "../../components/shared/forms/user-invite-deposit-funds";
import UserInvitationClubHub from "../../components/shared/forms/user-invitation-club-hub";
import {useParams} from "react-router";
import {selectInvitation} from "../../redux/features/invitations/invitations-slice";

const ClubInvitationPage = () => {

    const {step} = useSelector(selectInvitation);
    const {invitationID} = useParams();

    const renderForm = step => {
        switch (step) {
            case 1:
                return <UserInviteDepositFunds invitationID={invitationID}/>;
            case 2:
                return <UserInvitationClubHub/>;
            default:
                return <UserInviteDepositFunds invitationID={invitationID}/>;
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
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </AuthLayout>
    )
}

export default ClubInvitationPage;
