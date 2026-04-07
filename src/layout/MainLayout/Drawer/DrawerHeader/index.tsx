// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';

// ==============================|| DRAWER HEADER ||============================== //

interface Props {
  open: boolean;
}

const DrawerHeader = ({ open }: Props) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open} sx={{ minHeight: open ? 120 : 60, py: open ? 2 : 1 }}>
      <Logo isIcon={!open} sx={{ width: open ? '100%' : 35, display: 'flex', justifyContent: open ? 'center' : 'center' }} />
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;