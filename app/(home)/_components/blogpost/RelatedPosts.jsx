'use server';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'react';
import CONFIG from '/config';
import { DateTimeViewer } from '/utils/DateViewer';
import readingTime from '/utils/readingTime';
import Author from '@(home)/_components/Author';
import HomeService from '@(home)/_service/HomeService';
import truncate from 'lodash/truncate';

export default async function RelatedPosts({ postId }) {
  var homeService = new HomeService();

  const relatedPost = await homeService.getRelatedArticles(postId);

  function Post({ post }) {
    return (
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Card className="post-card">
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card className="box">
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
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Stack>
                <Typography variant="body2" pt={2} fontWeight={700}>
                  {post?.topics.map((category, index) => (
                    <a key={category} href={`/blogcategory/${category}`} className="post-category">
                      {category}
                      {post?.topics.length - 1 == index ? '' : ' , '}
                    </a>
                  ))}
                </Typography>
                <Typography variant="h3" pt={2}>
                  <a href={'/blogpost/' + post?.id + '/' + post?.subject} className="post-title">
                    {post?.subject}
                  </a>
                </Typography>
                <Box
                  variant="body2"
                  pt={2}
                  pb={2}
                  dangerouslySetInnerHTML={{
                    __html: truncate(post?.body, {
                      length: 150,
                      seperator: '.'
                    })
                  }}
                ></Box>
               
              </Stack>
            </Grid>
          </Grid> <Author
                  author={post?.writer}
                  date={DateTimeViewer(CONFIG.DEFAULT_LANGUAGE, post?.publishDate)}
                  readingTime={readingTime(post?.body)}
                />
        </Card>
      </Grid>
    );
  }
  return (
    <Box className="bg-blue">
      <Box
        className="bg-wave"
        sx={{
          backgroundImage: `url(/images/wave-contact.svg)`
        }}
        height={{ xs: 300, sm: 350, md: 380, lg: 400, xl: 400 }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container pt={{ xs: 0, sm: 5, md: 5, lg: 5, xl: 5 }}>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            pl={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 10 }}
            pr={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 10 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignItems="center">
              <Stack pb={5} alignItems="center">
                <Typography variant="h1" pb={5}>
                  Related Posts
                </Typography>
                {/* <Typography variant="body2" pt={2} pb={2}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography> */}
              </Stack>
            </Grid>
            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} spacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}>
              {relatedPost?.map((post, index) => (
                <Post key={post.id} post={post} />
              ))}
              {/* <Post /> <Post /> <Post /> */}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box textAlign="center" p={10}>
                <Button href="/blog" variant="contained" color="info" size="large">
                  View All
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
