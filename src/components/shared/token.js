import {TableCell} from "@mui/material";
import React from "react";

const Token = ({token}) => {

    return (
        <React.Fragment>
            <TableCell>{token.token}</TableCell>
            <TableCell>{token.balance}</TableCell>
            <TableCell>{token.value}</TableCell>
        </React.Fragment>
    )
}

export default Token;
