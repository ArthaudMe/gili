import AuthLayout from "../../components/layout/auth-layout";
import {Box, Button, Container} from "@mui/material";
import ClubInfoForm from "../../components/shared/forms/club-info-form";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../redux/features/create-club/create-club-slice";
import SafeForm from "../../components/shared/forms/safe-form";
import ConnectWallet from "../../components/shared/forms/connect-wallet";
import SelectNetwork from "../../components/shared/forms/select-network";
import CreateClubSummary from "../../components/shared/forms/create-club-summary";
import {West} from "@mui/icons-material";
import React from "react";
import CreateClubSuccess from "../../components/shared/forms/create-club-success";
import ClubHub from "../../components/shared/forms/club-hub";
import DepositFunds from "../../components/shared/forms/deposit-funds";
import InviteFriends from "../../components/shared/forms/invite-friends";

const CreateClubPage = () => {

    const {step} = useSelector(selectCreateClub);

    const dispatch = useDispatch();

    const renderForm = step => {
        switch (step) {
            case 1:
                return <ClubInfoForm/>;
            case 2:
                return <SafeForm/>;
            case 3:
                return <ConnectWallet/>;
            case 4:
                return <SelectNetwork/>;
            case 5:
                return <CreateClubSummary/>;
            case 6:
                return <CreateClubSuccess/>;
            case 7:
                return <ClubHub/>;
            case 8:
                return <DepositFunds/>;
            case 9:
                return <InviteFriends/>;
            default:
                return <ClubInfoForm/>;
        }
    }
    return (
        <AuthLayout>
            <Box sx={{minHeight: '100vh', justifyContent: 'center', alignItems: 'center', py: 4}}>
                <Container maxWidth="lg" sx={{minHeight: '100vh'}}>
                    <Box
                        sx={{
                            minHeight: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
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
                </Container>
            </Box>
        </AuthLayout>
    )
}

export default CreateClubPage;
