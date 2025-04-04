// styles/GlobalStyles.js
"use client"; // Client-side for Styled Components

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f0f2f5;
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;