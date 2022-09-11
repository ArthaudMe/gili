import AuthLayout from "../../components/layout/auth-layout";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CLUBS_ACTION_CREATORS, selectClubs} from "../../redux/features/clubs/clubs-slice";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useConnectWallet} from "@web3-onboard/react";

const ClubsPage = () => {
    const {clubs, loading, error} = useSelector(selectClubs);
    const [tab, setTab] = useState('admin');
    const [memberClubs, setMemberClubs] = useState([]);
    const [adminClubs, setAdminClubs] = useState([]);
    const [{wallet}] = useConnectWallet();

    const dispatch = useDispatch();

    useEffect(() => {
        if (wallet) {
            if (wallet.accounts[0] && wallet.accounts[0].address) {
                dispatch(CLUBS_ACTION_CREATORS.getClubs({address: wallet.accounts[0].address}));
            }
        }

    }, []);

    useEffect(() => {
        const memberClubs = [];
        const adminClubs = [];

        if (clubs) {
            clubs.forEach(club => {
                club.members.forEach(member => {
                    if (member.address === wallet.accounts[0].address) {
                        if (member.role === 'member') {
                            memberClubs.push(club);
                        } else if (member.role === 'admin') {
                            adminClubs.push(club);
                        }
                    }
                });
            });
        }
        setMemberClubs(memberClubs);
        setAdminClubs(adminClubs);
    }, []);

    const getOwnership = members => {
        let ownership = 0;
        members.forEach(member => {
            if (member.address === wallet.accounts[0].address) {
                ownership = member.ownership;
            }
        });
        return ownership;
    }

    return (
        <AuthLayout>
            {loading && <LinearProgress variant="query" color="secondary"/>}
            <Box sx={{pt: 4}}>
                <Container>
                    {error && (
                        <Alert severity="error"><AlertTitle>{error}</AlertTitle></Alert>
                    )}
                    <Grid container={true} spacing={2} justifyContent="space-between" alignItems="center">
                        <Grid item={true} xs={12} md="auto">
                            <Typography variant="h5" sx={{color: 'text.primary'}}>
                                Your investment clubs
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Link to={`/club/new`} style={{textDecoration: 'none'}}>
                                <Button
                                    sx={{textTransform: 'capitalize', color: 'white'}}
                                    fullWidth={true}
                                    color="primary"
                                    variant="contained"
                                    disableElevation={true}>
                                    Create a Club
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
            <Divider variant="fullWidth" sx={{my: 3}} light={true}/>
            <Box sx={{py: 4}}>
                <Container maxWidth="md">
                    <Stack sx={{mb: 4}} direction="row" spacing={4} alignItems="center">
                        <Typography
                            onClick={() => setTab('admin')}
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                cursor: 'pointer',
                                textDecoration: tab === 'admin' ? 'underline' : 'none',
                                '&:hover': {
                                    color: 'text.secondary',
                                    textDecoration: 'underline',
                                    transition: 'all 300ms 50ms ease-in-out'
                                }
                            }}>
                            Admin
                        </Typography>

                        <Typography
                            onClick={() => setTab('member')}
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                cursor: 'pointer',
                                textDecoration: tab === 'member' ? 'underline' : 'none',
                                '&:hover': {
                                    color: 'text.secondary',
                                    textDecoration: 'underline',
                                    transition: 'all 300ms 50ms ease-in-out'
                                }
                            }}>
                            Member
                        </Typography>
                    </Stack>
                    {tab === 'admin' ? (
                        <Box>
                            {adminClubs && adminClubs.length === 0 ? (
                                <Box>
                                    <TableContainer
                                        sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}
                                        component={Paper} elevation={1}>
                                        <Table size="medium">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Treasury</TableCell>
                                                    <TableCell>Members</TableCell>
                                                    <TableCell>Your ownership</TableCell>
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                    </TableContainer>
                                    <Box
                                        sx={{
                                            minHeight: '30vh',
                                            borderRadius: 0.5,
                                            backgroundColor: 'rgba(255, 255, 255, 0.10)',
                                            alignItems: 'center',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                        <Typography
                                            variant="body2"
                                            align="center" sx={{color: 'text.primary'}}>
                                            You are not an admin of any club
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                    <TableContainer
                                        sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}
                                        component={Paper} elevation={1}>
                                        <Table size="medium">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Treasury</TableCell>
                                                    <TableCell>Members</TableCell>
                                                    <TableCell>Your ownership</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {adminClubs && adminClubs.map((club) => {
                                                    return (
                                                        <TableRow key={club._id}>
                                                            <TableCell>{club.name}</TableCell>
                                                            <TableCell>{club.status}</TableCell>
                                                            <TableCell>{club.treasury}</TableCell>
                                                            <TableCell>{club.members.length}</TableCell>
                                                            <TableCell>{getOwnership(club.members)}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            )}
                        </Box>
                    ) : (tab === 'member') ? (
                        <Box>
                            {memberClubs && memberClubs.length === 0 ? (
                                <Box>
                                    <TableContainer
                                        sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}
                                        component={Paper} elevation={1}>
                                        <Table size="medium">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Treasury</TableCell>
                                                    <TableCell>Members</TableCell>
                                                    <TableCell>Your ownership</TableCell>
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                    </TableContainer>
                                    <Box
                                        sx={{
                                            minHeight: '30vh',
                                            borderRadius: 0.5,
                                            backgroundColor: 'rgba(255, 255, 255, 0.10)',
                                            alignItems: 'center',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                        <Typography
                                            variant="body1"
                                            align="center" sx={{color: 'text.primary'}}>
                                            You are not a member of any club
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                    <TableContainer
                                        sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}
                                        component={Paper} elevation={1}>
                                        <Table size="medium">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Treasury</TableCell>
                                                    <TableCell>Members</TableCell>
                                                    <TableCell>Your ownership</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {memberClubs && memberClubs.map((club) => {
                                                    return (
                                                        <TableRow key={club._id}>
                                                            <TableCell>{club.name}</TableCell>
                                                            <TableCell>{club.status}</TableCell>
                                                            <TableCell>{club.treasury}</TableCell>
                                                            <TableCell>{club.members.length}</TableCell>
                                                            <TableCell>{getOwnership(club.members)}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            )}
                        </Box>
                    ) : null}
                </Container>
            </Box>
        </AuthLayout>
    )
}

export default ClubsPage;
