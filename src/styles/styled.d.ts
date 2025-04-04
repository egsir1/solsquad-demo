// styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color:{
      side_bar_color:string;
      box_color:string;
      row_color:string;
      span_color:string;
      header_color:string;
      pink_color:string;
      light_orange_color:string;
      light_green_color:string;
      ligth_pink_color:string;
      btn_gradient:string;
      border_color:string;
      active:string;
    },
    fonts:{
      mona_sans:string;
    }
  }
}