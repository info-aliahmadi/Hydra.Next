'use server';
import React from 'react';
import Header from '../_components/Header';
import Introduce from '../_components/Introduce';
import Features from '../_components/Features';
import Testimonial from '../_components/Testimonial';
import Statistics from '../_components/Statistics';
import Request from '../_components/Request';
import Contact from '../_components/Contact';


export default async function Home() {

  return (
    <>
      <Header />
      <Introduce />
      <Features />
      <Testimonial />
      <Statistics />
      <Request />
      <Contact />
    </>
  );
}
