import {TableRow} from "@mui/material";
import Collectible from "./collectible";
import React from "react";

const Collectibles = ({collectibles}) => {

    return (
        <TableRow hover={true}>
            {collectibles.map((collectible, index) => {
                return (
                    <React.Fragment key={collectible._id}>
                        <Collectible index={index} collectible={collectible}/>
                    </React.Fragment>
                )
            })}
        </TableRow>
    )
}

export default Collectibles;
