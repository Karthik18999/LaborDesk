'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Labor<span className="text-brand-400">Desk</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Labor Desk is India’s premier enterprise workforce management platform, connecting infrastructure builders with verified, physical-registered blue-collar workers.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              Aadhaar Biometric & Skill Verified Platform
            </div>
          </div>

          {/* Nav 1 */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Industries</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Nav 2 */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">Access Portals</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/login" className="hover:text-white transition-colors">Admin Login</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Company Login</Link></li>
              <li><Link href="/register-company" className="hover:text-white transition-colors">Register Company</Link></li>
            </ul>
          </div>

          {/* Nav 3 */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">Legal & Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GST Compliance</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Labor Desk Platform Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with precision for India’s infrastructure growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
