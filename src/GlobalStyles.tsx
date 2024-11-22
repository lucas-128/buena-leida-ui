import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --a-color: rgb(116,82,108);
    --b-color: rgb(105,73,102);
    --c-color: rgb(219,208,83);
    --d-color: rgb(200,153,51);
    --e-color: rgb(247,247,248)
    --f-color: rgb(239,239,239)
    --g-color: rgb(154, 112, 149);
    --im-black: black;
    --im-white: white;
  }

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    color: var(--im-black);
    background-color: rgb(239,239,239);
    overflow-y: scroll;
  }
`;

export default GlobalStyle;
