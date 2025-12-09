import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Stack, Typography } from '@mui/material';

const Footer = () => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
    <Typography variant="caption">&copy; Todos los derechos reservados</Typography>
    <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
      <Link component={RouterLink} to="#" target="_blank" variant="caption" color="textPrimary">
        Sobre nosotros
      </Link>
      <Link component={RouterLink} to="#" target="_blank" variant="caption" color="textPrimary">
        Privacidad
      </Link>
      <Link component={RouterLink} to="#" target="_blank" variant="caption" color="textPrimary">
        Términos
      </Link>
    </Stack>
  </Stack>
);

export default Footer;
