import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { DeleteFilled } from '@ant-design/icons';
import Avatar from 'components/@extended/Avatar';

interface Props {
  title: string;
  open: boolean;
  handleClose: (status: boolean) => void;
}

export default function AlertDelete({ title, open, handleClose }: Props) {
  return (
    <Dialog open={open} onClose={() => handleClose(false)} keepMounted maxWidth="xs" aria-labelledby="item-delete-title" aria-describedby="item-delete-description">
      <DialogContent sx={{ mt: 2, viewPort: 'center' }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <DeleteFilled />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
               ¿Estás seguro de que quieres eliminar?
            </Typography>
            <Typography align="center">
              Al eliminar
              <Typography variant="subtitle1" component="span">
                {" "}
                "{title}"{" "}
              </Typography>
              no podrás recuperar los datos.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
              Cancelar
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={() => handleClose(true)} autoFocus>
              Eliminar
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}