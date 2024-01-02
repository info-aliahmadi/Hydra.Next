'use server';
import React, { lazy } from 'react';

const Header = lazy(() => import('../_components/PageHeader'));
const Story = lazy(() => import('./_components/Story'));
const Factory = lazy(() => import('./_components/Factory'));
const Statistics = lazy(() => import('./_components/Statistics'));
const Team = lazy(() => import('./_components/Team'));

export async function generateMetadata({ params }, parent) {

  const siteName = 'https://onwavedesign.com';
  const title = "About OnWave Design Team"
  const desc = "We have over 15 years of combined experience in creating beautiful, responsive, and user-friendly websites for various clients and purposes. We specialize in front-end development , using the latest technologies and frameworks such as HTML5, CSS3, JavaScript, React, NextJs, Bootstrap and Material Design(MUI) . We also have skills in back-end development , working with .NET, ASP.Net, SQL Server and MongoDB .";

  return {
    title: "About",
    description: desc,
    keywords: 'front-end development,HTML5, CSS3, JavaScript, React, NextJs, Bootstrap and Material Design(MUI),back-end development,.NET, ASP.Net, SQL Server and MongoDB',
    category: 'World-Class Web Development',

    openGraph: {
      title: title,
      description: desc,
      url: siteName,
      siteName: 'OnWave Design',
      images: '/images/onwave-presentation.png',
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      title: title,
      description: desc
      }
    }
  }

export default async function About() {
  return (
    <>
      <Header title="About Us" description="At OnWave Design, We Believe in Teamwork" />
      <Story />
      <Factory />
      <Statistics />
      <Team />
    </>
  );
}
