import { Dimensions } from 'react-native';
import { DefaultTheme } from 'styled-components';

interface TelekomTheme {
  colors: {
    primary: DefaultTheme['colors']['primary'];
    grey: DefaultTheme['colors']['grey'];
    black: DefaultTheme['colors']['black'];
    accent: {
      main: string;
      light: string;
      dark: string;
    };
    misc: {
      pink: string;
      red: string;
      green: string;
      blue: string;
      hyperlink: string;
    };
  };
}

export const theme: TelekomTheme = {
  colors: {
    primary: {
      main: '#beb3e5',
      light: '#f1e5ff',
      dark: '#8d83b3',
    },
    grey: {
      main: '#d7dad8',
      light: '#ffffff',
      dark: '#a4a7a6',
    },
    black: {
      main: '#1a1a1a',
      light: '#f2f2f2',
      dark: '#1a1a1a',
    },
    accent: {
      main: '#81f7fd',
      light: '#00ffff',
      dark: '#a3ccccd6',
    },
    misc: {
      pink: '#EC008C',
      red: '#ff0000',
      green: '#00ff00',
      blue: '#0000ff',
      hyperlink: '#147efb',
    },
  },
};
export const otherColors = {
  pink: '#EC008C',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  hyperlink: '#147efb',
};

export const { height, width } = Dimensions.get('window');
