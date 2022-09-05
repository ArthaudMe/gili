import {TableCell} from "@mui/material";
import React from "react";

const Admin = ({admin, index}) => {

    const calculateHolding = admin => {
        return 50
    }

    return (
        <React.Fragment>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{admin.address}</TableCell>
            <TableCell>{calculateHolding(admin)}%</TableCell>
        </React.Fragment>
    )
}

export default Admin;
