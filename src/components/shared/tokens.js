import {TableRow} from "@mui/material";
import Token from "./token";
import React from "react";

const Tokens = ({tokens}) => {

    return (
        <TableRow hover={true}>
            {tokens?.map((token, index) => {
                return (<Token index={index} key={token._id} token={token}/>)
            })}
        </TableRow>
    )
}

export default Tokens;
