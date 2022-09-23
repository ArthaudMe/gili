import {TableCell} from "@mui/material";
import React from "react";

const Member = ({member}) => {

    return (
        <React.Fragment>
            <TableCell>{member.address}</TableCell>
            <TableCell align="center">{member.holding}</TableCell>
        </React.Fragment>
    )
}

export default Member;
