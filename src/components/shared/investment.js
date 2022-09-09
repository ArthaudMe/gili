import {TableCell} from "@mui/material";
import React from "react";

const Investment = ({investment}) => {

    return (
        <React.Fragment>
            <TableCell>{investment.investment}</TableCell>
            <TableCell>{investment.type}</TableCell>
            <TableCell>{investment.value}</TableCell>
        </React.Fragment>
    )
}

export default Investment;
