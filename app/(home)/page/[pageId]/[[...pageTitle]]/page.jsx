'use server';
import React from 'react';
import PageContent from '@(home)/_components/page/PageContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShareButtons from '@(home)/_components/blogpost/ShareButtons';
import Author from '@(home)/_components/Author';
import { DateTimeViewer } from '/utils/DateViewer';
import readingTime from '/utils/readingTime';
import CONFIG from '/config';
import HomeService from '@(home)/_service/HomeService';
import Header from '@(home)/_components/blogpost/Header';
import truncate from 'lodash/truncate';

export async function generateMetadata({ params }, parent) {
  var homeService = new HomeService();
  let pageId = params.pageId;
  const page = await homeService.getPage(pageId);

  const desc = truncate(page?.body, {
    length: 250,
    seperator: '.'
  });


  const pageUrl = CONFIG.DOMAIN + '/page/' + page.id + '/' + page.pageTitle;

  return {
    title: page.pageTitle,
    keywords: page.tags,
    openGraph: {
      title: page.subject,
      description: desc,
      url: pageUrl,
      siteName: 'OnWave Design',
      type: 'article'
    },
    twitter: {
      title: page.subject,
      description: desc
    }
  };
}

export default async function Page({ params }) {
  var homeService = new HomeService();
  let pageId = params.pageId;
  const page = await homeService.getPage(pageId);

  return (
    <>
      <Header>
        <Typography variant="h1" pt={3}>
          {page?.subject}
        </Typography>
        <Box pt={6} display="flex" flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row', xl: 'row' }} justifyContent='space-between' alignItems="center">
          <Author
            author={page?.writer}
            date={DateTimeViewer(CONFIG.DEFAULT_LANGUAGE, page?.registerDate)}
            readingTime={readingTime(page?.body)}
          />
          <ShareButtons />
        </Box>
      </Header>
      <PageContent page={page} />
    </>
  );
}
