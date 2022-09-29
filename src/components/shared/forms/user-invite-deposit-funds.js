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
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as yup from "yup";
import {UTILS} from "../../../utils/utils";
import {INVITATIONS_ACTION_CREATORS, selectInvitation} from "../../../redux/features/invitations/invitations-slice";
import {useSafeFactory} from "../../../hooks/use-safe-factory";
import {CLUBS_ACTION_CREATORS} from "../../../redux/features/clubs/clubs-slice";
import {useConnectWallet} from "@web3-onboard/react";
import {useSnackbar} from "notistack";
import {useSearchParams} from "react-router-dom";
import {useLocation} from "react-router";
import {usePrepareSendTransaction, useSendTransaction} from "wagmi";
import web3 from "web3";

const UserInviteDepositFunds = ({invitationID}) => {

    const {search} = useLocation();
    const [URLSearchParams] = useSearchParams(search);
    const safeAddress = URLSearchParams.get('safeAddress');
    const network = parseInt(URLSearchParams.get('network'));

    const dispatch = useDispatch();
    const {invitation, invitationLoading, invitationError} = useSelector(selectInvitation);
    const {loading, connectSafe, error} = useSafeFactory();
    const [{wallet}, connect] = useConnectWallet();
    const {enqueueSnackbar} = useSnackbar();

    const formik = useFormik({
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object().shape({
            deposit: yup.number().required('Deposit required')
        }),
        onSubmit: async () => {
            await handleValidatePost();
        },
        initialValues: {
            deposit: '0'
        }
    });

    const {config} = usePrepareSendTransaction({
        request: {
            to: safeAddress,
            value: formik.values.deposit
        }
    });

    const {sendTransaction, isSuccess, isLoading} = useSendTransaction(config);


    const handleValidatePost = async () => {
        try {
            sendTransaction();
        } catch (e) {
            enqueueSnackbar(e.message, {variant: 'error'});
        }
    }

    useEffect(() => {
        const connectWallet = async () => {
            await connect();
        }
        connectWallet().then();
    }, []);

    useEffect(() => {
        dispatch(INVITATIONS_ACTION_CREATORS.verifyInvitation(
            {invitation: invitationID})
        );
    }, [invitationID]);

    useEffect(() => {
        const connect = async () => {
            await connectSafe(safeAddress, network);
        }
        connect().then(() => console.log('connecting'));
    }, []);

    useEffect(() => {
        if(isSuccess){
            dispatch(CLUBS_ACTION_CREATORS.joinClub({
                data: {amount: web3.utils.fromWei(formik.values.deposit, 'ether'), address: wallet.accounts[0].address},
                invitation: invitationID,
                callback: dispatch(CREATE_CLUB_ACTION_CREATORS.next())
            }));
        }
    }, [isSuccess]);

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

                <form onSubmit={formik.handleSubmit}>
                    <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item={true} xs={12} md="auto">
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                Deposit funds
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <TextField
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required={true}
                                    variant="outlined"
                                    placeholder="Amount"
                                    label="Deposit"
                                    value={formik.values.deposit}
                                    color="secondary"
                                    name="deposit"
                                    size="small"
                                    error={formik.touched.deposit && formik.errors.deposit}
                                    helperText={formik.touched.deposit && formik.errors.deposit}
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
                </form>
            </CardContent>
        </Card>
    )
}

export default UserInviteDepositFunds;
