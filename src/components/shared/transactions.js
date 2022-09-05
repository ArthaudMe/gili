import {TableRow} from "@mui/material";
import Transaction from "./transaction";
import React from "react";

const Transactions = ({transactions}) => {

    return (
        <TableRow hover={true}>
            {transactions.map((transaction, index) => {
                return (
                    <React.Fragment key={transaction._id}>
                        <Transaction index={index} transaction={transaction}/>
                    </React.Fragment>
                )
            })}
        </TableRow>
    )
}

export default Transactions;
