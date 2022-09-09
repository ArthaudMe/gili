import AuthLayout from "../../components/layout/auth-layout";
import React from "react";
import {useSelector} from "react-redux";
import {selectClubs} from "../../redux/features/clubs/clubs-slice";
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
    Tooltip,
    Typography
} from "@mui/material";
import moment from "moment";
import {EditOutlined, SettingsOutlined, VisibilityOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";

const ClubsPage = () => {
    const {clubs, loading, error} = useSelector(selectClubs);

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
                            <Typography variant="h4" sx={{color: 'text.primary'}}>
                                Clubs
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                sx={{
                                    textTransform: 'capitalize',
                                    borderBottomRightRadius: 0,
                                    borderTopRightRadius: 12,
                                    borderBottomLeftRadius: 12,
                                    borderTopLeftRadius: 0,
                                }}
                                fullWidth={true}
                                color="secondary"
                                variant="outlined"
                                disableElevation={true}>
                                Create Club
                            </Button>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
            <Divider variant="fullWidth" sx={{my: 3}} light={true}/>
            <Box sx={{py: 4}}>
                <Container>
                    {clubs && clubs.length === 0 ? (
                        <Box>
                            <TableContainer sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}} component={Paper} elevation={1}>
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Fundraising Goal</TableCell>
                                            <TableCell>Safe Address</TableCell>
                                            <TableCell>Created At</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                            <Box
                                sx={{
                                    minHeight: '30vh',
                                    borderRadius: 0.5,
                                    backgroundColor: 'background.paper',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                <Typography
                                    variant="body1"
                                    align="center" sx={{textTransform: 'uppercase', color: 'text.primary'}}>
                                    No clubs available
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Box>
                            <TableContainer sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}} component={Paper} elevation={1}>
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Fundraising Goal</TableCell>
                                            <TableCell>Safe Address</TableCell>
                                            <TableCell>Created At</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {clubs && clubs.map((club, index) => {
                                            return (
                                                <TableRow key={club._id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{club.name}</TableCell>
                                                    <TableCell>{club.goal}</TableCell>
                                                    <TableCell>{club.safeAddress}</TableCell>
                                                    <TableCell>{moment(club.createdAt).fromNow()}</TableCell>
                                                    <TableCell>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Tooltip title={`View ${club.name} details`}>
                                                                <Link
                                                                    style={{textDecoration: 'none'}}
                                                                    to={`/clubs/${club._id}`}>
                                                                    <VisibilityOutlined color="secondary"/>
                                                                </Link>
                                                            </Tooltip>
                                                            <Tooltip title={`View ${club.name} settings`}>
                                                                <Link
                                                                    style={{textDecoration: 'none'}}
                                                                    to={`/clubs/${club._id}/settings`}>
                                                                    <SettingsOutlined color="secondary"/>
                                                                </Link>
                                                            </Tooltip>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Container>
            </Box>
        </AuthLayout>
    )
}

export default ClubsPage;
