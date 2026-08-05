'use client';

import React, { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Industries from '@/components/landing/Industries';
import FAQ from '@/components/landing/FAQ';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import RegisterModal from '@/components/landing/RegisterModal';
import DemoModal from '@/components/landing/DemoModal';

export default function LandingPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <main className="flex-1">
        <Hero
          onOpenDemo={() => setIsDemoOpen(true)}
          onOpenRegister={() => setIsRegisterOpen(true)}
        />
        <Features />
        <HowItWorks />
        <Industries />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
}
