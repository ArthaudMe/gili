import AuthLayout from "../../components/layout/auth-layout";
import React from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    LinearProgress,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import {useSafeFactory} from "../../hooks/use-safe-factory";
import {UTILS} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {CLUBS_ACTION_CREATORS, selectClubs} from "../../redux/features/clubs/clubs-slice";
import {useParams} from "react-router";
import {useConnectWallet} from "@web3-onboard/react";
import web3 from "web3";


const ClubDepositFundsPage = () => {

    const navigate = useNavigate();

    const {clubID} = useParams();
    const {safe} = useSafeFactory();
    const {club, loading, message, error} = useSelector(selectClubs);
    const [{wallet}] = useConnectWallet();
    const dispatch = useDispatch();

    const handleValidatePost = async (amount) => {
        const tx = await safe.createTransaction({
            safeTransactionData: {value: `${amount}`, data: '0x', to: safe.getAddress()}
        });
        if(tx){
            const txHash = await safe.getTransactionHash(tx);
            // const safeTX = await safe.signTransaction(tx);
            // const txResult = await safe.approveTransactionHash(txHash);
            // const hash = await safe.executeTransaction(safeTX);
            // console.log(hash, txResult);
            dispatch(CLUBS_ACTION_CREATORS.depositFunds({club: clubID, amount: web3.utils.fromWei(`${amount}`, 'ether'), address: wallet.accounts[0].address}));
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
        <AuthLayout>
            <Box sx={{
                py: 8,
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Container maxWidth="md">
                    <Card
                        sx={{
                            mb: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.10)',
                            backdropFilter: 'blur(5px)'
                        }}
                        elevation={1}>
                        {loading && <LinearProgress variant="query" color="secondary"/>}
                        <CardContent>
                            {message && (
                                <Alert sx={{mb: 2}} severity="info"><AlertTitle>{message}</AlertTitle></Alert>
                            )}
                            <Typography variant="h6" sx={{color: 'text.primary', mb: 2}} align="center">
                                Deposit more funds
                            </Typography>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center"
                                      spacing={2}>
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
                                                placeholder="Amount in wei"
                                                label="Deposit"
                                                value={formik.values.deposit}
                                                color="secondary"
                                                name="deposit"
                                                size="small"
                                                error={formik.touched.deposit && formik.errors.deposit}
                                                helperText={formik.touched.deposit && formik.errors.deposit}
                                            />
                                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                                {club && club.currency && UTILS.selectCurrency(club.currency)}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center"
                                      spacing={2}>
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
                                                {club && club.currency && UTILS.selectCurrency(club?.currency)}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center"
                                      spacing={2}>
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
                                                {club && club.currency && UTILS.selectCurrency(club?.currency)}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Button
                                            onClick={handleValidatePost}
                                            sx={{
                                                textTransform: 'capitalize',
                                                py: 1.2
                                            }}
                                            disabled={Boolean(error || loading)}
                                            color="secondary"
                                            type="submit"
                                            fullWidth={true}
                                            variant="contained"
                                            disableElevation={true}
                                            size="small">
                                            Deposit funds
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                    <Grid container={true} spacing={2} justifyContent="space-between">
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                sx={{textTransform: 'capitalize', color: 'text.primary'}}
                                onClick={() => navigate(-1)}
                                variant="text"
                                size="small" startIcon={<KeyboardArrowLeft/>}>
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AuthLayout>
    )
}

export default ClubDepositFundsPage;
