'use server'
import HomeService from '@(home)/_service/HomeService';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'react';
import Link from 'next/link';

export default async function Tags({ currentTag }) {
  const homeService = new HomeService();
  const tags = await homeService.getTags();

  return (
    <Box className="bg-white" pt={{ xs: 10, sm: 10, md: 0, lg: 0, xl: 0 }}>
      <Container maxWidth="xl">
        <Grid container>
          <Box className="tag" p={5} pl={{ xs: 5, sm: 5, md: 15, lg: 0, xl: 0 }} pr={{ xs: 5, sm: 5, md: 5, lg: 0, xl: 0 }}>
            {tags?.map((tag, index) => (
              <Link
                key={tag.id}
                href={tag?.title == currentTag ? '#' : `/blogtag/${tag?.title}`}
                className={tag?.title == currentTag ? 'active' : ''}
                scroll={false}
              >
                {tag?.title}
              </Link>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
