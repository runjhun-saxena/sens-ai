'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.data) {
        toast.success('Account created successfully!');
        router.push('/onboarding');
        router.refresh();
      } else if (result.error) {
        toast.error(result.error?.message || 'Failed to sign up');
      }
    } catch (error) {
      toast.error('An error occurred during sign up');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/onboarding',
      });
    } catch (error) {
      toast.error('Google sign up failed');
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-zinc-950 p-6 relative">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.04)_0%,_transparent_65%)] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Create your account
          </h2>
          <p className="text-zinc-500 text-sm mt-2">
            Join SensAI to start your AI-powered career journey.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">

          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-sm font-medium">
              Full Name
            </Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-blue-400/60 focus-visible:ring-1 focus-visible:ring-blue-400/20 rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-sm font-medium">
              Email address
            </Label>
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-blue-400/60 focus-visible:ring-1 focus-visible:ring-blue-400/20 rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-sm font-medium">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-blue-400/60 focus-visible:ring-1 focus-visible:ring-blue-400/20 rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-sm font-medium">
              Confirm Password
            </Label>
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-blue-400/60 focus-visible:ring-1 focus-visible:ring-blue-400/20 rounded-lg"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-blue-400 hover:bg-blue-300 text-zinc-900 font-semibold shadow-lg shadow-blue-400/20 hover:shadow-blue-400/30 rounded-lg group mt-2"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Create account
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs uppercase">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Google */}
        <Button
          variant="outline"
          className="w-full h-11 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          type="button"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Continue with Google
        </Button>

        {/* Sign in link */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}