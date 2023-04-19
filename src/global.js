import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }


    body {
        display: flex;
        height: 100vh;
        justify-content: center;
        background-color: #fff;
        color: #111;
        margin: 0 auto;
        font-family: 'Open Sans', sans-serif;
    }

    :root {
        --cor-1:#FFFFFF
        --cor-2:#616161
        --cor3:#444444
        --cor4:#333333
        --cor5:#202020
        --cor6: #111111
    }
`;
