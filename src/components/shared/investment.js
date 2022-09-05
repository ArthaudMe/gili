import {TableCell} from "@mui/material";
import React from "react";

const Investment = ({investment, index}) => {

    return (
        <React.Fragment>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{investment.investment}</TableCell>
            <TableCell>{investment.type}</TableCell>
            <TableCell>{investment.value}</TableCell>
        </React.Fragment>
    )
}

export default Investment;
