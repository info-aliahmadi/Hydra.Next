'use server'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'react';
import ShareButtons from './ShareButtons';
import PostTags from './PostTags';
import { DateTimeViewer } from '/utils/DateViewer';
import readingTime from '/utils/readingTime';
import CONFIG from '/config';
import Author from '@(home)/_components/Author';

export default async function Content({ post }) {
  return (
    <Box className="bg-white">
      <Container maxWidth="xl">
        <Card className="post-card">
          <Grid container alignItems="center" alignContent="center" justifyContent="center">
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              pt={{ xs: 0, sm: 5, md: 5, lg: 5, xl: 10 }}
              pl={{ xs: 0, sm: 5, md: 15, lg: 15, xl: 10 }}
              pr={{ xs: 0, sm: 5, md: 15, lg: 15, xl: 10 }}
            >
              <img
                alt=""
                src={
                  post?.previewImageUrl
                    ? post?.previewImageUrl
                    : post?.previewImageId
                    ? CONFIG.UPLOAD_BASEPATH + post?.previewImage.directory + post?.previewImage.fileName
                    : "/images/unavailable.png"
                }
                width={'100%'}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <Stack
                p={{ xs: 5, sm: 5, md: 5, lg: 10, xl: 10 }}
                pb={15}
                pl={{ xs: 0, sm: 15, md: 15, lg: 15, xl: 15 }}
                pr={{ xs: 0, sm: 15, md: 15, lg: 15, xl: 15 }}
                className="content"
              >
                <Box
                className="post-body"
                  variant="body1"
                  textAlign="justify"
                  dangerouslySetInnerHTML={{
                    __html: post?.body
                  }}
                ></Box>
                <Grid container pt={4} justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4" pb={2}>
                      Share This Post
                    </Typography>
                    <ShareButtons />
                  </Grid>
                  <Grid item>
                    <PostTags tags={post?.tags} />
                  </Grid>
                </Grid>
                <Box pt={5} mt={5} borderTop={'1px solid #00000069'}>
                  <Author
                    author={post?.writer}
                    date={DateTimeViewer(CONFIG.DEFAULT_LANGUAGE, post?.publishDate)}
                    readingTime={readingTime(post?.body)}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}
