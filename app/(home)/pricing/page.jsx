'use server'
import React from 'react';
import Introduce from './_components/Introduce';
import Plans from './_components/Plans';
import FAQ from './_components/FAQ';
import CTA from './_components/CTA';
import PageHeader from '@(home)/_components/PageHeader';
// import Header from './Sections/Header';

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
