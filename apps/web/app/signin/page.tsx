'use client'
import React, { useState, useCallback } from 'react';
import { Shapes, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/signin`, {  
        email,
        password,
      });

      const data = response.data;
      if (data.error) {
        toast.error(data.error);
        console.error('Sign in failed:', data.error);
        return;
      }

      if (typeof window !== 'undefined') {
        if (checkbox) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
      }

      toast.success('Sign in successful');
      router.push('/dashboard');

    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Sign in failed';
      toast.error(errorMessage);
      console.error('Sign in failed:', errorMessage);
    }
  }, [email, password, checkbox, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      <Link href="/" className="p-4 text-gray-600 hover:text-gray-900 flex items-center w-fit">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to home
      </Link>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shapes className="w-10 h-10 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">DrawFlow</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to continue to DrawFlow</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={checkbox}
                  onChange={() => setCheckbox(!checkbox)}
                  className="h-4 w-4 text-purple-600 cursor-pointer focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={!checkbox}
              className={`w-full cursor-pointer text-white py-2 px-4 rounded-lg transition-colors ${
                checkbox ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
