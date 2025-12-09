// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 *
 */

// ==============================|| LOGO ICON SVG ||============================== //
import logoIconDark from 'assets/images/icons/fina2.png';
import logoIcon from 'assets/images/icons/fina2.png';
const LogoIcon = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === 'dark' ? logoIconDark : logoIcon} alt="Mantis" width="100" />
     *
     */
    <img src={theme.palette.mode === 'dark' ? logoIconDark : logoIcon} alt="Mantis" width="50" />
    
  );
};

export default LogoIcon;
