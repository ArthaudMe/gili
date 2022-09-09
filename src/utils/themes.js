import {createTheme} from "@mui/material";
import {grey} from "@mui/material/colors";

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
        fontFamily: 'Sora, Sofia, TTSquares, EuclidCircularB'
    },
    shape: {
        borderRadius: 8
    }
});

export const THEMES = {darkTheme};
