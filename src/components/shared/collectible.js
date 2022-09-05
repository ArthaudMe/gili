import {TableCell} from "@mui/material";
import React from "react";


const Collectible = ({collectible, index}) => {

    return (
        <React.Fragment>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{collectible.nft}</TableCell>
            <TableCell>{collectible.value}</TableCell>
        </React.Fragment>
    )
}

export default Collectible;
