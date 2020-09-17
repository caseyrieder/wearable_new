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
      pink: '#F2059F',
      red: '#A60311',
      green: '#2DA61B',
      blue: '#031CA6',
    },
  },
};
export const otherColors = {
  pink: '#F2059F',
  red: '#A60311',
  green: '#2DA61B',
  blue: '#031CA6',
};

export const { height, width } = Dimensions.get('window');
