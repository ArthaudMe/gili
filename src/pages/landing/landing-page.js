import Layout from "../../components/layout/layout";
import {Box, Button, Container, Grid, LinearProgress, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useConnectWallet} from "@web3-onboard/react";

const LandingPage = () => {

    const [{wallet, connecting}, connect] = useConnectWallet();

    const handleConnect = async () => {
        await connect();
    }

    useEffect(() => {
        handleConnect();
    }, [wallet]);

    return (
        <Layout>
            {connecting && <LinearProgress variant="query" color="secondary"/>}
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
                    </Grid>
                </Container>
            </Box>
        </Layout>
    )
}

export default LandingPage;
