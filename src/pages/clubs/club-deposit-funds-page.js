import AuthLayout from "../../components/layout/auth-layout";
import React from "react";
import {Box, Button, Card, CardContent, Container, Grid, Stack, Typography} from "@mui/material";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const ClubDepositFundsPage = () => {

    const navigate = useNavigate();

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
                    <Card sx={{mb: 4}} elevation={1}>
                        <CardContent>
                            <Typography variant="h6" sx={{color: 'text.primary', mb: 2}} align="center">
                                Deposit more funds
                            </Typography>

                            <Stack sx={{mb: 4}} direction="column" spacing={2}>
                                <Box>
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Deposit funds
                                    </Typography>
                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                        0.2 eth
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Amount raised
                                    </Typography>
                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                        0.1 eth
                                    </Typography>
                                </Box>

                                <Box>
                                    <Grid container={true} justifyContent="space-between" spacing={2}>
                                        <Grid item={true} xs={12} md="auto">
                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                Club max. token supply
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={12} md="auto">
                                            <Typography variant="body1" sx={{color: 'text.primary'}}>
                                                100 eth
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
                                        Deposit funds
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

export default ClubDepositFundsPage;
