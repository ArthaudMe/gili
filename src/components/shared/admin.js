import {TableCell} from "@mui/material";
import React from "react";

const Admin = ({admin}) => {

    const calculateHolding = admin => {
        return 50
    }

    return (
        <React.Fragment>
            <TableCell>{admin.address}</TableCell>
            <TableCell>{calculateHolding(admin)}%</TableCell>
        </React.Fragment>
    )
}

export default Admin;
