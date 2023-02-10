export type ThemeDirection = 'ltr' | 'rtl';
export type ThemeMode = 'light' | 'dark';
export type FontFamily = `'Montserrat', sans-serif` | `'Roboto', sans-serif` | `'Public Sans', sans-serif`;
export type PresetColor = 'default' | 'theme1' | 'theme2';
export type I18n = 'en';

// ==============================|| CONFIG TYPES  ||============================== //

export type CustomizationActionProps = {
  type: string;
  payload?: CustomizationProps;
};

export type DefaultConfigProps = {
  defaultPath: string;
  fontFamily: FontFamily;
  i18n: I18n;
  miniDrawer: boolean;
  container: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
};

export type CustomizationProps = {
  defaultPath: string;
  fontFamily: FontFamily;
  i18n: I18n;
  miniDrawer: boolean;
  container: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
  onChangeContainer: VoidFunction;
  onChangeLocalization: (lang: I18n) => void;
  onChangeMode: (mode: ThemeMode) => void;
  onChangePresetColor: (theme: PresetColor) => void;
  onChangeDirection: (direction: ThemeDirection) => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeFontFamily: (fontFamily: FontFamily) => void;
};

export type DayPaymentPropsOption = {
  title: string;
  id: string;
};
