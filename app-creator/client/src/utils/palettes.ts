import { Palette } from '../redux/types/enums';

type PaletteMap = {
  [key in Palette]: {
    backgroundColor: string;
    color: string;
    map: string;
  };
};

export const palette: PaletteMap = {
  light: {
    backgroundColor: 'white',
    color: 'black',
    map: 'standard',
  },
  silver: {
    backgroundColor: 'white',
    color: 'black',
    map: 'silver',
  },
  dark: {
    backgroundColor: 'black',
    color: 'white',
    map: 'dark',
  },
  night: {
    backgroundColor: '#17263C',
    color: 'white',
    map: 'night',
  },
  retro: {
    backgroundColor: '#DFD2AE',
    color: 'black',
    map: 'retro',
  },
  aubergine: {
    backgroundColor: '#0E1626',
    color: 'white',
    map: 'aubergine',
  },
};
