import * as React from 'react';
import { useState } from 'react';

// material-ui
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Box,
  Chip,
  Container,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger
} from '@mui/material';

// project import
import Logo from 'components/logo';

// assets
import { LineOutlined } from '@ant-design/icons';

// ==============================|| COMPONENTS - APP BAR ||============================== //

// elevation scroll
function ElevationScroll({ layout, children, window }: any) {
  const theme = useTheme();
  // const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window() : undefined
  });

  const backColorScroll = theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800];
  const backColor = layout !== 'landing' ? backColorScroll : 'transparent';

  return React.cloneElement(children, {
    style: {
      backgroundColor: trigger ? backColorScroll : backColor
    }
  });
}

interface Props {
  handleDrawerOpen?: () => void;
  layout?: string;
}

const Header = ({ handleDrawerOpen, layout = 'landing', ...others }: Props) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);

  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <ElevationScroll layout={layout} {...others}>
      <AppBar sx={{ bgcolor: 'transparent', color: theme.palette.text.primary, boxShadow: 'none' }}>
        <Container disableGutters={matchDownMd}>
          <Toolbar sx={{ px: { xs: 1.5, md: 0, lg: 0 }, py: 2 }}>
            <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
              <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
                <Logo reverse to="/" />
              </Typography>
            </Stack>
            <Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                display: { xs: 'flex', md: 'none' }
              }}
            >
              <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
                <Logo reverse to="/" />
              </Typography>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
                sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
              >
                <Box
                  sx={{
                    width: 'auto',
                    '& .MuiListItemIcon-root': {
                      fontSize: '1rem',
                      minWidth: 28
                    }
                  }}
                  role="presentation"
                  onClick={drawerToggler(false)}
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Link style={{ textDecoration: 'none' }} href="/login" target="_blank">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="/components-overview/buttons" target="_blank">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="All Components" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      href="https://github.com/codedthemes/mantis-free-react-admin-template"
                      target="_blank"
                    >
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Free Version" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="https://codedthemes.gitbook.io/mantis/" target="_blank">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Documentation" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="https://codedthemes.support-hub.io/" target="_blank">
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Support" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      href="https://mui.com/store/items/mantis-react-admin-dashboard-template/"
                      target="_blank"
                    >
                      <ListItemButton component="span">
                        <ListItemIcon>
                          <LineOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Purchase Now" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                        <Chip color="primary" label="v1.0" size="small" />
                      </ListItemButton>
                    </Link>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
