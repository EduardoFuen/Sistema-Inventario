// material-ui
import { Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SUMMARY ORDER ||============================== //
interface Value {
  Total: number;
  SubTotal: number;
  Tax: number;
  SubtotalWithDiscount: number;
  DiscountGlobal: number;
  Montodelivery: number;
}

interface Props {
  data: Value;
}

const SummaryTemplate = ({ data }: Props) => (
  <MainCard>
    <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
      <Typography variant="subtitle1">Delivery: $ {data?.Montodelivery || 0}</Typography>
    </Stack>

    <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
      <Typography variant="subtitle1">Total: $ {data?.Total || 0}</Typography>
    </Stack>
  </MainCard>
);

export default SummaryTemplate;
