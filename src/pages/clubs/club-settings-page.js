import AuthLayout from "../../components/layout/auth-layout";
import React from "react";
import {Box, Button, Card, CardContent, Container, Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {selectClubs} from "../../redux/features/clubs/clubs-slice";
import {useParams} from "react-router";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const ClubSettingsPage = () => {

    const {club} = useSelector(selectClubs);
    const {clubID} = useParams();

    const navigate = useNavigate();

    return (
        <AuthLayout>
            <Box sx={{py: 4, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Container maxWidth="md">
                    <Card sx={{mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}} elevation={1}>
                        <CardContent>
                            <Typography variant="h6" sx={{color: 'text.primary', mb: 2}} align="center">
                                {`${club?.name} club settings`}
                            </Typography>
                            <Typography
                                align="center"
                                sx={{
                                    textTransform: 'capitalize',
                                    color: 'text.primary',
                                    mb: 2,
                                    textDecoration: 'underline'
                                }}
                                variant="body1"
                                fullWidth={true}>
                                Modify Settings
                            </Typography>

                            <Grid sx={{mb: 2}} container={true} justifyContent="space-between" spacing={2}>
                                <Grid item={true} xs={12} md="auto">
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Deposits open until
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={12} md="auto">
                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                        29/09/2022
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid sx={{mb: 2}} container={true} justifyContent="space-between" spacing={2}>
                                <Grid item={true} xs={12} md="auto">
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Max. amount raising
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={12} md="auto">
                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                        1,000,00 eth
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid sx={{mb: 2}} container={true} justifyContent="space-between" spacing={2}>
                                <Grid item={true} xs={12} md="auto">
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Max. number of members
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={12} md="auto">
                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                        30
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid sx={{mb: 2}} container={true} justifyContent="space-between" spacing={2}>
                                <Grid item={true} xs={12} md="auto">
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Estimated gas
                                    </Typography>
                                </Grid>
                                <Grid item={true} xs={12} md="auto">
                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                        0.23 matic
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container={true} justifyContent="center">
                                <Grid item={true} xs={12} md="auto">
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
                                size="small"
                                startIcon={<KeyboardArrowLeft />}>
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
        </AuthLayout>
    )
}
export default ClubSettingsPage;
