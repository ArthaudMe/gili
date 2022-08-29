import Layout from "../../components/layout/layout";
import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const LandingPage = () => {

    return (<Layout>
            <Box>
                <Container sx={{width: '100%', minHeight: '100vh'}}>
                    <Grid
                        container={true}
                        justifyContent="center"
                        alignItems="center"
                        sx={{minHeight: '80vh'}}>
                        <Grid item={true} xs={12} md={6}>
                            <Typography
                                variant="h3"
                                sx={{color: 'text.primary', textTransform: 'uppercase', mb: 2}}>
                                Investment clubs for all
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{color: 'text.secondary', mb: 2}}>
                                Create a club to invest in crypto/NFTs + startups / real estate / art etc. with your
                                friends
                            </Typography>
                            <Stack direction="row">
                                <Link to={`/club/new`} style={{textDecoration: 'none'}}>
                                    <Button variant="contained" size="large" sx={{textTransform: 'lowercase'}}>
                                        create a club
                                    </Button>
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item={true} xs={12} md={6}></Grid>
                    </Grid>
                </Container>
                <Container>
                    <Grid container={true} spacing={4}>
                        <Grid item={true} xs={12} md={3}>

                        </Grid>
                        <Grid item={true} xs={12} md={3}>

                        </Grid>
                        <Grid item={true} xs={12} md={3}>

                        </Grid>
                        <Grid item={true} xs={12} md={3}>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>)
}

export default LandingPage;
