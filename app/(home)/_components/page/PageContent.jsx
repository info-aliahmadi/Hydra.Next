'use server'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import 'react';
import { DateTimeViewer } from '/utils/DateViewer';
import readingTime from '/utils/readingTime';
import CONFIG from '/config';
import Author from '@(home)/_components/Author';
import ShareButtons from '../blogpost/ShareButtons';
import PostTags from '../blogpost/PostTags';

export default async function PageContent({ page }) {
  return (
    <Box className="bg-white">
      <Container maxWidth="xl">
        <Card className="post-card">
          <Grid container alignItems="center" alignContent="center" justifyContent="center">
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <Stack
                p={{ xs: 5, sm: 5, md: 5, lg: 10, xl: 10 }}
                pb={15}
                pl={{ xs: 0, sm: 15, md: 15, lg: 15, xl: 15 }}
                pr={{ xs: 0, sm: 15, md: 15, lg: 15, xl: 15 }}
                className="content"
              >
                <Box
                  variant="body1"
                  textAlign="justify"
                  dangerouslySetInnerHTML={{
                    __html: page?.body
                  }}
                ></Box>
                <Grid container pt={4} justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4" pb={2}>
                      Share This Page
                    </Typography>
                    <ShareButtons />
                  </Grid>
                  <Grid item>
                    <PostTags tags={page?.tags} />
                  </Grid>
                </Grid>
                <Box pt={5} mt={5} borderTop={'1px solid #00000069'}>
                  <Author
                    author={page?.writer}
                    date={DateTimeViewer(CONFIG.DEFAULT_LANGUAGE, page?.publishDate)}
                    readingTime={readingTime(page?.body)}
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
