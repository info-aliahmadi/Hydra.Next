import { Chip } from '@mui/material';

export default function PaymentStatus({ status, id }) {
  let label = 'primary';
  switch (id) {
    case 1:
      label = 'secondary'; //Pending
      break;
    case 2:
      label = 'warning'; //Authorized
      break;
    case 3:
      label = 'success'; //Paid
      break;
    case 4:
      label = 'primary'; //PartiallyRefunded
      break;
    case 5:
      label = 'primary'; //Refunded
      break;
    case 6:
      label = 'error'; //Voided
      break;
  }

  return (
    <>
      <Chip label={status} color={label} variant="outlined" />
    </>
  );
}
