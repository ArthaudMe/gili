import {TableCell} from "@mui/material";
import React from "react";

const Admin = ({admin}) => {

    return (
        <React.Fragment>
            <TableCell>{admin.address}</TableCell>
            <TableCell align="center">{admin.ownership}%</TableCell>
        </React.Fragment>
    )
}

export default Admin;
