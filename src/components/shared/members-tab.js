import {
    Box,
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
import Members from "./members";
import Admins from "./admins";
import React from "react";

const MembersTab = ({members}) => {

    const filterByRole = (members, role) => {
        return members.filter(member => member.role === role);
    }

    return (
        <Stack direction="column" spacing={4}>
            <Box>
                <Typography variant="body1" sx={{color: 'text.primary', mb: 2, textDecoration: 'underline'}}>
                    Admins
                </Typography>
                <TableContainer sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}} component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell align="center">Holding</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Admins admins={filterByRole(members, 'Admin')}/>
                        </TableBody>
                    </Table>
                </TableContainer>
                {filterByRole(members, 'Admin').length === 0 && (
                    <Box sx={{
                        padding: 4,
                        backgroundColor: 'rgba(245, 245, 245, 0.2)',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 1
                    }}>
                        <Typography variant="body2" sx={{color: 'text.primary'}} align="center">
                            No admins available
                        </Typography>
                    </Box>
                )}
            </Box>
            <Box>
                <Typography variant="body1" sx={{color: 'text.primary', mb: 2, textDecoration: 'underline'}}>
                    Members
                </Typography>
                <TableContainer sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}} component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell align="center">Holding</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Members members={filterByRole(members, 'Member')}/>
                        </TableBody>
                    </Table>
                </TableContainer>
                {filterByRole(members, 'Member').length === 0 && (
                    <Box sx={{
                        padding: 4,
                        backgroundColor: 'rgba(245, 245, 245, 0.2)',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 1
                    }}>
                        <Typography variant="body2" sx={{color: 'text.primary'}} align="center">
                            No members available
                        </Typography>
                    </Box>
                )}
            </Box>
        </Stack>
    )
}

export default MembersTab;
