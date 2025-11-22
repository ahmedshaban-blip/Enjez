// src/pages/auth/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase.js';
import LogoHeader from '../../components/common/LogoHeader.jsx';
import { Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;
        if (userRole === 'admin') navigate('/admin');
        else if (userRole === 'user') navigate('/home');
        else navigate('/');
      } else {
        setError('No user data found.');
      }
    } catch (error) {
      setError('Incorrect email or password.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* Left Side: Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white w-full lg:w-[45%]">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* --- Logo Section (تم التكبير هنا) --- */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-10 transform scale-125 origin-center lg:origin-left">
                <LogoHeader title="" subtitle="" /> 
            </div>
            
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Please enter your details to sign in.
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-semibold leading-6 text-slate-900">
                    Password
                    </label>
                    <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Forgot password?
                    </Link>
                </div>
                
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100 animate-pulse">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center items-center rounded-lg bg-slate-900 px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                    Create an account
                    </Link>
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
          alt="Office background"
        />
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply transition-colors hover:bg-blue-900/30"></div>
        <div className="absolute bottom-0 left-0 right-0 p-20 text-white z-10">
            <h3 className="text-3xl font-bold leading-tight">
                "The easiest way to manage your services and bookings."
            </h3>
            <p className="mt-4 text-lg text-blue-100 opacity-90">
                Join thousands of users who trust our platform.
            </p>
        </div>
      </div>
    </div>
  );
}