import {
    Alert,
    AlertTitle,
    Button,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UTILS} from "../../../utils/utils";
import {INVITATIONS_ACTION_CREATORS, selectInvitation} from "../../../redux/features/invitations/invitations-slice";
import {useSafeFactory} from "../../../hooks/use-safe-factory";
import {CLUBS_ACTION_CREATORS} from "../../../redux/features/clubs/clubs-slice";
import {useConnectWallet} from "@web3-onboard/react";
import {useSnackbar} from "notistack";
import {useSearchParams} from "react-router-dom";
import {useLocation} from "react-router";
import {useConnect, usePrepareSendTransaction, useSendTransaction} from "wagmi";
import web3 from "web3";

const UserInviteDepositFunds = ({invitationID}) => {

    const {search} = useLocation();
    const [URLSearchParams] = useSearchParams(search);
    const safeAddress = URLSearchParams.get('safeAddress');
    const network = parseInt(URLSearchParams.get('network'));
    const club = URLSearchParams.get('club');

    const dispatch = useDispatch();
    const {invitation, invitationLoading, invitationError} = useSelector(selectInvitation);
    const {loading, connectSafe, error} = useSafeFactory();
    const [{wallet}, connect] = useConnectWallet();
    const {enqueueSnackbar} = useSnackbar();
    const wagmiConnect = useConnect();

    const [amount, setAmount] = useState('0');
    const handleAmountChange = event => {
        if (event.target.value === "") {
            setAmount('0');
            return;
        }
        setAmount(event.target.value);
    }

    useEffect(() => {
        wagmiConnect.connect({connector: wagmiConnect.connectors[0]});
    }, [wagmiConnect]);

    const {config} = usePrepareSendTransaction({
        request: {
            to: safeAddress,
            value: web3.utils.toWei(`${amount}`, 'ether').toString()
        }
    });

    const {isLoading, sendTransactionAsync} = useSendTransaction(config);

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleValidatePost = async () => {
        try {
            const txResult = await sendTransactionAsync();
            if (txResult) {
                dispatch(CLUBS_ACTION_CREATORS.joinClub({
                    data: {
                        amount,
                        address: wallet.accounts[0].address,
                        invitation: invitationID,
                    },
                    club,
                    callback: () => dispatch(INVITATIONS_ACTION_CREATORS.next()),
                    showMessage
                }));
            }
        } catch (e) {
            enqueueSnackbar(e.message, {variant: 'error'});
        }
    }

    useEffect(() => {
        const connectWallet = async () => {
            await connect();
        }
        connectWallet().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(INVITATIONS_ACTION_CREATORS.verifyInvitation(
            {invitation: invitationID})
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invitationID]);

    useEffect(() => {
        const connect = async () => {
            await connectSafe(safeAddress, network);
        }
        connect().then(() => console.log('connecting'));
    }, [connectSafe, network, safeAddress]);

    return (
        <Card
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(5px)'
            }}>
            {invitationLoading && <LinearProgress variant="query" color="secondary"/>}
            {isLoading && <LinearProgress variant="query" color="secondary"/>}
            {loading && <LinearProgress variant="query" color="secondary"/>}
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2, mb: 4}} variant="h6" align="center">
                Deposit funds to join club
            </Typography>
            <CardContent>
                {invitationError && (
                    <Alert severity="error" sx={{mb: 2}}><AlertTitle>{invitationError}</AlertTitle></Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{mb: 2}}><AlertTitle>{error}</AlertTitle></Alert>
                )}

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
                                placeholder="Amount"
                                label="Deposit"
                                value={amount}
                                color="secondary"
                                name="deposit"
                                size="small"
                            />
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                {invitation && invitation.club && invitation.club.currency && UTILS.selectCurrency(invitation?.club?.currency)}
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
                                {invitation?.club?.treasury}
                            </Typography>
                            <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                                {invitation && invitation.club && invitation.club.currency && UTILS.selectCurrency(invitation?.club?.currency)}
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
                                {invitation?.club?.goal}
                            </Typography>
                            <Typography sx={{color: 'text.primary'}} variant="body1" align="center">
                                {invitation && invitation.club && invitation.club.currency && UTILS.selectCurrency(invitation?.club?.currency)}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            onClick={handleValidatePost}
                            sx={{
                                textTransform: 'capitalize',
                                py: 1.2
                            }}
                            color="secondary"
                            type="submit"
                            fullWidth={true}
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

export default UserInviteDepositFunds;
