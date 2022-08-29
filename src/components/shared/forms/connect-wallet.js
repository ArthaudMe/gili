import {Box, Button, Card, CardContent, Grid, LinearProgress, Typography} from "@mui/material";
import React, {useState} from "react";
import metamask from "./../../../assets/images/metamask.png";
import walletConnectIcon from "./../../../assets/images/wallet-connect.png";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import {useDispatch} from "react-redux";

import {useConnectWallet} from "@web3-onboard/react";


const ConnectWallet = () => {
    const [{wallet, connecting}, connect] = useConnectWallet();

    const [selectedWallet, setSelectedWallet] = useState(null);

    const dispatch = useDispatch();

    const handleNextClick = () => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.saveWallet(wallet.accounts[0]));
        dispatch(CREATE_CLUB_ACTION_CREATORS.next());
    }

    const handleWalletConnect = async () => {
        await connect();
    }

    console.log(wallet)

    return (
        <Card elevation={0} sx={{backgroundColor: 'white'}}>
            {connecting && <LinearProgress variant="query" color="secondary"/> }
            <CardContent>
                <Typography variant="h5" sx={{color: '#000000', fontWeight: 100, mb: 2}}>
                    Choose your Wallet
                </Typography>
                <Grid container={true} spacing={3} sx={{mb: 2}}>
                    <Grid item={true} xs={12} md={6}>
                        <Box
                            sx={{
                                padding: 2,
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: selectedWallet === 'wallet-connect' ? '#E6F5D0' : 'rgba(230, 245, 208, 0.4)',
                                borderRadius: 0.5
                            }} onClick={() => setSelectedWallet('wallet-connect')}>
                            <img src={walletConnectIcon} alt="Wallet Connect" style={{width: 30, height: 30}}/>
                            <Typography align="center" variant="body2" sx={{color: '#000000'}}>
                                Wallet Connect
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        <Box
                            sx={{
                                padding: 2,
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: selectedWallet === 'metamask' ? '#E6F5D0' : 'rgba(230, 245, 208, 0.4)',
                                borderRadius: 0.5,
                            }} onClick={() => setSelectedWallet('metamask')}>
                            <img src={metamask} alt="Metamask" style={{width: 30, height: 30}}/>
                            <Typography align="center" variant="body2" sx={{color: '#000000'}}>
                                Metamask
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container={true} justifyContent="flex-end" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Button
                            onClick={handleWalletConnect}
                            fullWidth={true}
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: '#6052FF',
                                '&:hover': {backgroundColor: '#6052FF'}
                            }}
                            variant="contained"
                            disableElevation={true}
                            size="small">
                            Connect
                        </Button>
                    </Grid>

                    {wallet && (
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                fullWidth={true}
                                onClick={handleNextClick}
                                sx={{
                                    textTransform: 'capitalize',
                                    backgroundColor: '#6052FF',
                                    '&:hover': {backgroundColor: '#6052FF'}
                                }}
                                variant="contained"
                                disableElevation={true}
                                size="small">
                                Next
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ConnectWallet;
