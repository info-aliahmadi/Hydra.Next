'use server';
import React, { lazy } from 'react';

const Header = lazy(() => import('../_components/PageHeader'));
const Story = lazy(() => import('./_components/Story'));
const Factory = lazy(() => import('./_components/Factory'));
const Statistics = lazy(() => import('./_components/Statistics'));
const Team = lazy(() => import('./_components/Team'));

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
