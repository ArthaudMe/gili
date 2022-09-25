import {Box, Button, Card, CardContent, Divider, Grid, LinearProgress, Typography} from "@mui/material";
import personalWalletIcon from "./../../../assets/images/img.png";
import newWalletIcon from "./../../../assets/images/new-wallet.png";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {useConnectWallet} from "@web3-onboard/react";
import {useSafeFactory} from "../../../hooks/use-safe-factory";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import ConnectSafeSdkDialog from "../dialogs/connect-safe-sdk-dialog";

const SafeForm = () => {

    const [{connecting, wallet}, connect] = useConnectWallet();
    const dispatch = useDispatch();
    const {initializeFactory, loading, connectSafe} = useSafeFactory();

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSafeConnect = async () => {
        await connect();
    }

    useEffect(() => {
        const init = async () => {
            if (wallet) {
                await initializeFactory(wallet.accounts[0].address);
                dispatch(CREATE_CLUB_ACTION_CREATORS.next());
            }
        }
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet]);

    const handleConnectSafe = async safeAddress => {
        await connectSafe(safeAddress);
    }

    return (
        <Box>
            <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
                {connecting && <LinearProgress variant="query" color="secondary"/>}
                {loading && <LinearProgress variant="query" color="primary"/>}
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

                    <Grid container={true} justifyContent="center">
                        <Grid item={true} xs={12} md={8}>
                            <Button
                                onClick={handleSafeConnect}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    textTransform: 'capitalize',
                                    padding: 2,
                                    mb: 2,
                                    color: 'white',
                                    justifyContent: 'flex-start'
                                }}
                                variant="text"
                                startIcon={<img src={personalWalletIcon} alt="" style={{width: 30, height: 30}}/>}
                                fullWidth={true}
                                size="small">
                                Connect your personal wallet
                            </Button>
                        </Grid>
                        <Grid item={true} xs={12} md={8}>
                            <Button
                                onClick={handleSafeConnect}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    textTransform: 'capitalize',
                                    padding: 2,
                                    mb: 4,
                                    color: 'white',
                                    justifyContent: 'flex-start'
                                }}
                                startIcon={<img src={newWalletIcon} alt="" style={{width: 30, height: 30}}/>}
                                fullWidth={true}
                                size="small">
                                Create a new wallet
                            </Button>
                        </Grid>
                    </Grid>

                    <Button
                        onClick={() => setDialogOpen(true)}
                        sx={{
                            textTransform: 'capitalize',
                            textDecoration: 'underline',
                            color: 'text.primary'
                        }}
                        variant="text"
                        fullWidth={true}
                        disableElevation={true}
                        size="small">
                        My club already has a SAFE, connect it
                    </Button>
                </CardContent>
            </Card>
            {dialogOpen && (
                <ConnectSafeSdkDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    handleConnect={handleConnectSafe}
                />
            )}
        </Box>
    )
}

export default SafeForm;
