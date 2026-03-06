'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await authClient.signIn.email({ email, password });
      if (result.data) {
        toast.success('Signed in successfully!');
        router.push('/dashboard');
        router.refresh();
      } else if (result.error) {
        toast.error(result.error?.message || 'Failed to sign in');
      }
    } catch (error) {
      toast.error('An error occurred during sign in');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({ provider: 'google', callbackURL: '/dashboard' });
    } catch (error) {
      toast.error('Google sign in failed');
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-zinc-950">

      {/* ── Left panel: branding ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden flex-col justify-between p-12">

        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(251,191,36,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(251,191,36,0.05)_0%,_transparent_55%)]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-blue-400/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/4 blur-3xl" />

        {/* Hero copy */}
        <div className="relative z-10 space-y-6 max-w-md">


          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.15] tracking-tight">
            The smartest way
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
              to get things done.
            </span>
          </h1>

          <p className="text-zinc-400 text-base leading-relaxed">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>

        </div>

        {/* Testimonial */}

      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-12 relative">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.04)_0%,_transparent_65%)] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">

  

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Welcome back</h2>
            <p className="text-zinc-500 text-sm mt-2">Sign in to continue to your workspace.</p>
          </div>

          {/* Google SSO */}
          {/* <Button
            variant="outline"
            className="w-full h-11 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-200 transition-all duration-200 mb-6"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-zinc-400" />
            ) : (
              <svg className="mr-2.5 h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Continue with Google
          </Button> */}

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs font-medium tracking-wider uppercase">or</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-300 text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-blue-400/60 focus-visible:ring-1 focus-visible:ring-blue-400/20 focus-visible:ring-offset-0 transition-all duration-200 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300 text-sm font-medium">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-400/80 hover:text-blue-400 transition-colors duration-150 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-blue-400/60 focus-visible:ring-1 focus-visible:ring-blue-400/20 focus-visible:ring-offset-0 pr-10 transition-all duration-200 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors duration-150"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-white hover:bg-white/90 text-zinc-900 font-semibold transition-all duration-200 shadow-lg shadow-blue-400/20 hover:shadow-blue-400/30 rounded-lg group mt-2"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </form>

          {/* Sign-up CTA */}
          <p className="text-center text-zinc-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link
              href="/sign-up"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-150"
            >
              Create one free
            </Link>
          </p>

          {/* Legal */}
          <p className="text-center text-zinc-600 text-xs mt-8 leading-relaxed">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-400 transition-colors">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}