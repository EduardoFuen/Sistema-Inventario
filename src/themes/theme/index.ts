// project import
import Default from './default';
import Theme1 from './theme1';
import Theme2 from './theme2';

// types
import { PaletteThemeProps } from 'types/theme';
import { PalettesProps } from '@ant-design/colors';
import { ThemeMode, PresetColor } from 'types/config';

// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

const Theme = (colors: PalettesProps, presetColor: PresetColor, mode: ThemeMode): PaletteThemeProps => {
  switch (presetColor) {
    case 'theme1':
      return Theme1(colors, mode);
    case 'theme2':
      return Theme2(colors, mode);
    default:
      return Default(colors);
  }
};

export default Theme;
