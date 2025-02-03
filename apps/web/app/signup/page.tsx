'use client'
import React, { useCallback, useState } from 'react';
import { Shapes, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";
import {toast} from 'react-hot-toast';
import useFetch from '../hooks/useFetch';
import { sign } from 'crypto';


export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const router = useRouter()


  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/signup`, {  
        email,
        password,
        name
      });

      const data = response.data;
      if (data.error) {
        toast.error(data.error);
        console.error('Sign up failed:', data.error);
        return;
      }

      toast.success('Sign up successful');
      router.push('/signin');

    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Sign up failed';
      toast.error(errorMessage);
      console.error('Sign up failed:', errorMessage);
    }
  }, [email, password, checkbox, router,name]);  

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      <Link 
        href="/" 
        className="p-4 text-gray-600 hover:text-gray-900 flex items-center w-fit"
      >
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600">Start creating amazing diagrams today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

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
              <p className="mt-1 text-sm text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                onClick={() => setCheckbox(!checkbox)}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled ={!checkbox}
              className={`w-full cursor-pointer text-white py-2 px-4 rounded-lg transition-colors ${
                checkbox ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed opacity-50'
              }`}
            
            >
              Create account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

    
