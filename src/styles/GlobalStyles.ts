// styles/GlobalStyles.js
'use client'; // Client-side for Styled Components

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Mona Sans';
    src: url('/fonts/MonaSans-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Mona Sans';
    src: url('/fonts/MonaSans-Bold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Mona Sans';
    src: url('/fonts/MonaSans-ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Mona Sans';
    src: url('/fonts/MonaSans-SemiBold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.mona_sans};
    background-color: ${({ theme }) => theme.color.side_bar_color};
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
