import AuthLayout from "../../components/layout/auth-layout";
import React, {useEffect} from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {CLUBS_ACTION_CREATORS, selectClubs} from "../../redux/features/clubs/clubs-slice";
import {useParams} from "react-router";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";
import {useFormik} from "formik";
import * as yup from "yup";
import {UTILS} from "../../utils/utils";
import {CREATE_CLUB_ACTION_CREATORS} from "../../redux/features/create-club/create-club-slice";
import {useConnectWallet} from "@web3-onboard/react";

const ClubSettingsPage = () => {

    const {club, loading, gas, error} = useSelector(selectClubs);
    const {clubID} = useParams();
    const [{wallet}] = useConnectWallet();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CLUBS_ACTION_CREATORS.getClub({clubID}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clubID]);

    const formik = useFormik({
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values) => {
            dispatch(CLUBS_ACTION_CREATORS.updateClub({
                data: {...values, address: wallet.accounts[0].address},
                club: clubID
            }))
        },
        validationSchema: yup.object().shape({
            goal: yup.string().required('Club goal required'),
            duration: yup.object().shape({
                amount: yup.number().min(1, 'Amount must be at least one').required('Duration amount is required'),
                unit: yup.string().oneOf(['day', 'week', 'month', 'year'], 'Unit must be one of day, week, month, year')
            }),
            maximumMemberCount: yup.number().min(1, 'Amount must be at least one').required('Duration amount is required')
        }),
        initialValues: {
            goal: club?.goal,
            duration: {
                amount: club?.duration?.amount,
                unit: club?.duration?.unit
            },
            maximumMemberCount: club?.maximumMemberCount
        }
    });

    useEffect(() => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.getGas());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthLayout>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{
                    py: 4,
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
                                {error && <Alert sx={{mb: 2}} severity="error"><AlertTitle>{error}</AlertTitle></Alert>}
                                <Typography variant="h6" sx={{color: 'text.primary', mb: 2}} align="center">
                                    {`${club?.name} club settings`}
                                </Typography>
                                <Typography
                                    align="center"
                                    sx={{
                                        textTransform: 'capitalize',
                                        color: 'text.primary',
                                        mb: 2
                                    }}
                                    variant="body1"
                                    fullWidth={true}>
                                    Modify Settings
                                </Typography>

                                <Grid sx={{mb: 3}} container={true} justifyContent="space-between" alignItems="center"
                                      spacing={2}>
                                    <Grid item={true} xs={12} md={6}>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Deposits open until
                                        </Typography>
                                    </Grid>
                                    <Grid item={true} xs={12} md={6}>
                                        <Typography variant="body1" sx={{color: 'text.primary'}}>
                                            {club && moment(club.createdAt).add(club?.duration?.amount, club?.duration?.unit).format('DD/MM/YYYY')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box sx={{mb: 3}}>
                                    <Grid container={true} spacing={2} alignItems="center">
                                        <Grid item={true} xs={12} md={6}>
                                            <TextField
                                                type="number"
                                                size="medium"
                                                fullWidth={true}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                label="Max. amount raising"
                                                value={formik.values.goal}
                                                error={Boolean(formik.touched.goal && formik.errors.goal)}
                                                helperText={formik.touched.goal && formik.errors.goal}
                                                placeholder="Max. amount raising"
                                                name="goal"
                                            />
                                        </Grid>
                                        <Grid item={true} xs={12} md={6}>
                                            <Typography variant="body1" sx={{color: 'text.primary'}}>
                                                {club && UTILS.selectCurrency(club.currency)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{mb: 3}}>
                                    <Grid container={true} spacing={2}>
                                        <Grid item={true} xs={12} md={6}>
                                            <Grid container={true} spacing={2}>
                                                <Grid item={true} xs={12} md={6}>
                                                    <TextField
                                                        sx={{flex: 1}}
                                                        type="number"
                                                        size="medium"
                                                        fullWidth={true}
                                                        value={formik.values.duration.amount}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        label="Fundraising Duration"
                                                        error={Boolean(formik.touched.duration?.amount && formik.errors.duration?.amount)}
                                                        helperText={formik.touched.duration?.amount && formik.errors.duration?.amount}
                                                        placeholder="Fund raising duration"
                                                        name="duration.amount"
                                                    />
                                                </Grid>
                                                <Grid item={true} xs={12} md={6}>
                                                    <FormControl sx={{flex: 1}} variant="outlined" fullWidth={true}>
                                                        <InputLabel htmlFor="unit">Unit</InputLabel>
                                                        <Select
                                                            id="unit"
                                                            onChange={formik.handleChange}
                                                            name="duration.unit"
                                                            fullWidth={true}
                                                            label="Unit"
                                                            value={formik.values.duration.unit}
                                                            variant="outlined" size="medium">
                                                            <MenuItem value="day">Day</MenuItem>
                                                            <MenuItem value="week">Week</MenuItem>
                                                            <MenuItem value="month">Month</MenuItem>
                                                            <MenuItem value="year">Year</MenuItem>
                                                        </Select>
                                                        {Boolean(formik.touched.duration?.unit) && (
                                                            <FormHelperText>
                                                                {formik.errors.duration?.unit}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item={true} xs={12} md={6}>
                                            <TextField
                                                type="number"
                                                size="medium"
                                                fullWidth={true}
                                                value={formik.values.maximumMemberCount}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                label="Maximum number of members"
                                                error={Boolean(formik.touched.maximumMemberCount && formik.errors.maximumMemberCount)}
                                                helperText={formik.touched.maximumMemberCount && formik.errors.maximumMemberCount}
                                                placeholder="Maximum number of members"
                                                name="maximumMemberCount"
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Grid sx={{mb: 3}} container={true} justifyContent="space-between" spacing={2}>
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Estimated gas
                                        </Typography>
                                    </Grid>
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography sx={{color: 'text.primary'}} variant="body1">
                                            {gas && `${gas.maxPrice} ${gas.unit}`}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box sx={{my: 3}}>
                                    <Link
                                        to={`/clubs/${clubID}/invitations`}
                                        style={{textDecoration: 'none'}}>
                                        <Typography
                                            variant="body2"
                                            sx={{color: 'text.primary', textDecoration: 'underline'}}
                                            align="center">
                                            invite more members to join the club
                                        </Typography>
                                    </Link>
                                </Box>

                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md="auto">
                                        <Button
                                            disableElevation={true}
                                            fullWidth={true}
                                            type="submit"
                                            color="secondary"
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                textTransform: 'capitalize'
                                            }}>
                                            Submit Changes
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Grid container={true} spacing={2} justifyContent="space-between">
                            <Grid item={true} xs={12} md="auto">
                                <Button
                                    sx={{textTransform: 'capitalize', color: 'text.primary'}}
                                    onClick={() => navigate(-1)}
                                    variant="text"
                                    size="small"
                                    startIcon={<KeyboardArrowLeft/>}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item={true} xs={12} md="auto">
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    We recommend modifying settings all at once in order to save on gas costs.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </form>
        </AuthLayout>
    )
}
export default ClubSettingsPage;
