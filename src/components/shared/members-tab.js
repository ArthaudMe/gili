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
                <Typography variant="h6" sx={{color: 'text.primary', mb: 2}}>
                    Admins
                </Typography>
                <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Holding</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Admins admins={filterByRole(members, 'admin')}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box>
                <Typography variant="h6" sx={{color: 'text.primary', mb: 2}}>
                    Members
                </Typography>
                <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Holding</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Members members={filterByRole(members, 'user')}/>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Stack>
    )
}

export default MembersTab;
