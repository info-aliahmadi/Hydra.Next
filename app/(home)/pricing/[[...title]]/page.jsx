'use server';
import React from 'react';
import Introduce from '../../_components/pricing/Introduce';
import Plans from '../../_components/pricing/Plans';
import FAQ from '../../_components/pricing/FAQ';
import CTA from '../../_components/pricing/CTA';
import PageHeader from '@(home)/_components/PageHeader';
// import Header from './Sections/Header';

export async function generateMetadata() {
  const desc =
    'We have over 15 years of combined experience in creating beautiful, responsive, and user-friendly websites for various clients and purposes. We specialize in front-end development , using the latest technologies and frameworks such as HTML5, CSS3, JavaScript, React, NextJs, Bootstrap and Material Design(MUI) . We also have skills in back-end development , working with .NET, ASP.Net, SQL Server and MongoDB .';

  return {
    title: 'Pricing Plan',
    description: desc,
    keywords:
      'front-end development,HTML5, CSS3, JavaScript, React, NextJs, Bootstrap and Material Design(MUI),back-end development,.NET, ASP.Net, SQL Server and MongoDB',
    category: 'World-Class Web Development',

    openGraph: {
      title: 'Pricing Plan',
      description: desc
    },
    twitter: {
      title: 'Pricing Plan',
      description: desc
    }
  };
}

export default async function Pricing() {
  return (
    <>
      <PageHeader title="Pricing Plan" description="Fair Price for High Quality Work" />
      <Introduce />
      <Plans />
      <FAQ />
      <CTA />
    </>
  );
}
