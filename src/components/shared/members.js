import {TableRow} from "@mui/material";
import Member from "./member";
import React from "react";

const Members = ({members}) => {

    return (
        <TableRow hover={true}>
            {members.map(member => {
                return (
                    <React.Fragment key={member._id}>
                        <Member member={member}/>
                    </React.Fragment>
                )
            })}
        </TableRow>
    )
}

export default Members;
