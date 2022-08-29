import {Button, Card, CardContent, Divider, Grid, LinearProgress, Typography} from "@mui/material";
import personalWalletIcon from "./../../../assets/images/img.png";
import newWalletIcon from "./../../../assets/images/new-wallet.png";
import {useDispatch} from "react-redux";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import React from "react";
import {useConnectWallet} from "@web3-onboard/react";

const SafeForm = () => {

    const dispatch = useDispatch();

    const [{connecting}, connect] = useConnectWallet();

    const handleSafeConnect = async () => {
        await connect();
    }

    const handleNextClick = async () => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.next());
    }

    return (
        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
            {connecting && <LinearProgress variant="query" color="secondary"/>}
            <Typography sx={{color: 'white', pt: 2}} variant="h6" align="center">
                Create a SAFE
            </Typography>
            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
            <CardContent sx={{paddingX: 3}}>
                <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                    It is the shared club account from which investments will be made
                </Typography>
                <Typography sx={{color: 'text.secondary', mb: 2}} variant="body2" align="center">
                    You must connect or create your personal wallet to create the club SAFE
                </Typography>

                <Button
                    sx={{
                        textTransform: 'capitalize',
                        padding: 2,
                        mb: 2,
                        color: 'white'
                    }}
                    variant="text"
                    startIcon={<img src={personalWalletIcon} alt="" style={{width: 30, height: 30}}/>}
                    fullWidth={true}
                    size="small">
                    Connect your personal wallet
                </Button>

                <Button
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        textTransform: 'capitalize',
                        padding: 2,
                        mb: 2,
                        color: 'white'
                    }}
                    startIcon={<img src={newWalletIcon} alt="" style={{width: 30, height: 30}}/>}
                    fullWidth={true}
                    size="small">
                    Create a new wallet
                </Button>

                <Grid container={true} spacing={2} sx={{mb: 2}}>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            fullWidth={true}
                            sx={{textTransform: 'capitalize'}}
                            variant="contained"
                            disableElevation={true}
                            size="small">
                            Connect wallet
                        </Button>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            onClick={handleNextClick}
                            sx={{
                                textTransform: 'capitalize'
                            }}
                            variant="contained"
                            fullWidth={true}
                            disableElevation={true}
                            size="small">
                            Next
                        </Button>
                    </Grid>
                </Grid>

                <Button
                    onClick={handleSafeConnect}
                    sx={{
                        textTransform: 'capitalize',
                        textDecoration: 'underline',
                        color: 'text.secondary'
                    }}
                    variant="text"
                    fullWidth={true}
                    disableElevation={true}
                    size="small">
                    My club already has a SAFE, connect it
                </Button>
            </CardContent>
        </Card>
    )
}

export default SafeForm;
