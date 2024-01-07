'use server';
import React from 'react';
import HomeService from '@(home)/_service/HomeService';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tags from '../../../_components/blogtag/Tags';
import Posts from '@(home)/_components/Posts';
import BottomPost from '@(home)/_components/BottomPost';
import PostPagination from '@(home)/_components/PostPagination';
import PageHeader from '@(home)/_components/PageHeader';

export default async function BlogTag({ params }) {

  let page = params.page;
  page = page > 0 ? parseInt(page) : 1;

  let tag = decodeURIComponent(params.tag);
  // if (tag == null || tag == '' || tag == undefined) navigate('/blog');

  var homeService = new HomeService();
  const blogPost = await homeService.getArticles('', '', tag, page, 0);


  return (
    <>
      <PageHeader title="Posts By Tag" description={'At OnWave Design, we specialize in designing'} />
      <Tags currentTag={tag} />
      <Posts blogPost={blogPost?.items} />
      <Box className="bg-white">
        <Container maxWidth="xl">
          <Grid container pt={10} justifyContent="center">
            <PostPagination url={`/blogtag/${tag}/`} count={blogPost?.totalPages} page={page} size="large" />
          </Grid>
        </Container>
      </Box>
      <BottomPost />
    </>
  );
}
