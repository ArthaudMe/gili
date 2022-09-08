import AuthLayout from "../../components/layout/auth-layout";
import {useSelector} from "react-redux";
import {selectClubs} from "../../redux/features/clubs/clubs-slice";
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
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import Assets from "../../components/shared/assets";
import MembersTab from "../../components/shared/members-tab";
import Activity from "../../components/shared/activity";
import {selectTransactions} from "../../redux/features/transactions/transactions-slice";
import {selectTokens} from "../../redux/features/tokens/tokens-slice";
import {selectCollectibles} from "../../redux/features/collectibles/collectibles-slice";
import {selectInvestments} from "../../redux/features/investments/investments-slice";

const ClubProfilePage = () => {

    const {club, loading, error} = useSelector(selectClubs);
    const {transactions} = useSelector(selectTransactions);
    const {tokens} = useSelector(selectTokens);
    const {investments} = useSelector(selectInvestments);
    const {collectibles} = useSelector(selectCollectibles);

    const {clubID} = useParams();
    const [index, setIndex] = useState("assets");

    const handleTabChange = (event, value) => {
        setIndex(value);
    }

    const renderTabContent = tab => {
        switch (tab) {
            case 'assets':
                return (
                    <Assets
                        tokens={tokens}
                        collectibles={collectibles}
                        investments={investments}
                    />);
            case 'members':
                return <MembersTab members={club.members}/>;
            case 'activity':
                return <Activity transactions={transactions}/>;
            default:
                return (
                    <Assets
                        tokens={club.tokens}
                        collectibles={club.collectibles}
                        investments={club.investments}
                    />);
        }
    }

    return (
        <AuthLayout>
            {loading && <LinearProgress variant="query" color="secondary"/>}
            <Box sx={{py: 4}}>
                <Container maxWidth="md">
                    {error && (
                        <Alert severity="error"><AlertTitle>{error}</AlertTitle></Alert>
                    )}
                    <Box sx={{mb: 2}}>
                        <Typography align="center" variant="h6" sx={{mb: 4}}>{`${club?.name} portfolio`}</Typography>
                        <Card elevation={1}>
                            <CardContent>
                                <Grid sx={{mb: 2}} container={true} spacing={2} justifyContent="space-between">
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Your ownership
                                        </Typography>
                                    </Grid>
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body1" sx={{color: 'text.primary'}}>
                                            2 GEO (50% of circulating supply)
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid sx={{mb: 2}} container={true} spacing={2} justifyContent="space-between">
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Club token minted
                                        </Typography>
                                    </Grid>
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body1" sx={{color: 'text.primary'}}>
                                            4% of GEO total supply
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid sx={{mb: 2}} container={true} spacing={2} justifyContent="space-between">
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

                                <Grid sx={{mb: 2}} container={true} spacing={2} justifyContent="space-between">
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Amount raised
                                        </Typography>
                                    </Grid>
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body1" sx={{color: 'text.primary'}}>
                                            4 eth
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{mb: 4}}>
                        <Grid container={true} spacing={2} justifyContent="space-between">
                            <Grid item={true} xs={12} md="auto">
                                <Link to={`/clubs/${club?._id}/settings`} style={{textDecoration: 'none'}}>
                                    <Button
                                        size="small"
                                        variant="text"
                                        sx={{
                                            textDecoration: 'underline',
                                            color: 'text.secondary',
                                            textTransform: 'capitalize'
                                        }}>
                                        Modify Settings
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item={true} xs={12} md="auto">
                                <Link to={`/clubs/${club?._id}/funds`} style={{textDecoration: 'none'}}>
                                    <Button
                                        size="small"
                                        variant="text"
                                        sx={{
                                            textDecoration: 'underline',
                                            color: 'text.secondary',
                                            textTransform: 'capitalize'
                                        }}>
                                        Deposit more
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item={true} xs={12} md="auto">
                                <Link to={`/clubs/${club?._id}/rules`} style={{textDecoration: 'none'}}>
                                    <Button
                                        size="small"
                                        variant="text"
                                        sx={{
                                            textDecoration: 'underline',
                                            color: 'text.secondary',
                                            textTransform: 'capitalize'
                                        }}>
                                        Set up governance rules
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <Tabs value={index} onChange={handleTabChange} variant="scrollable">
                            <Tab
                                sx={{
                                    textTransform: 'capitalize',
                                    color: index === 'assets' ? 'text.primary' : 'text.secondary'
                                }} value="assets" label="Assets"/>
                            <Tab
                                sx={{
                                    textTransform: 'capitalize',
                                    color: index === 'assets' ? 'text.primary' : 'text.secondary'
                                }} value="members" label="Members"/>
                            <Tab
                                sx={{
                                    textTransform: 'capitalize',
                                    color: index === 'assets' ? 'text.primary' : 'text.secondary'
                                }} value="activity" label="Activity"/>
                        </Tabs>
                    </Box>
                    <Box>
                        {club && transactions && renderTabContent(index)}
                    </Box>
                </Container>
            </Box>
        </AuthLayout>
    )
}

export default ClubProfilePage;
