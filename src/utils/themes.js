import {createTheme} from "@mui/material";
import {red, grey} from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        primary: {main: '#285028'},
        secondary: {main: '#73b56f'},
        light: {
            secondary: 'rgba(6,254,52,0.15)',
            red: red[200],
            gray: grey[400]
        },
        action: {
            active: '#73b56f'
        },
        background: {
            paper: '#24252e',
            default: '#141416'
        },
        text: {
            primary: "#fefefe",
            secondary: "#777a8b"
        },
        divider: grey[400]
    },
    typography: {
        fontFamily: 'GoogleSans, Sora, Sofia, TTSquares, EuclidCircularB'
    },
    shape: {
        borderRadius: 8
    }
});

export const THEMES = {darkTheme};
