import {TableRow} from "@mui/material";
import Admin from "./admin";
import React from "react";

const Admins = ({admins}) => {

    return (
        <TableRow hover={true}>
            {admins.map((admin, index) => {
                return (
                    <React.Fragment key={admin._id}>
                        <Admin index={index} admin={admin}/>
                    </React.Fragment>
                )
            })}
        </TableRow>
    )
}

export default Admins;
