import {Box} from "@mui/material";
import React from "react";
import background from "./../../assets/images/landing-background.png";

const Layout = ({children}) => {
    return (
        <Box
            sx={{
                maxHeight: '100vh', height: '100vh', overflowY: 'hidden',
                backgroundImage: `url(${background})`,
                backgroundAttachment: 'fixed',
                backgroundColor: 'background.default',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundBlendMode: 'lighten',
                backgroundSize: 'cover'
            }}>
            <Box>{children}</Box>
        </Box>
    )
}

export default Layout;
