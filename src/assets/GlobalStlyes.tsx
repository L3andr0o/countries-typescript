import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Nunito Sans';
        list-style: none;
    }
    body{
        height: 100vh;
    }
`

export default GlobalStyles;