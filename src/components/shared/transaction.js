import {TableCell} from "@mui/material";
import React from "react";

const Transaction = ({transaction, index}) => {

    return (
        <React.Fragment>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{transaction.address}</TableCell>
            <TableCell>transaction.amount</TableCell>
        </React.Fragment>
    )
}

export default Transaction;
