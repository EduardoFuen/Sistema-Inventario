// material-ui
import { Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SUMMARY ORDER ||============================== //

const SummaryTemplate = ({ data }: any) => (
  <MainCard>
    <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 6 }}>
      <Typography variant="subtitle1">Subtotal: $ {data?.SubTotal || 0}</Typography>
    </Stack>
    {data.DiscountGlobal !== 0 && (
      <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Descuento: $ {data?.DiscountGlobal || 0}</Typography>
      </Stack>
    )}
    {data.SubtotalWithDiscount !== 0 && (
      <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Subtotal con descuento: $ {data?.SubtotalWithDiscount || 0}</Typography>
      </Stack>
    )}
    {data.Tax !== 0 && (
      <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
        <Typography variant="subtitle1">IVA: $ {data?.Tax || 0}</Typography>
      </Stack>
    )}
    <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
      <Typography variant="subtitle1">Total: $ {data?.Total || 0}</Typography>
    </Stack>
  </MainCard>
);

export default SummaryTemplate;
