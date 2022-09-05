import {TableCell} from "@mui/material";
import React from "react";

const Token = ({token, index}) => {

    return (
        <React.Fragment>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{token.token}</TableCell>
            <TableCell>{token.balance}</TableCell>
            <TableCell>{token.value}</TableCell>
        </React.Fragment>
    )
}

export default Token;
