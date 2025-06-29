import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Container, Toolbar } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import useConfig from 'hooks/useConfig';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

// types
import { RootStateProps } from 'types/root';
import { openDrawer } from 'store/reducers/menu';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));

  const { container, miniDrawer } = useConfig();
  const dispatch = useDispatch();

  const menu = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen } = menu;

  // drawer toggler

  const [open, setOpen] = useState(!miniDrawer || drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      setOpen(!matchDownLG);
      dispatch(openDrawer({ drawerOpen: !matchDownLG }));
    }
  }, [dispatch, matchDownLG, miniDrawer]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
  }, [drawerOpen, open]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        {container && (
          <Container
            maxWidth="lg"
            sx={{ px: { xs: 0, sm: 2 }, position: 'relative', minHeight: 'calc(100vh - 110px)', display: 'flex', flexDirection: 'column' }}
          >
            <Breadcrumbs navigation={navigation} title card={false} divider={false} />
            <Outlet />
          </Container>
        )}
        {!container && (
          <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 110px)', display: 'flex', flexDirection: 'column' }}>
            <Breadcrumbs navigation={navigation} title card={false} divider={false} />
            <Outlet />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MainLayout;
