'use server';
import HomeService from '@(home)/_service/HomeService';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'react';
import Link from 'next/link';

export default async function Category({ currentCategory }) {
  var homeService = new HomeService();
  const categories = await homeService.getCategories();

  return (
    <Box className="bg-white">
      <Container maxWidth="xl">
        <Grid container>
          <Box className="category" m={5} ml={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }} mr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}>
            <Link href={'/blog'}>View all</Link>
            {categories?.map((category, index) => (
              <Link
                key={category.id}
                href={category?.title == currentCategory ? '#' : `/blogcategory/${category?.title}`}
                className={currentCategory === category?.title ? 'active' : ''}
                scroll={false}
              >
                {category?.title}
              </Link>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
