import { Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';



// ==============================|| SUMMARY ORDER ||============================== //
interface Value {
  Total: number;
  MontoBCV: number;
  dolar: number;
  SubTotal: number;
  Tax: number;
  SubtotalWithDiscount: number;
  DiscountGlobal: number;
  Montodelivery: number;
}

interface Props {
  data: Value;
}
const formatNumber = (value: string | number | undefined) => {
    const num = Number(value);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  const formatNumberBCV = (value: string | number | undefined, bcv: string | number | undefined) => {
    const num = Number(value) * Number(bcv);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

const SummaryTemplate2 = ({ data }: Props) => (
  <MainCard>
    <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
      <Typography variant="subtitle1">Delivery: $ {data?.Montodelivery || 0}</Typography>
    </Stack>

    <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
      <Typography variant="subtitle1">Total: $ {formatNumber(data?.Total)}</Typography>
    </Stack>

    <Stack direction="row" spacing={2} justifyContent="end" alignItems="rigth" sx={{ mt: 1 }}>
      <Typography variant="subtitle1">Total: Bs {formatNumberBCV(data?.Total,data?.dolar)}</Typography>
    </Stack>
  </MainCard>
);

export default SummaryTemplate2;