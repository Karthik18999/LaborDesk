'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Briefcase, Sun, Moon, Shield, Building2, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenDemo, onOpenRegister }: { onOpenDemo?: () => void; onOpenRegister?: () => void }) {
  const { isDarkMode, toggleTheme, setRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
              Labor<span className="text-brand-600 dark:text-brand-400">Desk</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
              Workforce Management
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">How It Works</a>
          <a href="#industries" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Industries</a>
          <a href="#faq" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Contact</a>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Login Links */}
          <Link
            href="/login"
            onClick={() => setRole('admin')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-brand-600" />
            Admin Login
          </Link>

          <Link
            href="/login"
            onClick={() => setRole('company')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 transition-all"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-500" />
            Company Login
          </Link>

          {/* Primary CTA */}
          <button
            onClick={onOpenRegister}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-500/20 hover:shadow-lg transition-all"
          >
            Register Company
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 flex flex-col gap-3">
          <a href="#features" className="text-sm font-medium py-2 text-slate-700 dark:text-slate-200">Features</a>
          <a href="#how-it-works" className="text-sm font-medium py-2 text-slate-700 dark:text-slate-200">How It Works</a>
          <a href="#industries" className="text-sm font-medium py-2 text-slate-700 dark:text-slate-200">Industries</a>
          <a href="#faq" className="text-sm font-medium py-2 text-slate-700 dark:text-slate-200">FAQ</a>
          <a href="#contact" className="text-sm font-medium py-2 text-slate-700 dark:text-slate-200">Contact</a>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setRole('admin')}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-xl"
            >
              <Shield className="w-4 h-4 text-brand-600" /> Admin Portal
            </Link>
            <Link
              href="/login"
              onClick={() => setRole('company')}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-xl"
            >
              <Building2 className="w-4 h-4 text-emerald-500" /> Company Portal
            </Link>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRegister?.(); }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-brand-600 rounded-xl"
            >
              Register Company
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
