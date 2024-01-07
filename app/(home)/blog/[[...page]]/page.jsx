'use server';
import React from 'react';
import TopPost from '@(home)/_components/TopPost';
import Category from '@(home)/_components/Category';
import Posts from '@(home)/_components/Posts';
import BottomPost from '@(home)/_components/BottomPost';
import PageHeader from '@(home)/_components/PageHeader';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import HomeService from '@(home)/_service/HomeService';
import PostPagination from '../../_components/PostPagination';

export async function generateMetadata() {
  var homeService = new HomeService();

  const categories = await homeService.getCategories();
  const cates = categories.map((cat) => cat.title);

  return {
    title: 'Blog',
    keywords: cates
  };
}

export default async function Blog({ params }) {
  var homeService = new HomeService();

  let page = params.page;
  page = page > 0 ? parseInt(page) : 1;

  const blogPost = await homeService.getArticles('', '', '', page, 0);

  return (
    <>
      <PageHeader title="Blog" description={'At OnWave Design, we specialize in designing'} />
      <TopPost />
      <Category />
      <Posts blogPost={blogPost?.items} />
      <Box className="bg-white">
        <Container maxWidth="xl">
          <Grid container pt={10} justifyContent="center">
            <PostPagination url="/blog/" totalPages={blogPost?.totalPages} page={page} />
          </Grid>
        </Container>
      </Box>
      <BottomPost />
    </>
  );
}
