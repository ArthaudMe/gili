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
import Transactions from "./transactions";
import React from "react";

const Activity = ({transactions}) => {

    const filterTransactions = (transactions, status) => {
        return transactions.filter(transaction => transaction.status === status)
    }

    return (
        <Stack direction="column" spacing={4}>
            <Box>
                <Typography variant="body1" sx={{color: 'text.primary', mb: 2, textDecoration: 'underline'}}>
                    Pending transactions
                </Typography>
                <TableContainer
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.10)',
                        backdropFilter: 'blur(5px)'
                    }}
                    component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell align="center">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Transactions
                                transactions={filterTransactions(transactions, 'pending')}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
                {filterTransactions(transactions, 'pending').length === 0 && (
                    <Box sx={{
                        padding: 4,
                        backgroundColor: 'rgba(245, 245, 245, 0.2)',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 1
                    }}>
                        <Typography variant="body2" sx={{color: 'text.primary'}} align="center">
                            No pending transactions available
                        </Typography>
                    </Box>
                )}
            </Box>
            <Box>
                <Typography variant="body1" sx={{color: 'text.primary', mb: 2, textDecoration: 'underline'}}>
                    Past transactions
                </Typography>
                <TableContainer
                    sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}
                    component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell align="center">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Transactions
                                transactions={filterTransactions(transactions, 'completed')}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
                {filterTransactions(transactions, 'completed').length === 0 && (
                    <Box sx={{
                        padding: 4,
                        backgroundColor: 'rgba(245, 245, 245, 0.2)',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 1
                    }}>
                        <Typography variant="body2" sx={{color: 'text.primary'}} align="center">
                            No transactions available
                        </Typography>
                    </Box>
                )}
            </Box>
        </Stack>
    )
}

export default Activity;
