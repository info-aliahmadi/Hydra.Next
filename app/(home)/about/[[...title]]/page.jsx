import Header from '@(home)/_components/PageHeader';
import React from 'react';
import Story from '../../_components/about/Story';
import Factory from '../../_components/about/Factory';
import Statistics from '../../_components/about/Statistics';
import Team from '../../_components/about/Team';

export async function generateMetadata() {
  const title = 'About OnWave Design Team';
  const desc =
    'We have over 15 years of combined experience in creating beautiful, responsive, and user-friendly websites for various clients and purposes. We specialize in front-end development , using the latest technologies and frameworks such as HTML5, CSS3, JavaScript, React, NextJs, Bootstrap and Material Design(MUI) . We also have skills in back-end development , working with .NET, ASP.Net, SQL Server and MongoDB .';

  return {
    title: 'About',
    description: desc,
    keywords:
      'front-end development,HTML5, CSS3, JavaScript, React, NextJs, Bootstrap and Material Design(MUI),back-end development,.NET, ASP.Net, SQL Server and MongoDB',
    category: 'World-Class Web Development',

    openGraph: {
      title: title,
      description: desc
    },
    twitter: {
      title: title,
      description: desc
    }
  };
}

export default function Page() {
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
