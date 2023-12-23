import 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function PostTags({ tags }) {
  return (
    <Box>
      {tags?.map((tag, index) => (
        <Button key={'tag-' + index} href={'/blogtag/' + tag} variant="contained" color="info">
          {tag}
        </Button>
      ))}
    </Box>
  );
}
