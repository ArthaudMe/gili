import {createTheme} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        primary: {main: '#fefefe'},
        secondary: {main: '#fefefe'},
        action: {
            active: '#fefefe'
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
        fontFamily: 'GoogleSans, Sora'
    },
    shape: {
        borderRadius: 8
    }
});

export const THEMES = {darkTheme};
