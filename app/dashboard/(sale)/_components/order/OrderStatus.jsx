import Dot from '@dashboard/_components/@extended/Dot';
import Typography from '@mui/material/Typography';

export default function OrderStatus({ status }) {
  let color = 'primary';
  let title = 'None';

  switch (status) {
    case 1:
      color = 'warning';
      title = 'Pending';
      break;
    case 2:
      color = 'primary';
      title = 'Processing';
      break;
    case 3:
      color = 'success';
      title = 'Complete';
      break;
    case 4:
      color = 'error';
      title = 'Cancelled';
      break;
  }

  return (
    <>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </>
  );
}
