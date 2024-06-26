import {Button, Card, CardContent, Grid, LinearProgress, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../../redux/features/create-club/create-club-slice";
import React, {useEffect} from "react";
import {UTILS} from "../../../utils/utils";
import {useSafeFactory} from "../../../hooks/use-safe-factory";
import {CLUBS_ACTION_CREATORS} from "../../../redux/features/clubs/clubs-slice";
import {useSnackbar} from "notistack";
import {useNetwork} from "wagmi";
import {useConnectWallet} from "@web3-onboard/react";

const CreateClubSummary = () => {

    const {club, gas} = useSelector(selectCreateClub);
    const {chain} = useNetwork();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const [{wallet}] = useConnectWallet();
    const {safeAddress, deploySafe, connected, loading, setLoading} = useSafeFactory();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleSignTransaction = async () => {
        try {
            const safe = await deploySafe();
            if (safe) {
                dispatch(CLUBS_ACTION_CREATORS.createClub({
                    data: {
                        ...club,
                        createdBy: wallet.accounts[0].address,
                        network: chain?.id,
                        safeAddress
                    },
                    callback: () => dispatch(CREATE_CLUB_ACTION_CREATORS.next()),
                    showMessage
                }));
            }
        } catch (e) {
            enqueueSnackbar(e.message, {variant: 'error'});
            setLoading(false);
            console.log(e.message, 'error');
        }
    }

    useEffect(() => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.getGas());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
            {loading && <LinearProgress variant="query" color="secondary"/>}
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2}} variant="h6" align="center">
                Finalise the creation of your club
            </Typography>
            <CardContent>
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
                            {`${safeAddress?.slice(0, 5)}...${safeAddress?.slice(safeAddress?.length - 5)}`}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            Currency
                        </Typography>
                        <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                            {club?.currency}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{color: 'text.primary'}} variant="body2" align="center">
                            Network
                        </Typography>
                        <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                            {chain?.network}
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
                                color="secondary"
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
