import {TableCell} from "@mui/material";
import React from "react";


const Collectible = ({collectible}) => {

    return (
        <React.Fragment>
            <TableCell>{collectible.nft}</TableCell>
            <TableCell>{collectible.value}</TableCell>
        </React.Fragment>
    )
}

export default Collectible;
