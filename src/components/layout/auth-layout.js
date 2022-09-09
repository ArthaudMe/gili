import {Box, SwipeableDrawer, Typography} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, openDrawer, selectUI} from "../../redux/features/ui/ui-slice";
import React from "react";

const AuthLayout = ({children}) => {
    const dispatch = useDispatch();
    const {drawerOpen} = useSelector(selectUI);
    return (
        <Box sx={{minHeight: '100vh'}}>
            <Box sx={{display: 'flex', position: 'relative'}}>
                <Box
                    sx={{
                        display: {xs: 'none', lg: 'block'},
                        flexBasis: {xs: '0%', lg: '16%'}, backgroundColor: 'background.paper'
                    }}>
                    <Sidebar/>
                </Box>
                <Box
                    sx={{
                        flexBasis: {xs: '100%', lg: '84%'},
                        maxHeight: '100vh', height: '100vh', overflowY: 'scroll',
                        backgroundImage: 'linear-gradient(93.37deg, #030B2B 2.41%, #270A64 94.3%)',
                        backgroundAttachment: 'fixed',
                        backgroundColor: 'background.default',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'lighten',
                        backgroundSize: 'cover'
                    }}>
                    {children}
                </Box>
                <Box sx={{display: {xs: 'none', lg: 'block'}, position: 'absolute', right: 0, bottom: 0, padding: 2}}>
                    <Typography
                        variant="h2"
                        sx={{color: 'text.primary', mb: 1, textAlign: 'right'}}>gili</Typography>
                    <Typography
                        variant="body2"
                        sx={{color: 'text.primary', textTransform: 'uppercase', textAlign: 'right'}}>
                        invest together
                    </Typography>
                </Box>
            </Box>
            <SwipeableDrawer
                onClose={() => dispatch(closeDrawer())}
                open={drawerOpen}
                onOpen={() => dispatch(openDrawer())}>
                <Sidebar/>
            </SwipeableDrawer>
        </Box>
    )
}

export default AuthLayout;
