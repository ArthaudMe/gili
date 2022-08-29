import {AppBar, Box} from "@mui/material";
import Desktop from "./desktop";
import Mobile from "./mobile";
import React from "react";

const Header = () => {

    return (
        <AppBar
            color="transparent"
            variant="elevation"
            elevation={0}
            square={true}>
            <Box sx={{display: {xs: 'none', lg: 'block'}}}>
                <Desktop/>
            </Box>
            <Box sx={{display: {xs: 'block', lg: 'none'}}}>
                <Mobile/>
            </Box>
        </AppBar>
    )
}

export default Header;
