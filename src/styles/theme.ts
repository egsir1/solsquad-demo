import { DefaultTheme } from "styled-components/dist/types";

export const Theme: DefaultTheme = {
  color: {
    side_bar_color: "#081028",
    box_color: '#0B1739',
    row_color: '#0A1330',
    span_color: '#AEB9E1',
    header_color: '#FFF',
    pink_color: '#CB3CFF',
    light_orange_color: '#FDB52A',
    light_green_color: '#05C168',
    ligth_pink_color: '#CB3CFF',
    btn_gradient: 'linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)',
    border_color: '#343B4F',
    active:'#805ad5',
    form: {
      background: "#0B1739", // Using box_color for form background
      text: "#AEB9E1",      // Using span_color for text
      border: "#343B4F",    // Using border_color
      accent: "#CB3CFF",    // Using pink_color for accents
    },
  },
    fonts: {
        mona_sans: 'Mona Sans',
    },
    // Adding missing properties for consistency
  typography: {
    fontFamily: "'Mona Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: {
      base: "16px",
      heading: "24px",
      small: "14px",
    },
  },
  spacing: {
    small: "10px",
    medium: "20px",
    large: "40px",
  },
  shadows: {
    card: "0 4px 30px rgba(0, 0, 0, 0.3)",
    glow: "0 0 10px rgba(203, 60, 255, 0.5)", // Using pink_color for glow
  },
  borderRadius: "12px",
  tabBorderRadius: "20px",
};
