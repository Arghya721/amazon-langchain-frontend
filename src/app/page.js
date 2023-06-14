'use client';
import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSearchSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <main>
      {!isSubmitted && <Header />}
      <SearchBar onSubmit={handleSearchSubmit} />
    </main>
  );
}
