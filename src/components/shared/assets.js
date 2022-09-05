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
                <Typography variant="h6" sx={{color: 'text.primary', mb: 2}}>
                    Tokens
                </Typography>
                <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
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
            </Box>
            <Box>
                <Typography variant="h6" sx={{color: 'text.primary', mb: 2}}>
                    Investments
                </Typography>
                <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
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
            </Box>
            <Box>
                <Typography variant="h6" sx={{color: 'text.primary', mb: 2}}>
                    Collectibles
                </Typography>
                <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>NFT</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Collectibles collectibles={collectibles}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>
    )
}

export default Assets;
