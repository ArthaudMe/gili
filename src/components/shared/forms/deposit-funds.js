import {Button, Card, CardContent, Grid, LinearProgress, Stack, TextField, Typography} from "@mui/material";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UTILS} from "../../../utils/utils";
import {CLUBS_ACTION_CREATORS, selectClubs} from "../../../redux/features/clubs/clubs-slice";
import {useSafeFactory} from "../../../hooks/use-safe-factory";
import {useSnackbar} from "notistack";
import {usePrepareSendTransaction, useSendTransaction} from "wagmi";
import {useConnectWallet} from "@web3-onboard/react";
import web3 from "web3";

const DepositFunds = () => {

    const dispatch = useDispatch();
    const {safe, setLoading, loading: safeLoading} = useSafeFactory();
    const {club, loading} = useSelector(selectClubs);
    const {enqueueSnackbar} = useSnackbar();
    const [{wallet}] = useConnectWallet();
    const [amount, setAmount] = useState('0');
    const handleAmountChange = event => {
        if (event.target.value === "") {
            setAmount('0');
            return;
        }
        setAmount(event.target.value);
    }


    const {config} = usePrepareSendTransaction({
        request: {
            to: safe.getAddress(),
            value: web3.utils.toWei(`${amount}`).toString()
        }
    });

    const {sendTransactionAsync} = useSendTransaction(config);

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleValidatePost = async () => {
        try {
            const txResult = await sendTransactionAsync();

            if (txResult) {
                dispatch(CLUBS_ACTION_CREATORS.joinClub({
                    data: {amount, address: wallet.accounts[0].address},
                    club: club?._id,
                    callback: () => dispatch(CREATE_CLUB_ACTION_CREATORS.next()),
                    showMessage
                }));
            }

        } catch (e) {
            console.log(e.message);
            setLoading(false);
            enqueueSnackbar(e.message, {variant: 'error'});
        }
    }

    return (
        <Card
            sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
            {loading && <LinearProgress variant="query" color="secondary"/>}
            {safeLoading && <LinearProgress variant="query" color="primary"/>}
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2, mb: 4}} variant="h6" align="center">
                Deposit funds to join club
            </Typography>
            <CardContent sx={{paddingX: 5}}>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            Deposit funds
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <TextField
                                onChange={handleAmountChange}
                                required={true}
                                variant="outlined"
                                placeholder="Enter amount in ether"
                                label={`Amount in ${UTILS.selectCurrency(club.currency)}`}
                                name="deposit"
                                value={amount}
                                color="secondary"
                                size="small"
                                error={Boolean(!amount)}
                                helperText=''
                            />
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                {club && UTILS.selectCurrency(club.currency)}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            Amount raised
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                                {club?.treasury}
                            </Typography>
                            <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                                {club && UTILS.selectCurrency(club?.currency)}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            Club max. token supply
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                                {club?.goal}
                            </Typography>
                            <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                                {club && UTILS.selectCurrency(club?.currency)}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            onClick={handleValidatePost}
                            sx={{
                                textTransform: 'none',
                                py: 1.2
                            }}
                            color="secondary"
                            fullWidth={true}
                            type="submit"
                            variant="contained"
                            disableElevation={true}
                            size="small">
                            Validate deposit
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default DepositFunds;
