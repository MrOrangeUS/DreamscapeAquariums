"use client";

import React from 'react';

const Hero: React.FC = () => (
  <section className="relative h-screen">
    <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
      <source src="/reef-hero.mp4" type="video/mp4" />
    </video>
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
      <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">
        Welcome to Dreamscape Aquariums
      </h1>
      <p className="text-xl max-w-2xl drop-shadow-md">
        Explore our vibrant coral reefs and marine life. Dive into a world of wonder and tranquility.
      </p>
    </div>
    <div className="absolute inset-0 bg-black opacity-50"></div>
  </section>
);

export default Hero;
