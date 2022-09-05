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
                <Typography variant="h6" sx={{color: 'text.primary', mb: 2}}>
                    Pending transactions
                </Typography>
                <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Transactions
                                transactions={filterTransactions(transactions, 'pending')}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box>
                <Typography variant="h6" sx={{color: 'text.primary', mb: 2}}>
                    Past transactions
                </Typography>
                <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Transactions
                                transactions={filterTransactions(transactions, 'completed')}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>
    )
}

export default Activity;
