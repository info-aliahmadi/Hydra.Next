import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

export default function OrderUserAvatar({ value }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <Avatar alt="" src={'/images/users/anonymous.png'} sx={{ width: 50, height: 50 }}></Avatar>
      <span>{value}</span>
    </Box>
  );
}
