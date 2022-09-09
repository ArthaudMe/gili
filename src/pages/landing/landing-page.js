import Layout from "../../components/layout/layout";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const LandingPage = () => {

    return (
        <Layout>
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
                    <Stack direction="row" justifyContent="center">
                        <Link to={`/club/new`} style={{textDecoration: 'none'}}>
                            <Button variant="contained" size="large" sx={{textTransform: 'capitalize'}}>
                                start your club
                            </Button>
                        </Link>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    )
}

export default LandingPage;
