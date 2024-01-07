'use server';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import 'react';
import Author from './Author';
import truncate from 'lodash/truncate';
import readingTime from '/utils/readingTime';
import { DateTimeViewer } from '/utils/DateViewer';
import Link from 'next/link';
import CONFIG from '/config';

function Post({ post }) {
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <div className="post-card">
        <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="box">
              <img
                alt=""
                src={
                  post?.previewImageUrl
                    ? post?.previewImageUrl
                    : post?.previewImageId
                    ? CONFIG.UPLOAD_BASEPATH + post?.previewImage.directory + post?.previewImage.thumbnail
                    : '/images/unavailable.png'
                }
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack>
              <Typography variant="h5" pt={2}>
                {post?.topics.map((category, index) => (
                  <Link key={category} href={`/blogcategory/${category}`} className="post-category">
                    {category}
                    {post?.topics.length - 1 == index ? '' : ', '}
                  </Link>
                ))}
              </Typography>
              <Link href={`/blogpost/${post?.id}/${post?.subject}`} className="post-title">
                <Typography variant="h3" pt={2}>
                  {post?.subject}
                </Typography>
              </Link>
              <Box
                pt={2}
                pb={2}
                dangerouslySetInnerHTML={{
                  __html: truncate(post?.body, {
                    length: 250,
                    seperator: '.'
                  })
                }}
              ></Box>
            </Stack>
          </Grid>
        </Grid>
        <Author
          author={post?.writer}
          date={DateTimeViewer(CONFIG.DEFAULT_LANGUAGE, post?.publishDate)}
          readingTime={readingTime(post?.body)}
        />
      </div>
    </Grid>
  );
}
export default async function Posts({ blogPost }) {
  return (
    <Box className="bg-white">
      <Container maxWidth="xl">
        <Grid
          container
          pt={1}
          spacing={{ xs: 5, sm: 5, md: 5, lg: 6, xl: 6 }}
          pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
          pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
        >
          {blogPost?.map((post, index) => (
            <Post key={post.id} post={post} />
          ))}
          {blogPost?.length == 0 && (
            <Container justifyContent="center" sx={{ paddingTop: '20px' }}>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                <strong> There is no data to display </strong>
              </Alert>
            </Container>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
