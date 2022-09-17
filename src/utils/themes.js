import {createTheme} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        primary: {main: '#ffffff'},
        secondary: {main: '#6052FF'},
        action: {
            active: '#6052FF'
        },
        background: {
            paper: '#24252e',
            default: '#141416'
        },
        text: {
            primary: "#ffffff",
            secondary: "#ffffff"
        },
        divider: '#ffffff'
    },
    typography: {
        fontFamily: 'Inter'
    },
    shape: {
        borderRadius: 8
    }
});

export const THEMES = {darkTheme};
