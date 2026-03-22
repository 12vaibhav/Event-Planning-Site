/**
 * Auth Modal Component
 * 
 * A slide-in modal for sign in / sign up that appears when authentication is required
 * (e.g., before generating a preview or submitting a quote).
 */
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  redirectMessage?: string;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin', redirectMessage }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'signin') {
        const result = await signIn({ email, password });
        if (result.success) {
          setSuccess('Signed in successfully!');
          setTimeout(onClose, 800);
        } else {
          setError(result.error || 'Sign in failed');
        }
      } else {
        if (!fullName.trim()) {
          setError('Please enter your full name');
          setLoading(false);
          return;
        }
        const result = await signUp({ email, password, fullName });
        if (result.success) {
          setSuccess('Account created! Please check your email to verify.');
          setTimeout(onClose, 2000);
        } else {
          setError(result.error || 'Sign up failed');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const result = await signInWithGoogle();
    if (!result.success) {
      setError(result.error || 'Google sign in failed');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl border border-brand-gold/20 w-full max-w-md mx-4 p-8 animate-preview">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface/50 hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-headline text-2xl text-primary mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          {redirectMessage && (
            <p className="text-on-surface-variant text-sm">{redirectMessage}</p>
          )}
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-outline-variant rounded-xl py-3 px-4 font-medium text-sm text-primary hover:bg-surface-container-low transition-colors mb-6 disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-outline-variant" />
          <span className="text-on-surface-variant text-xs uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-outline-variant" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface/70">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm"
                placeholder="Your full name"
                required
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface/70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm"
              placeholder={mode === 'signup' ? 'Min 8 chars, 1 upper, 1 number' : '••••••••'}
              required
              minLength={mode === 'signup' ? 8 : 1}
            />
          </div>

          {/* Error / Success messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-maroon text-white py-3.5 rounded-xl font-label text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              mode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Toggle mode */}
        <p className="text-center text-sm text-on-surface-variant mt-6">
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError(null);
              setSuccess(null);
            }}
            className="text-brand-maroon font-bold hover:underline"
          >
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
