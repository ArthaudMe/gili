import {Button, Card, CardContent, Grid, LinearProgress, Stack, TextField, Typography} from "@mui/material";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {UTILS} from "../../../utils/utils";
import {useFormik} from "formik";
import * as yup from "yup";
import {CLUBS_ACTION_CREATORS, selectClubs} from "../../../redux/features/clubs/clubs-slice";
import {useSafeFactory} from "../../../hooks/use-safe-factory";
import {useConnectWallet} from "@web3-onboard/react";
import {useSnackbar} from "notistack";
import web3 from "web3";

const DepositFunds = () => {

    const dispatch = useDispatch();
    const {safe, setLoading, loading: safeLoading} = useSafeFactory();
    const [{wallet}] = useConnectWallet();
    const {club, loading} = useSelector(selectClubs);
    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleValidatePost = async (amount) => {
        try {
            const tx = await safe.createTransaction({
                safeTransactionData: {value: `${amount}`, data: '0x', to: wallet.accounts[0].address},
                onlyCalls: true,
                options: {refundReceiver: wallet.accounts[0].address}
            });
            if (tx) {
                const txHash = await safe.getTransactionHash(tx);
                // const safeTX = await safe.signTransaction(tx);
                // await safe.approveTransactionHash(txHash);
                // await safe.executeTransaction(safeTX);
                dispatch(CLUBS_ACTION_CREATORS.joinClub({
                    data: {amount: web3.utils.fromWei(`${amount}`, 'ether'), address: wallet.accounts[0].address},
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

    const formik = useFormik({
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object().shape({
            deposit: yup.number().required('Deposit required')
        }),
        onSubmit: async (values, formikHelpers) => {
            await handleValidatePost(values.deposit);
            formikHelpers.resetForm();
        },
        initialValues: {
            deposit: ''
        }
    });

    return (
        <Card
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(5px)'
            }}>
            {loading && <LinearProgress variant="query" color="secondary"/>}
            {safeLoading && <LinearProgress variant="query" color="primary"/>}
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2, mb: 4}} variant="h6" align="center">
                Deposit funds to join club
            </Typography>
            <CardContent sx={{paddingX: 5}}>
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
                                    placeholder="Enter amount in wei"
                                    label="Deposit"
                                    name="deposit"
                                    value={formik.values.deposit}
                                    color="secondary"
                                    size="small"
                                    error={Boolean(formik.touched.deposit && formik.errors.deposit)}
                                    helperText={formik.touched.deposit && formik.errors.deposit}
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
                                onClick={formik.handleSubmit}
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
                </form>
            </CardContent>
        </Card>
    )
}

export default DepositFunds;
