'use client';

import React, { useState } from 'react';
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      console.log('Login attempt:', { email, password });
      // Redirect to admin dashboard on successful login
      // window.location.href = '/admin/dashboard';
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-background border border-primary/20 rounded-lg shadow-2xl p-8 md:p-10'>
          {/* Logo/Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-primary mb-2'>Flywate</h1>
            <p className='text-white/60 text-sm'>Admin Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className='space-y-6'>
            {/* Email Input */}
            <div className='relative'>
              <label className='block text-sm font-medium text-white/80 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <BiEnvelope className='absolute left-3 top-3.5 text-primary/60 text-lg' />
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='admin@flywate.com'
                  className='w-full bg-primary/5 border border-primary/20 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-primary/10 transition'
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='relative'>
              <label className='block text-sm font-medium text-white/80 mb-2'>
                Password
              </label>
              <div className='relative'>
                <BiLockAlt className='absolute left-3 top-3.5 text-primary/60 text-lg' />
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  className='w-full bg-primary/5 border border-primary/20 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-primary/10 transition'
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className='bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 flex items-center gap-2'>
                <span className='text-lg'>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-background font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2'
            >
              {loading && (
                <AiOutlineLoading3Quarters className='text-lg animate-spin' />
              )}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <div className='mt-6 text-center text-white/50 text-sm'>
            <p>Demo credentials available in documentation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
