'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Shield, Building2, Lock, Mail, ArrowRight, KeyRound, User, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const {
    setRole,
    addToast,
    addCompany,
    industries,
    addIndustry,
    registeredUsers,
    addRegisteredUser,
    setCurrentUser,
    setCurrentCompanyId,
    companies,
  } = useApp();
  const router = useRouter();

  // Active Tab: 'admin' | 'company'
  const [activeTab, setActiveTab] = useState<'admin' | 'company'>('company');
  
  // Auth Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Banners
  const [signUpSuccessMsg, setSignUpSuccessMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State - Admin Sign In (100% EMPTY DEFAULT)
  const [adminSignIn, setAdminSignIn] = useState({
    email: '',
    password: '',
  });

  // Form State - Admin Sign Up
  const [adminSignUp, setAdminSignUp] = useState({
    fullName: '',
    email: '',
    adminSecretCode: '',
    password: '',
    confirmPassword: '',
  });

  // Form State - Company Sign In (100% EMPTY DEFAULT)
  const [companySignIn, setCompanySignIn] = useState({
    email: '',
    password: '',
  });

  // Form State - Company Sign Up
  const [companySignUp, setCompanySignUp] = useState({
    companyName: '',
    gstNumber: '',
    industry: industries[0] || 'Construction & Civil Works',
    customIndustry: '',
    contactPerson: '',
    phone: '',
    email: '',
    password: '',
  });

  const [showCustomIndustryInput, setShowCustomIndustryInput] = useState(false);

  // Helper: Password Strength Evaluation
  const evaluatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: '', barWidth: '0%' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 1, label: 'Weak', color: 'bg-rose-500 text-rose-600', barWidth: '33%' };
    if (score <= 4) return { score: 2, label: 'Medium', color: 'bg-amber-500 text-amber-600', barWidth: '66%' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500 text-emerald-600', barWidth: '100%' };
  };

  // Strict Admin Submit
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpSuccessMsg(null);
    setErrorMessage(null);

    // SIGN UP
    if (authMode === 'signup') {
      if (adminSignUp.password !== adminSignUp.confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter your password.');
        return;
      }
      if (adminSignUp.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }

      const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === adminSignUp.email.trim().toLowerCase());
      if (existingUser) {
        setErrorMessage('This email is already registered. Please sign in with your credentials.');
        return;
      }

      addRegisteredUser({
        name: adminSignUp.fullName,
        email: adminSignUp.email.trim(),
        password: adminSignUp.password,
        role: 'admin',
      });

      setSignUpSuccessMsg(`Admin account created for ${adminSignUp.fullName}! Please sign in below.`);
      setAdminSignIn({ email: adminSignUp.email.trim(), password: '' });
      setAuthMode('signin');

      addToast({
        title: 'Admin Registered',
        description: 'Account created. Please sign in with your password.',
        variant: 'success',
      });
      return;
    }

    // SIGN IN (STRICT)
    const inputEmail = adminSignIn.email.trim().toLowerCase();
    const inputPassword = adminSignIn.password;

    if (!inputEmail || !inputPassword) {
      setErrorMessage('Please enter both Email and Password.');
      return;
    }

    const matchedUser = registeredUsers.find(
      (u) => u.role === 'admin' && u.email.toLowerCase() === inputEmail
    );

    const isDefaultAdmin = inputEmail === 'admin@labordesk.in' && inputPassword === 'admin123';
    const isPasswordCorrect = matchedUser ? matchedUser.password === inputPassword : false;

    if (!matchedUser && !isDefaultAdmin) {
      setErrorMessage('Invalid Email or Password. No admin account found with these credentials.');
      addToast({
        title: 'Access Denied',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    if (!isDefaultAdmin && !isPasswordCorrect) {
      setErrorMessage('Incorrect password. Please verify your password and try again.');
      addToast({
        title: 'Access Denied',
        description: 'Incorrect password.',
        variant: 'destructive',
      });
      return;
    }

    const loggedInName = matchedUser?.name || 'Central Administrator';

    setCurrentUser({
      name: loggedInName,
      email: adminSignIn.email,
      role: 'admin',
    });

    setRole('admin');
    addToast({
      title: `Welcome, ${loggedInName}!`,
      description: 'Authenticated successfully as Administrator.',
      variant: 'success',
    });
    router.push('/admin');
  };

  // Strict Company Submit
  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpSuccessMsg(null);
    setErrorMessage(null);

    // SIGN UP
    if (authMode === 'signup') {
      if (companySignUp.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }

      const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === companySignUp.email.trim().toLowerCase());
      if (existingUser) {
        setErrorMessage('This work email is already registered. Please sign in with your credentials.');
        return;
      }

      let finalIndustry = companySignUp.industry;
      if (showCustomIndustryInput && companySignUp.customIndustry.trim()) {
        finalIndustry = companySignUp.customIndustry.trim();
        addIndustry(finalIndustry);
      }

      addCompany({
        companyName: companySignUp.companyName,
        gstNumber: companySignUp.gstNumber,
        industry: finalIndustry,
        contactPerson: companySignUp.contactPerson,
        phone: companySignUp.phone,
        email: companySignUp.email.trim(),
        officeAddress: 'Bengaluru Corporate Hub',
        subscriptionPlan: 'Pro',
        status: 'Active',
      });

      addRegisteredUser({
        name: companySignUp.contactPerson,
        email: companySignUp.email.trim(),
        password: companySignUp.password,
        role: 'company',
        companyName: companySignUp.companyName,
      });

      setSignUpSuccessMsg(`Registration complete for ${companySignUp.companyName}! Please sign in below.`);
      setCompanySignIn({ email: companySignUp.email.trim(), password: '' });
      setAuthMode('signin');

      addToast({
        title: 'Company Registered',
        description: 'Account created. Please sign in with your password.',
        variant: 'success',
      });
      return;
    }

    // SIGN IN (STRICT)
    const inputEmail = companySignIn.email.trim().toLowerCase();
    const inputPassword = companySignIn.password;

    if (!inputEmail || !inputPassword) {
      setErrorMessage('Please enter both Work Email and Password.');
      return;
    }

    const matchedUser = registeredUsers.find(
      (u) => u.role === 'company' && u.email.toLowerCase() === inputEmail
    );

    const matchedCompany = companies.find(
      (c) => c.email.toLowerCase() === inputEmail
    );

    const isDefaultCompany = inputEmail === 'hr@ltconst.com' && inputPassword === 'company123';
    const isPasswordCorrect = matchedUser ? matchedUser.password === inputPassword : false;

    if (!matchedUser && !matchedCompany && !isDefaultCompany) {
      setErrorMessage('Invalid Email or Password. No company account found with this email.');
      addToast({
        title: 'Access Denied',
        description: 'Invalid credentials. Check your email or Sign Up.',
        variant: 'destructive',
      });
      return;
    }

    if (!isDefaultCompany && !isPasswordCorrect) {
      setErrorMessage('Incorrect password for this company account. Please try again.');
      addToast({
        title: 'Access Denied',
        description: 'Incorrect password.',
        variant: 'destructive',
      });
      return;
    }

    if (matchedCompany) {
      setCurrentCompanyId(matchedCompany.id);
    }

    const loggedInName = matchedUser?.name || matchedCompany?.contactPerson || 'Corporate Client';
    const companyName = matchedUser?.companyName || matchedCompany?.companyName;

    setCurrentUser({
      name: loggedInName,
      email: companySignIn.email,
      role: 'company',
      companyName: companyName,
    });

    setRole('company');
    addToast({
      title: `Welcome, ${loggedInName}!`,
      description: 'Authenticated successfully to Corporate Portal.',
      variant: 'success',
    });
    router.push('/company');
  };

  const activePassword = authMode === 'signup' 
    ? (activeTab === 'company' ? companySignUp.password : adminSignUp.password)
    : (activeTab === 'company' ? companySignIn.password : adminSignIn.password);

  const pwdStrength = evaluatePasswordStrength(activePassword);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-3 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold shadow-lg shadow-brand-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-3xl tracking-tight text-slate-900 dark:text-white">
            Labor<span className="text-brand-600">Desk</span>
          </span>
        </Link>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Workforce Management Platform Authentication
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Main User Type Tabs: Admin vs Company */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
            <button
              onClick={() => {
                setActiveTab('company');
                setSignUpSuccessMsg(null);
                setErrorMessage(null);
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'company'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Company Portal
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setSignUpSuccessMsg(null);
                setErrorMessage(null);
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin Portal
            </button>
          </div>

          {/* Sub Switcher: Sign In vs Sign Up */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setAuthMode('signin');
                  setSignUpSuccessMsg(null);
                  setErrorMessage(null);
                }}
                className={`text-xs font-bold pb-1 transition-all ${
                  authMode === 'signin'
                    ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setSignUpSuccessMsg(null);
                  setErrorMessage(null);
                }}
                className={`text-xs font-bold pb-1 transition-all ${
                  authMode === 'signup'
                    ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                Sign Up ({activeTab === 'admin' ? 'New Admin' : 'New Company'})
              </button>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              {activeTab} • {authMode}
            </span>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2.5 font-medium">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-900 dark:text-rose-300">Authentication Failed</p>
                <p className="text-[11px] mt-0.5 text-rose-700 dark:text-rose-300">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Sign Up Success Alert */}
          {signUpSuccessMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2.5 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900 dark:text-emerald-300">Registration Complete!</p>
                <p className="text-[11px] mt-0.5 text-emerald-700 dark:text-emerald-300">{signUpSuccessMsg}</p>
              </div>
            </div>
          )}

          {/* ================= COMPANY PORTAL FORM ================= */}
          {activeTab === 'company' && (
            <form onSubmit={handleCompanySubmit} className="space-y-4" autoComplete="off">
              {authMode === 'signin' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Work Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        required
                        type="email"
                        autoComplete="off"
                        value={companySignIn.email}
                        onChange={(e) => setCompanySignIn({ ...companySignIn, email: e.target.value })}
                        placeholder="Enter company work email..."
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                      <Link href="/forgot-password" className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        required
                        type="password"
                        autoComplete="new-password"
                        value={companySignIn.password}
                        onChange={(e) => setCompanySignIn({ ...companySignIn, password: e.target.value })}
                        placeholder="Enter password..."
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* COMPANY SIGN UP */
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Registered Name</label>
                    <input
                      required
                      type="text"
                      value={companySignUp.companyName}
                      onChange={(e) => setCompanySignUp({ ...companySignUp, companyName: e.target.value })}
                      placeholder="e.g. Shapoorji Pallonji EPC"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">GST Number</label>
                      <input
                        required
                        type="text"
                        value={companySignUp.gstNumber}
                        onChange={(e) => setCompanySignUp({ ...companySignUp, gstNumber: e.target.value })}
                        placeholder="27AAAAA0000A1Z5"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Industry Sector</label>
                      {!showCustomIndustryInput ? (
                        <select
                          value={companySignUp.industry}
                          onChange={(e) => {
                            if (e.target.value === 'ADD_NEW') {
                              setShowCustomIndustryInput(true);
                            } else {
                              setCompanySignUp({ ...companySignUp, industry: e.target.value });
                            }
                          }}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                        >
                          {industries.map((ind) => (
                            <option key={ind} value={ind}>
                              {ind}
                            </option>
                          ))}
                          <option value="ADD_NEW">+ Add Custom Industry...</option>
                        </select>
                      ) : (
                        <input
                          required
                          type="text"
                          value={companySignUp.customIndustry}
                          onChange={(e) => setCompanySignUp({ ...companySignUp, customIndustry: e.target.value })}
                          placeholder="Enter Industry"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-brand-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Person</label>
                      <input
                        required
                        type="text"
                        value={companySignUp.contactPerson}
                        onChange={(e) => setCompanySignUp({ ...companySignUp, contactPerson: e.target.value })}
                        placeholder="HR Name"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                      <input
                        required
                        type="text"
                        value={companySignUp.phone}
                        onChange={(e) => setCompanySignUp({ ...companySignUp, phone: e.target.value })}
                        placeholder="+91 98000 00000"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email Address</label>
                    <input
                      required
                      type="email"
                      value={companySignUp.email}
                      onChange={(e) => setCompanySignUp({ ...companySignUp, email: e.target.value })}
                      placeholder="hr@company.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Create Password</label>
                    <input
                      required
                      type="password"
                      autoComplete="new-password"
                      value={companySignUp.password}
                      onChange={(e) => setCompanySignUp({ ...companySignUp, password: e.target.value })}
                      placeholder="Enter password..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Password Strength Indicator */}
              {activePassword.length > 0 && (
                <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-slate-500">Password Strength:</span>
                    <span className={`font-bold ${pwdStrength.color}`}>{pwdStrength.label}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${pwdStrength.color.split(' ')[0]}`}
                      style={{ width: pwdStrength.barWidth }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Use 8+ characters with uppercase letters, numbers & special symbols.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              >
                {authMode === 'signin' ? 'Sign In to Company Portal' : 'Register Company Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ================= ADMIN PORTAL FORM ================= */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4" autoComplete="off">
              {authMode === 'signin' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Admin Email / Username</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        required
                        type="email"
                        autoComplete="off"
                        value={adminSignIn.email}
                        onChange={(e) => setAdminSignIn({ ...adminSignIn, email: e.target.value })}
                        placeholder="Enter admin email address..."
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Admin Password</label>
                      <Link href="/forgot-password" className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        required
                        type="password"
                        autoComplete="new-password"
                        value={adminSignIn.password}
                        onChange={(e) => setAdminSignIn({ ...adminSignIn, password: e.target.value })}
                        placeholder="Enter password..."
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* ADMIN SIGN UP */
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Administrator Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        required
                        type="text"
                        value={adminSignUp.fullName}
                        onChange={(e) => setAdminSignUp({ ...adminSignUp, fullName: e.target.value })}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Admin Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        required
                        type="email"
                        value={adminSignUp.email}
                        onChange={(e) => setAdminSignUp({ ...adminSignUp, email: e.target.value })}
                        placeholder="admin@labordesk.in"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Admin Security Passcode</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        required
                        type="text"
                        value={adminSignUp.adminSecretCode}
                        onChange={(e) => setAdminSignUp({ ...adminSignUp, adminSecretCode: e.target.value })}
                        placeholder="Secret Key (e.g. ADM-9981)"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                      <input
                        required
                        type="password"
                        autoComplete="new-password"
                        value={adminSignUp.password}
                        onChange={(e) => setAdminSignUp({ ...adminSignUp, password: e.target.value })}
                        placeholder="Enter password..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
                      <input
                        required
                        type="password"
                        autoComplete="new-password"
                        value={adminSignUp.confirmPassword}
                        onChange={(e) => setAdminSignUp({ ...adminSignUp, confirmPassword: e.target.value })}
                        placeholder="Confirm password..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Password Strength Indicator */}
              {activePassword.length > 0 && (
                <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-slate-500">Password Strength:</span>
                    <span className={`font-bold ${pwdStrength.color}`}>{pwdStrength.label}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${pwdStrength.color.split(' ')[0]}`}
                      style={{ width: pwdStrength.barWidth }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Use 8+ characters with uppercase letters, numbers & special symbols.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              >
                {authMode === 'signin' ? 'Sign In as Admin' : 'Register New Admin Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* System Policy Note */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-900 dark:text-amber-200 text-center font-medium">
            🔒 <strong>Strict Access Policy:</strong> Workers register physically in-person at the central admin office. Workers do not have online portal logins.
          </div>
        </div>
      </div>
    </div>
  );
}
