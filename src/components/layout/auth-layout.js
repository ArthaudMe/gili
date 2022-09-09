import {Box, SwipeableDrawer, Typography} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, openDrawer, selectUI} from "../../redux/features/ui/ui-slice";
import React from "react";
import background from "./../../assets/images/blur-background.png";

const AuthLayout = ({children}) => {
    const dispatch = useDispatch();
    const {drawerOpen} = useSelector(selectUI);
    return (
        <Box sx={{minHeight: '100vh'}}>
            <Box sx={{position: 'relative'}}>
                <Box
                    sx={{
                        maxHeight: '100vh', height: '100vh', overflowY: 'scroll',
                        backgroundImage: `url(${background})`,
                        backgroundAttachment: 'fixed',
                        backgroundColor: 'background.default',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'lighten',
                        backgroundSize: 'cover'
                    }}>
                    {children}
                </Box>
                <Box sx={{display: {xs: 'none', lg: 'block'}, position: 'absolute', right: 8, bottom: 8, padding: 4}}>
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
