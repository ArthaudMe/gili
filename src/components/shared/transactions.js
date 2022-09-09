import {TableRow} from "@mui/material";
import Transaction from "./transaction";
import React from "react";

const Transactions = ({transactions}) => {

    return (
        <TableRow hover={true}>
            {transactions.map((transaction) => {
                return (
                    <React.Fragment key={transaction._id}>
                        <Transaction transaction={transaction}/>
                    </React.Fragment>
                )
            })}
        </TableRow>
    )
}

export default Transactions;
