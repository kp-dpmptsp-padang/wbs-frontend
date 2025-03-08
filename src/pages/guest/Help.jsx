import React from 'react';
import HelpCarousel from '@/components/guest/HelpCarousel';
import FAQ from '@/components/guest/FAQ';
import HelpCenter from '@/components/guest/HelpCenter';

export default function Help() {
  return (
    <div>
      <HelpCarousel />
      <FAQ />
      <HelpCenter />
    </div>
  );
}