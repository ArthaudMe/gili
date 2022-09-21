import AuthLayout from "../../components/layout/auth-layout";
import {useDispatch, useSelector} from "react-redux";
import {CLUBS_ACTION_CREATORS, selectClubs} from "../../redux/features/clubs/clubs-slice";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Assets from "../../components/shared/assets";
import MembersTab from "../../components/shared/members-tab";
import Activity from "../../components/shared/activity";
import {selectTransactions} from "../../redux/features/transactions/transactions-slice";
import {selectTokens} from "../../redux/features/tokens/tokens-slice";
import {selectCollectibles} from "../../redux/features/collectibles/collectibles-slice";
import {selectInvestments} from "../../redux/features/investments/investments-slice";
import {MEMBERS_ACTION_CREATORS, selectMembers} from "../../redux/features/members/members-slice";
import {UTILS} from "../../utils/utils";
import {useConnectWallet} from "@web3-onboard/react";

const ClubProfilePage = () => {

    const {club, loading, error} = useSelector(selectClubs);
    const {members, memberLoading, memberError, member} = useSelector(selectMembers);
    const {transactions} = useSelector(selectTransactions);
    const {tokens} = useSelector(selectTokens);
    const {investments} = useSelector(selectInvestments);
    const {collectibles} = useSelector(selectCollectibles);
    const [{wallet}] = useConnectWallet();
    const dispatch = useDispatch();

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
                return <MembersTab members={members}/>;
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

    useEffect(() => {
        dispatch(CLUBS_ACTION_CREATORS.getClub({clubID}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clubID]);

    useEffect(() => {
        dispatch(MEMBERS_ACTION_CREATORS.getMembers({club: clubID}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clubID]);

    useEffect(() => {
        dispatch(MEMBERS_ACTION_CREATORS.getCurrentMember({club: clubID, member: wallet.accounts[0].address}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clubID, wallet.accounts[0].address]);

    return (
        <AuthLayout>
            {loading && <LinearProgress variant="query" color="secondary"/>}
            {memberLoading && <LinearProgress variant="query" color="primary"/>}
            <Box sx={{py: 4}}>
                <Container maxWidth="md">
                    {error && (
                        <Alert sx={{mb: 2}} severity="error"><AlertTitle>{error}</AlertTitle></Alert>
                    )}
                    {memberError && (
                        <Alert sx={{mb: 2}} severity="error"><AlertTitle>{memberError}</AlertTitle></Alert>
                    )}
                    <Box sx={{mb: 2}}>
                        <Typography align="center" variant="h6" sx={{mb: 4}}>{`${club?.name} portfolio`}</Typography>
                        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}
                              elevation={1}>
                            <CardContent>
                                <Grid sx={{mb: 2}} container={true} spacing={2} justifyContent="space-between">
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Your ownership
                                        </Typography>
                                    </Grid>
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body1" sx={{color: 'text.primary'}}>
                                            {member?.stake} GEO ({member?.ownership}% of circulating supply)
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
                                            {club?.minted}% of {club?.token} total supply
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
                                            {club?.goal} {club && UTILS.selectCurrency(club?.currency)}
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
                                            {`${club?.treasury} ${club && UTILS.selectCurrency(club?.currency)}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{mb: 4}}>
                        <Grid container={true} spacing={2} justifyContent="space-between">
                            {member?.role === 'Admin' && (
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
                            )}

                            <Grid item={true} xs={12} md="auto">
                                <Link to={`/clubs/${club?._id}/funds`} style={{textDecoration: 'none'}}>
                                    <Button
                                        size="small"
                                        variant="text"
                                        sx={{
                                            textDecoration: 'underline',
                                            textTransform: 'capitalize'
                                        }}>
                                        Deposit more
                                    </Button>
                                </Link>
                            </Grid>

                            {member?.role === 'Admin' && (
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
                            )}
                        </Grid>
                    </Box>

                    <Box sx={{mb: 2}}>
                        <Tabs value={index} onChange={(event, value) => handleTabChange(value)} variant="scrollable">
                            <Tab
                                sx={{
                                    textTransform: 'capitalize',
                                    color: index === 'assets' ? 'text.primary' : 'text.secondary'
                                }} value="assets" label="Assets"/>
                            <Tab
                                sx={{
                                    textTransform: 'capitalize',
                                    color: index === 'members' ? 'text.primary' : 'text.secondary'
                                }} value="members" label="Members"/>
                            <Tab
                                sx={{
                                    textTransform: 'capitalize',
                                    color: index === 'activity' ? 'text.primary' : 'text.secondary'
                                }} value="activity" label="Activity"/>
                        </Tabs>
                    </Box>
                    <Divider variant="fullWidth" sx={{my: 2}}/>
                    <Box>
                        {club && transactions && members && renderTabContent(index)}
                    </Box>
                </Container>
            </Box>
        </AuthLayout>
    )
}

export default ClubProfilePage;
