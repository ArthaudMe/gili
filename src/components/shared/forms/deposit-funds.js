import {Button, Card, CardContent, Grid, Stack, TextField, Typography} from "@mui/material";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {UTILS} from "../../../utils/utils";
import {useFormik} from "formik";
import * as yup from "yup";
import {selectClubs} from "../../../redux/features/clubs/clubs-slice";

const DepositFunds = () => {

    const dispatch = useDispatch();
    const {club} = useSelector(selectClubs);

    const handleValidatePost = () => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.next());
    }

    const formik = useFormik({
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object().shape({
            deposit: yup.number().required('Deposit required')
        }),
        onSubmit: (values, formikHelpers) => {
            console.log(values, formikHelpers);
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
                                    placeholder="Amount"
                                    label="Deposit"
                                    name="deposit"
                                    value={formik.values.deposit}
                                    color="secondary"
                                    size="small"
                                    error={Boolean(formik.touched.deposit && formik.errors.deposit)}
                                    helperText={
                                        <Typography variant="body2" color="error">
                                            {formik.touched.deposit && formik.errors.deposit}
                                        </Typography>
                                    }
                                />
                                <Typography sx={{color: 'text.primary'}} variant="body1">
                                    {UTILS.selectCurrency(club.currency)}
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
                                    {UTILS.selectCurrency(club?.currency)}
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
                                    {UTILS.selectCurrency(club.currency)}
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

export default DepositFunds;
