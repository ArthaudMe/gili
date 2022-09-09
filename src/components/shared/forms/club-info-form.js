import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../../redux/features/create-club/create-club-slice";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as yup from "yup";
import React, {useEffect} from "react";

const ClubInfoForm = () => {

    const {club} = useSelector(selectCreateClub);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.getGas());
    }, []);

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            dispatch(CREATE_CLUB_ACTION_CREATORS.saveClub(values));
            dispatch(CREATE_CLUB_ACTION_CREATORS.next());
        },
        initialValues: {
            name: club.name,
            goal: club.goal,
            duration: {
                amount: club.duration.amount,
                unit: club.duration.unit
            },
            token: club.token,
            currency: club.currency,
            maximumMemberCount: club.maximumMemberCount
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Club name required'),
            goal: yup.string().required('Club goal required'),
            duration: yup.object().shape({
                amount: yup.number().min(1, 'Amount must be at least one').required('Duration amount is required'),
                unit: yup.string().oneOf(['day', 'week', 'month', 'year'], 'Unit must be one of day, week, month, year')
            }),
           token: yup.string().required('Club token required'),
            currency: yup.string().required('Club currency required'),
            maximumMemberCount: yup.number().min(1, 'Amount must be at least one').required('Duration amount is required')
        })
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
                <CardContent>
                    <Typography sx={{color: 'white', mb: 4}} variant="h6" align="center">
                        Create a club
                    </Typography>
                    <Box sx={{mb: 3}}>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12} md={6}>
                                <TextField
                                    type="text"
                                    size="medium"
                                    fullWidth={true}
                                    required={true}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Club name"
                                    value={formik.values.name}
                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    placeholder="Club name"
                                    name="name"
                                />
                            </Grid>
                            <Grid item={true} xs={12} md={6}>
                                <TextField
                                    type="text"
                                    size="medium"
                                    fullWidth={true}
                                    required={true}
                                    value={formik.values.token}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Club token"
                                    error={Boolean(formik.touched.token && formik.errors.token)}
                                    helperText={formik.touched.token && formik.errors.token}
                                    placeholder="Club token"
                                    name="token"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{mb: 3}}>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12} md={6}>
                                <TextField
                                    type="number"
                                    size="medium"
                                    fullWidth={true}
                                    required={true}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Club goal"
                                    value={formik.values.goal}
                                    error={Boolean(formik.touched.goal && formik.errors.goal)}
                                    helperText={formik.touched.goal && formik.errors.goal}
                                    placeholder="Funding raising goal"
                                    name="goal"
                                />
                            </Grid>
                            <Grid item={true} xs={12} md={6}>
                                <FormControl sx={{flex: 1}} variant="outlined" fullWidth={true}>
                                    <InputLabel htmlFor="currency">Currency</InputLabel>
                                    <Select
                                        type="text"
                                        size="medium"
                                        fullWidth={true}
                                        required={true}
                                        value={formik.values.currency}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        label="Currency"
                                        error={Boolean(formik.touched.currency && formik.errors.currency)}
                                        placeholder="Currency"
                                        name="currency">
                                        <MenuItem value="Polygon">Polygon</MenuItem>
                                        <MenuItem value="Ethereum">Ethereum</MenuItem>
                                    </Select>
                                    {Boolean(formik.touched.currency && formik.errors.currency) && (
                                        <FormHelperText>
                                            {formik.errors.currency}
                                        </FormHelperText>
                                    )}
                                </FormControl>
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
                                            required={true}
                                            value={formik.values.durationAmount}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            label="Duration"
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
                                                required={true}
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
                                    required={true}
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

                    <Grid container={true} justifyContent="center">
                        <Grid item={true} xs={12} md={4}>
                            <Button
                                disableElevation={true}
                                fullWidth={true}
                                type="submit"
                                onClick={formik.handleSubmit}
                                variant="contained" size="large"
                                sx={{
                                    textTransform: 'capitalize',
                                    py: 1.2
                                }}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
}

export default ClubInfoForm
