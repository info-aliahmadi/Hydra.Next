'use server';
import React from 'react';
import Content from './_components/Content';
import RelatedPosts from './_components/RelatedPosts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShareButtons from './_components/ShareButtons';
import Author from '@(home)/_components/Author';
import { DateTimeViewer } from 'utils/DateViewer';
import readingTime from 'utils/readingTime';
import CONFIG from 'config';
import Link from 'next/link';
import HomeService from '@(home)/_service/HomeService';
import Header from './_components/Header';

export default async function BlogPost({ params }) {
  var homeService = new HomeService();
  let postId = params.postId;
  const post = await homeService.getArticle(postId);

  return (
    <>
      <Header>
        <Typography variant="body2" pt={2} display="flex" alignItems="center">
          <Link href="/blog" className="link-body">
            Blog <ArrowForwardIosIcon fontSize="small" sx={{ padding: '0 2px', margin: '0 5px' }} />{' '}
          </Link>{' '}
          {post?.topics.map((category, index) => (
            <Link key={category.id} href={`/blogcategory/${category}`} className="link-body">
              {category}
              {post?.topics.length - 1 == index ? '' : ' , '}
            </Link>
          ))}
        </Typography>

        <Typography variant="h1" pt={3}>
          {post?.subject}
        </Typography>
        <Box pt={6} display="flex" justifyContent="space-between" alignItems="center">
          <Author
            author={post?.writer}
            date={DateTimeViewer(CONFIG.DEFAULT_LANGUAGE, post?.publishDate)}
            readingTime={readingTime(post?.body)}
          />
          <ShareButtons />
        </Box>
      </Header>
      <Content post={post} />
      <RelatedPosts postId={postId} />
    </>
  );
}
