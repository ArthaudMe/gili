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
    Grid,
    LinearProgress,
    Stack,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {CLUBS_ACTION_CREATORS, selectClubs} from "../../redux/features/clubs/clubs-slice";
import {useParams} from "react-router";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {CREATE_CLUB_ACTION_CREATORS} from "../../redux/features/create-club/create-club-slice";

const ClubGovernanceRulesPage = () => {

    const {club, loading, error, gas} = useSelector(selectClubs);
    const {clubID} = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(CLUBS_ACTION_CREATORS.getClub({clubID}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clubID]);

    useEffect(() => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.getGas());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                    <Card sx={{mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}} elevation={1}>
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
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Set up governance rules
                                    </Typography>
                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                        Number of admins
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Add admins via their polygon addresses
                                    </Typography>
                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                        Number of admins
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Number of admins needed to validate a transactions
                                    </Typography>
                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                        X / Y
                                    </Typography>
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
                                        disableElevation={true}
                                        fullWidth={true}
                                        type="submit"
                                        variant="contained" size="large"
                                        sx={{
                                            textTransform: 'lowercase',
                                            backgroundColor: '#6052FF',
                                            '&:hover': {backgroundColor: '#6052FF'}
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
                                size="small" startIcon={<KeyboardArrowLeft />}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                We recommend setting up your governance rules once in order to save on gas costs.                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AuthLayout>
    )
}

export default ClubGovernanceRulesPage;
