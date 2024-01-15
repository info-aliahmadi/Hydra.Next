'use server';
import React from 'react';
import Content from '../../../_components/blogpost/Content';
import RelatedPosts from '../../../_components/blogpost/RelatedPosts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShareButtons from '../../../_components/blogpost/ShareButtons';
import Author from '@(home)/_components/Author';
import { DateTimeViewer } from '/utils/DateViewer';
import readingTime from '/utils/readingTime';
import CONFIG from '/config';
import Link from 'next/link';
import HomeService from '@(home)/_service/HomeService';
import Header from '../../../_components/blogpost/Header';
import truncate from 'lodash/truncate';

export async function generateMetadata({ params }, parent) {
  var homeService = new HomeService();
  let postId = params.postId;
  const post = await homeService.getArticle(postId);

  const desc = truncate(post?.body, {
    length: 250,
    seperator: '.'
  });

  const image = post?.previewImageUrl
    ? post?.previewImageUrl
    : post?.previewImageId
    ? CONFIG.UPLOAD_BASEPATH + post?.previewImage.directory + post?.previewImage.thumbnail
    : CONFIG.DOMAIN + '/images/onwave-presentation.png';

  const postUrl = CONFIG.DOMAIN + '/blogpost/' + post.id + '/' + post.subject;

  return {
    title: post.subject,
    keywords: post.tags,
    openGraph: {
      title: post.subject,
      description: desc,
      url: postUrl,
      siteName: 'OnWave Design',
      images: image,
      type: 'article'
    },
    twitter: {
      card: image,
      title: post.subject,
      description: desc,
      images: {
        url: image,
        alt: 'OnWave Design , where we create stunning websites'
      }
    }
  };
}

export default async function BlogPost({ params }) {
  var homeService = new HomeService();
  let postId = params.postId;
  const post = await homeService.getArticle(postId);

  return (
    <>
      <Header>
        <Typography variant="body2" pt={2} display="flex" alignItems="center">
          <Link href="/blog" className="link-body">
            Blog <ArrowForwardIosIcon fontSize="small" sx={{ padding: '0 2px', margin: '0 5px', verticalAlign : 'sub' }} />
          </Link>
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
        <Box pt={6} display="flex" flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row', xl: 'row' }} justifyContent='space-between' alignItems="center">
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
