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
import Tokens from "./tokens";
import Investments from "./investments";
import Collectibles from "./collectibles";
import React from "react";

const Assets = ({tokens, collectibles, investments}) => {

    return (
        <Stack direction="column" spacing={4}>
            <Box>
                <Typography variant="body1" sx={{color: 'text.primary', mb: 2, textDecoration: 'underline'}}>
                    Tokens
                </Typography>
                <TableContainer sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}} component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Token</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Tokens tokens={tokens}/>
                        </TableBody>
                    </Table>
                </TableContainer>
                {tokens?.length === 0 && (
                    <Box sx={{
                        padding: 4,
                        backgroundColor: 'rgba(245, 245, 245, 0.2)',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 1
                    }}>
                        <Typography variant="body2" sx={{color: 'text.primary'}} align="center">
                            No tokens available
                        </Typography>
                    </Box>
                )}
            </Box>
            <Box>
                <Typography variant="body1" sx={{color: 'text.primary', mb: 2, textDecoration: 'underline'}}>
                    Investments
                </Typography>
                <TableContainer sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}} component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Investment</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Investments investments={investments}/>
                        </TableBody>
                    </Table>
                </TableContainer>
                {investments?.length === 0 && (
                    <Box sx={{
                        padding: 4,
                        backgroundColor: 'rgba(245, 245, 245, 0.2)',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 1
                    }}>
                        <Typography variant="body2" sx={{color: 'text.primary'}} align="center">
                            No investments available
                        </Typography>
                    </Box>
                )}
            </Box>
            <Box>
                <Typography variant="body1" sx={{color: 'text.primary', mb: 2, textDecoration: 'underline'}}>
                    Collectibles
                </Typography>
                <TableContainer sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}} component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>NFT</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Collectibles collectibles={collectibles}/>
                        </TableBody>
                    </Table>
                </TableContainer>
                {collectibles?.length === 0 && (
                    <Box sx={{
                        padding: 4,
                        backgroundColor: 'rgba(245, 245, 245, 0.2)',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 1
                    }}>
                        <Typography variant="body2" sx={{color: 'text.primary'}} align="center">
                            No collectibles available
                        </Typography>
                    </Box>
                )}
            </Box>
        </Stack>
    )
}

export default Assets;
