import {createTheme} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        primary: {main: '#5552FF'},
        secondary: {main: '#5552FF'},
        action: {
            active: '#5552FF'
        },
        background: {
            paper: '#24252e',
            default: '#141416'
        },
        text: {
            primary: "#fefefe",
            secondary: "#777a8b"
        },
        divider: '#fefefe'
    },
    typography: {
        fontFamily: 'Sora'
    },
    shape: {
        borderRadius: 8
    }
});

export const THEMES = {darkTheme};
