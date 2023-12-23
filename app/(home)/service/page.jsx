'use server'
import React from 'react';
// import Header from './Sections/Header';
import Introduce from './_components/Introduce';
import Features from './_components/Features';
import ServiceTab from './_components/ServiceTab';
import Process from './_components/Process';
import Testimonial from '../_components/Testimonial';
import Request from '../_components/Request';
import Contact from '../_components/Contact';
import PageHeader from '@(home)/_components/PageHeader';

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
