'use server';
import React from 'react';
// import Header from './Sections/Header';
import Introduce from '../../_components/service/Introduce';
import Features from '../../_components/service/Features';
import ServiceTab from '../../_components/service/ServiceTab';
import Process from '../../_components/service/Process';
import Testimonial from '../../_components/Testimonial';
import Request from '../../_components/Request';
import Contact from '../../_components/Contact';
import PageHeader from '@(home)/_components/PageHeader';

export async function generateMetadata() {
  const desc =
    'We have over 15 years of combined experience in creating beautiful, responsive, and user-friendly websites for various clients and purposes. We specialize in front-end development , using the latest technologies and frameworks such as HTML5, CSS3, JavaScript, React, NextJs, Bootstrap and Material Design(MUI) . We also have skills in back-end development , working with .NET, ASP.Net, SQL Server and MongoDB .';

  return {
    title: 'Service',
    description: desc,
    keywords:
      'front-end development,HTML5, CSS3, JavaScript, React, NextJs, Bootstrap and Material Design(MUI),back-end development,.NET, ASP.Net, SQL Server and MongoDB',
    category: 'World-Class Web Development',

    openGraph: {
      title: 'Service',
      description: desc
    },
    twitter: {
      title: 'Service',
      description: desc
    }
  };
}
export default async function Service() {
  return (
    <>
      <PageHeader title="Services" description="Our Service is Our Credit" />
      <Introduce />
      <Features />
      <ServiceTab />
      <Process />
      <Testimonial showWave={true} />
      <Request />
      <Contact />
    </>
  );
}
