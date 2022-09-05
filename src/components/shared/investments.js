import {TableRow} from "@mui/material";
import Investment from "./investment";
import React from "react";

const Investments = ({investments}) => {

    return (
        <TableRow hover={true}>
            {investments.map((investment, index) => {
                return (
                    <React.Fragment key={investment._id}>
                        <Investment index={index} investment={investment}/>
                    </React.Fragment>
                )
            })}
        </TableRow>
    )
}

export default Investments;
