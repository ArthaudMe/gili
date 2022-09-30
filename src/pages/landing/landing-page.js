import Layout from "../../components/layout/layout";
import {Box, Button, Container, Grid, LinearProgress, Stack, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import {useConnectWallet} from "@web3-onboard/react";

const LandingPage = () => {

    const [{connecting, wallet}, connect] = useConnectWallet();

    return (
        <Layout>
            {connecting && <LinearProgress variant="query" color="secondary"/>}
            <Box sx={{padding: 2}}>
                <Container>
                    <Stack direction="row" justifyContent="end">
                        <Button
                            onClick={() => connect()}
                            variant="contained"
                            size="large"
                            color="secondary"
                            sx={{textTransform: 'capitalize'}}>
                            Connect
                        </Button>
                    </Stack>
                </Container>
            </Box>
            <Box
                sx={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 4}}>
                <Container maxWidth="sm">
                    <Typography
                        align="center"
                        variant="h3"
                        sx={{color: 'text.primary', mb: 2, fontWeight: 700}}>
                        Invest with your friends
                    </Typography>
                    <Typography
                        align="center"
                        variant="body2"
                        sx={{color: 'text.primary', mb: 4}}>
                        Create a club in 2 minutes to invest in tokens, NFTs and more
                    </Typography>
                    <Grid container={true} spacing={2} justifyContent="center">
                        <Grid item={true} xs={12} md="auto">
                            <Link to={`/club/new`} style={{textDecoration: 'none'}}>
                                <Button
                                    fullWidth={true}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    sx={{textTransform: 'capitalize'}}>
                                    start your club
                                </Button>
                            </Link>
                        </Grid>
                        {wallet?.accounts[0]?.address && (
                            <Grid item={true} xs={12} md="auto">
                                <Link to={`/clubs`} style={{textDecoration: 'none'}}>
                                    <Button
                                        fullWidth={true}
                                        variant="contained"
                                        size="large"
                                        color="secondary"
                                        sx={{textTransform: 'capitalize'}}>
                                        view your club
                                    </Button>
                                </Link>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Box>
        </Layout>
    )
}

export default LandingPage;
