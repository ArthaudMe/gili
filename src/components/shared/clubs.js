import {TableRow} from "@mui/material";
import Club from "./club";
import React from "react";

const Clubs = ({clubs}) => {

    return (
        <TableRow hover={true}>
            {clubs.map(club => {
                return (
                    <React.Fragment key={club._id}>
                        <Club club={club}/>
                    </React.Fragment>
                )
            })}
        </TableRow>
    )
}

export default Clubs;
