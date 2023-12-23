'use server'
import React from 'react';
import BottomPost from '@(home)/_components/BottomPost';
import Category from '@(home)/_components/Category';
import Posts from '@(home)/_components/Posts';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import HomeService from '@(home)/_service/HomeService';
import PostPagination from '@(home)/_components/PostPagination';
import PageHeader from '@(home)/_components/PageHeader';

export default async function BlogCategory({params}) {

  let page = params.page;
  page = page > 0 ? parseInt(page) : 1;

  let category = decodeURIComponent(params.category);
  // if (category == null || category == '' || category == undefined) navigate('/blog');

  var homeService = new HomeService();
  const blogPost = await homeService.getArticles('', category, '', page, 0);

  return (
    <>
      <PageHeader title="Posts By Category" description={'At OnWave Design, we specialize in designing'} />
      <Category currentCategory={category} />
      <Posts blogPost={blogPost?.items} />
      <Box className="bg-white">
        <Container maxWidth="xl">
          <Grid container pt={10} justifyContent="center">
            <PostPagination url={`/blogcategory/${category}/`} count={blogPost?.totalPages} page={page}/>
          </Grid>
        </Container>
      </Box>
      <BottomPost />
    </>
  );
}
