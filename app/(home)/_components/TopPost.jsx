'use server';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import 'react';
import Author from './Author';
import { DateTimeViewer } from '/utils/DateViewer';
import readingTime from '/utils/readingTime';
import CONFIG from '/config';

import Link from 'next/link';
import HomeService from '@(home)/_service/HomeService';
import truncate from 'lodash/truncate';

export default async function TopPost() {
  var homeService = new HomeService();

  const post = await homeService.getTopArticle();

  return (
    <Box className="bg-white">
      <Container maxWidth="xl">
        <Grid
          container
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          // pl={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
          // pr={{ xs: 3, sm: 10, md: 15, lg: 0, xl: 0 }}
        >
          <div className="post-card">
            <Grid container columnSpacing={7}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Stack>
                  <Typography variant="h5" pt={2}>
                    {post?.topics.map((category, index) => (
                      <Link key={category} href={`/blogcategory/${category}`} className="post-category">
                        {category}
                        {post?.topics.length - 1 == index ? '' : ' , '}
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
                  <Author
                    author={post?.writer}
                    date={DateTimeViewer(CONFIG.DEFAULT_LANGUAGE, post?.publishDate)}
                    readingTime={readingTime(post?.body)}
                  />
                </Stack>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
    </Box>
  );
}
