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

const UserInviteDepositFunds = ({invitationID}) => {

    const dispatch = useDispatch();
    const {invitation, invitationLoading, invitationError} = useSelector(selectInvitation);
    const {safe, loading, connectSafe, error} = useSafeFactory();
    const [{wallet}] = useConnectWallet();
    const {enqueueSnackbar} = useSnackbar();


    const handleValidatePost = async (amount) => {
        try {
            const owners = safe.getOwners();
            const tx = await safe.createTransaction({
                safeTransactionData: {value: `${amount}`, data: '0x', to: owners[0]}
            });
            if(tx) {
                dispatch(CLUBS_ACTION_CREATORS.joinClub({
                    data: {amount: amount, address: wallet.accounts[0].address},
                    invitation: invitationID,
                    callback: dispatch(CREATE_CLUB_ACTION_CREATORS.next())
                }));
            }
        }catch (e) {
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
            await handleValidatePost(values);
            formikHelpers.resetForm();
        },
        initialValues: {
            deposit: ''
        }
    });

    useEffect(() => {
        dispatch(INVITATIONS_ACTION_CREATORS.verifyInvitation({invitation: invitationID}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invitationID]);

    useEffect(() => {
        const connect = async () => {
            await connectSafe();
        }
        if (!safe) {
            connect().then(response => console.log(response));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [safe, connectSafe]);

    return (
        <Card
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(5px)'
            }}>
            {invitationLoading && <LinearProgress variant="query" color="secondary"/>}
            {loading && <LinearProgress variant="query" color="primary"/>}
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2, mb: 4}} variant="h6" align="center">
                Deposit funds to join club
            </Typography>
            <CardContent sx={{paddingX: 5}}>
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
                                    disabled={loading}
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
                                disabled={Boolean(error || invitationError || loading || invitationLoading)}
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
