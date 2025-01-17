import Typography from '@mui/material/Typography';

interface CurrencyProps {
  readonly value: number;
  readonly currency: 'USD' | 'EUR' | 'GBP' | 'Rial';
}

export default function Currency({ value, currency }: CurrencyProps) {
  let result;

  let dollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  let euro = Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR' });
  let pounds = Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
  let rial = new Intl.NumberFormat('en-US');

  switch (currency) {
    case 'USD': {
      result = dollar.format(value);
      break;
    }
    case 'EUR': {
      result = euro.format(value);
      break;
    }
    case 'GBP': {
      result = pounds.format(value);
      break;
    }
    case 'Rial': {
      result = `IRR${rial.format(value)}`;
      break;
    }
  }
  return (
      <Typography>{result}</Typography>
  );
}
