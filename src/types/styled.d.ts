// import original module declarations
import 'styled-components';

interface IThemeColors {
  main: string;
  light: string;
  dark: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: IThemeColors;
      grey: IThemeColors;
      black: IThemeColors;
      accent: IThemeColors;
    };
  }
}

// export default interface ThemeInterface {
//   colors: {
//     primary: IThemeColors;
//     secondary: IThemeColors;
//     neutral: IThemeColors;
//   };
// }
