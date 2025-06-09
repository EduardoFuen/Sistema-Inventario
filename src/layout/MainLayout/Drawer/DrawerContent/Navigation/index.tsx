import { useSelector } from 'react-redux';
import useAuth from 'hooks/useAuth';
// material-ui
import { Box, Typography } from '@mui/material';

// types
import { RootStateProps } from 'types/root';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const menu = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen } = menu;
  //rol 1 secretaria, rol 2 asistente, rol3
  const { user } = useAuth();
  console.log(user)
  if(user?.role == "1"){
    const navGroups = menuItem.items2.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Fix - Navigation Group
            </Typography>
          );
      }
    });
    return <Box sx={{ pt: drawerOpen ? 2 : 0, '& > ul:first-of-type': { mt: 0 } }}>{navGroups}</Box>;
  }else if(user?.role == "2"){
    const navGroups = menuItem.items.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Fix - Navigation Group
            </Typography>
          );
      }
    });
    return <Box sx={{ pt: drawerOpen ? 2 : 0, '& > ul:first-of-type': { mt: 0 } }}>{navGroups}</Box>;
  }else{
    const navGroups = menuItem.items3.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Fix - Navigation Group
            </Typography>
          );
      }
    });
    return <Box sx={{ pt: drawerOpen ? 2 : 0, '& > ul:first-of-type': { mt: 0 } }}>{navGroups}</Box>;
  }

};

export default Navigation;
