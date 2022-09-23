import AuthLayout from "../../components/layout/auth-layout";
import React, {useEffect, useState} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {CLUBS_ACTION_CREATORS, selectClubs} from "../../redux/features/clubs/clubs-slice";
import {useParams} from "react-router";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {CREATE_CLUB_ACTION_CREATORS} from "../../redux/features/create-club/create-club-slice";
import {useFormik} from "formik";
import {useSafeFactory} from "../../hooks/use-safe-factory";
import * as yup from "yup";
import AddOwnerDialog from "../../components/shared/dialogs/add-owner-dialog";
import {useSnackbar} from "notistack";
import AddMemberDialog from "../../components/shared/dialogs/add-member-dialog";

const ClubGovernanceRulesPage = () => {

    const {club, loading, error, gas} = useSelector(selectClubs);
    const [admins, setAdmins] = useState([]);
    const [members, setMembers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openMemberDialog, setOpenMemberDialog] = useState(false);
    const {safe} = useSafeFactory();
    const {clubID} = useParams();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(CLUBS_ACTION_CREATORS.getClub({clubID}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clubID]);

    useEffect(() => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.getGas());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeAdmin = admin => {
        setAdmins(admins.filter(a => a !== admin));
    }

    const addAdmin = admin => {
        if(!admins.includes(admin)){
            setAdmins([admin, ...admins]);
        }
        enqueueSnackbar('admin already added', {variant: 'error'});
    }

    const removeMember = member => {
        setMembers(admins.filter(m => m !== member));
    }

    const addMember = member => {
        if(!members.includes(member)){
            setMembers([member, ...members]);
        }
        enqueueSnackbar('member already added', {variant: 'error'});
    }

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: yup.object({}).shape({
            threshold: yup.number().required('Number of admins required').min(1, 'There should be at least one owner')
        }),
        onSubmit: async (values, formikHelpers) => {
            // await createAddOwnerTx{ ownerAddress, threshold });
        },
        initialValues: {
            threshold: ''
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
                    <form onSubmit={formik.handleSubmit}>
                        <Card
                            sx={{
                                mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.10)',
                                backdropFilter: 'blur(5px)'
                            }}
                            elevation={1}>
                            {loading && <LinearProgress variant="query" color="secondary"/>}
                            <CardContent>
                                {error && (
                                    <Alert sx={{mb: 2}} severity="error"><AlertTitle>{error}</AlertTitle></Alert>
                                )}
                                <Typography variant="h6" sx={{color: 'text.primary', mb: 2}} align="center">
                                    {`${club?.name} governance rules`}
                                </Typography>

                                <Stack sx={{mb: 4}} direction="column" spacing={2}>
                                    <Box>
                                        <Typography variant="body2" sx={{color: 'text.secondary', mb: 2}}>
                                            Set up governance rules
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                                            <Grid item={true} xs={12} md="auto">
                                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                    Add members via their addresses
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={12} md="auto">
                                                <Button
                                                    onClick={() => setOpenDialog(true)}
                                                    variant="text"
                                                    size="small"
                                                    color="primary">
                                                    Add
                                                </Button>
                                            </Grid>
                                        </Grid>

                                        <Box>
                                            {members.length === 0 ? (
                                                <Box>
                                                    <Typography variant="body2" sx={{color: 'text.primary'}}>
                                                        No members added
                                                    </Typography>
                                                </Box>
                                            ) : members.map(member => {
                                                return (
                                                    <Stack
                                                        key={member}
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center">
                                                        <Typography variant="body2" sx={{color: 'text.primary'}}>
                                                            {member}
                                                        </Typography>
                                                        <Button
                                                            onClick={() => removeMember(member)}
                                                            variant="text"
                                                            size="small"
                                                            color="primary">
                                                            Remove
                                                        </Button>
                                                    </Stack>
                                                )
                                            })}
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                                            <Grid item={true} xs={12} md="auto">
                                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                    Add admins via their polygon addresses
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} xs={12} md="auto">
                                                <Button
                                                    onClick={() => setOpenDialog(true)}
                                                    variant="text"
                                                    size="small"
                                                    color="primary">
                                                    Add
                                                </Button>
                                            </Grid>
                                        </Grid>

                                        <Box>
                                            {admins.length === 0 ? (
                                                <Box>
                                                    <Typography variant="body2" sx={{color: 'text.primary'}}>
                                                        No admin added
                                                    </Typography>
                                                </Box>
                                            ) : admins.map(admin => {
                                                return (
                                                    <Stack
                                                        key={admin}
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center">
                                                        <Typography variant="body2" sx={{color: 'text.primary'}}>
                                                            {admin}
                                                        </Typography>
                                                        <Button
                                                            onClick={() => removeAdmin(admin)}
                                                            variant="text"
                                                            size="small"
                                                            color="primary">
                                                            Remove
                                                        </Button>
                                                    </Stack>
                                                )
                                            })}
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" sx={{color: 'text.secondary', mb: 2}}>
                                            Number of admins needed to validate a transactions
                                        </Typography>

                                        <TextField
                                            variant="outlined"
                                            fullWidth={true}
                                            size="medium"
                                            placeholder="Number of admins"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            name="threshold"
                                            error={Boolean(formik.touched.threshold && formik.errors.threshold)}
                                            helperText={formik.touched.threshold && formik.errors.threshold}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Exceptions
                                        </Typography>
                                        <Typography variant="body1" sx={{color: 'text.primary'}}>
                                            1 admin can validate a transaction if it’s under 0.1 eth
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Grid container={true} justifyContent="space-between" spacing={2}>
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
                                    </Box>
                                </Stack>

                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Button
                                            onClick={formik.handleSubmit}
                                            disableElevation={true}
                                            fullWidth={true}
                                            type="submit"
                                            color="secondary"
                                            variant="contained" size="large"
                                            sx={{textTransform: 'none'}}>
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
                                    size="small" startIcon={<KeyboardArrowLeft/>}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item={true} xs={12} md="auto">
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    We recommend setting up your governance rules once in order to save on gas
                                    costs.
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
                {openDialog && (
                    <AddOwnerDialog
                        open={openDialog}
                        handleOwnerAdd={addAdmin}
                        handleClose={() => setOpenDialog(false)}
                    />
                )}

                {openMemberDialog && (
                    <AddMemberDialog
                        open={openMemberDialog}
                        handleMemberAdd={addMember}
                        handleClose={() => setOpenMemberDialog(false)}
                    />
                )}
            </Box>
        </AuthLayout>
    )
}

export default ClubGovernanceRulesPage;
