import {Box} from "@mui/material";
import Header from "../headers/header";
import React from "react";

const Layout = ({children}) => {
    return (
        <Box sx={{minHeight: '100vh', backgroundColor: 'background.default'}}>
            <Box sx={{pb: 7}}><Header/></Box>
            <Box>{children}</Box>
        </Box>
    )
}

export default Layout;
