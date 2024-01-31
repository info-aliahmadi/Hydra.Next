'use server';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import 'react';
import CONFIG from '/config';

export default async function Author({ author, date, readingTime }) {
  console.log(JSON.stringify(author) );
  return (
    <Box alignItems="center" display="flex">
      <Avatar sx={{ width: 50, height: 50 }} src={CONFIG.AVATAR_BASEPATH + author?.avatar} />
      <Box pl={2} justifyContent="center">
        <Typography variant="body1">{author?.name}</Typography>
        <Box display="flex">
          <Typography variant="body1" component="span" mr={2}>
            {date}
          </Typography>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body12" component="span" pl={1}>
            {readingTime} min read
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
