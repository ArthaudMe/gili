import {Button, Card, CardContent, Divider, Grid, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../../redux/features/create-club/create-club-slice";
import React, {useEffect} from "react";
import {useSafeAppsSDK} from "@gnosis.pm/safe-apps-react-sdk";
import {useWallets} from "@web3-onboard/react";
import {CLUBS_ACTION_CREATORS} from "../../../redux/features/clubs/clubs-slice";
import {UTILS} from "../../../utils/utils";

const CreateClubSummary = () => {

    const {club, gas} = useSelector(selectCreateClub);
    const wallets = useWallets();
    const dispatch = useDispatch();
    const {sdk, connected, safe} = useSafeAppsSDK();



    useEffect(() => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.getGas());
    }, []);

    const handleSignTransaction = async () => {
        try {
            const txHash = await sdk.txs.send({
                txs: [{to: safe.safeAddress, value: '0', data: wallets[0].address}],
                params: {safeTxGas: gas}
            });
            // CREATE CLUB IN DATABASE
            dispatch(CLUBS_ACTION_CREATORS.createClub({
                data: {...club, wallet: {address: wallets[0].address}},
                token: '',
                handleNext: dispatch(CREATE_CLUB_ACTION_CREATORS.next())}));
            console.log(txHash);
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2}} variant="h6" align="center">
                Finalise the creation of your club
            </Typography>
            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
            <CardContent sx={{paddingX: 5}}>
                <Stack direction="column" spacing={3} sx={{mb: 2}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            Club name
                        </Typography>
                        <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                            {club.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            Club Token
                        </Typography>
                        <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                            {club.token}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            Fundraising goal
                        </Typography>
                        <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                            {`${club.goal} ${UTILS.selectCurrency(club.currency)}`}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            Fundraising duration
                        </Typography>
                        <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                            {`${club.duration.amount} ${club.duration.unit}${club.duration.amount > 1 ? 's' : ''}`}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            Maximum number of members
                        </Typography>
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            {club.maximumMemberCount}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            SAFE address
                        </Typography>
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            {`${safe.safeAddress.slice(0, 5)}...${safe.safeAddress.slice(safe.safeAddress.length - 5)}`}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            Network
                        </Typography>
                        <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                            {club?.currency}
                        </Typography>
                    </Stack>
                </Stack>
                <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            gas cost :{gas && `${gas.maxPrice} ${gas.unit}`}
                        </Typography>
                    </Grid>
                    {connected && (
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                onClick={handleSignTransaction}
                                sx={{
                                    textTransform: 'capitalize',
                                    py: 1.2
                                }}
                                fullWidth={true}
                                variant="contained"
                                disableElevation={true}
                                size="small">
                                Sign the transaction
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CreateClubSummary;
