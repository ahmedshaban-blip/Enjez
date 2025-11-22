// ResetPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase.js";
import LogoHeader from "../../components/common/LogoHeader.jsx";
import { Loader2, ArrowLeft, CheckCircle2, AlertCircle, Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error sending password reset email:", err);
      if (err.code === "auth/user-not-found") {
    
        setIsSubmitted(true);
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to send reset email. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* 1. Left Side: Form Section */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white w-full lg:w-[45%]">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Logo Section (Scaled) */}
          <div className="text-center lg:text-left">
             <div className="flex justify-center lg:justify-start mb-10 transform scale-125 origin-center lg:origin-left">
                <LogoHeader title="" subtitle="" /> 
            </div>
          </div>

          {/* Conditional Rendering: Form vs Success Message */}
          {!isSubmitted ? (
            <>
              <div className="text-center lg:text-left mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Reset your password
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Enter your email address and we'll send you a link to get back into your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">
                    Email address
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-lg border-0 py-3 pl-4 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                      placeholder="you@example.com"
                    />
                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                     </div>
                  </div>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100 animate-pulse">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                {/* Buttons */}
                <div className="space-y-4">
                    <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center items-center rounded-lg bg-slate-900 px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                    {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                    ) : (
                        "Send Reset Link"
                    )}
                    </button>

                    <Link
                        to="/login"
                        className="flex w-full justify-center items-center gap-2 rounded-lg bg-white px-3 py-3 text-sm font-semibold leading-6 text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Login
                    </Link>
                </div>
              </form>
            </>
          ) : (
            /* Success State Design */
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="flex justify-center lg:justify-start mb-6">
                  <div className="rounded-full bg-green-100 p-3">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
              </div>
              
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Check your inbox
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                We've sent a password reset link to <span className="font-bold text-slate-900">{email}</span>.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Didn't receive the email? Check your spam folder or try again.
              </p>

              <div className="mt-10">
                  <Link
                    to="/login"
                    className="flex w-full justify-center items-center gap-2 rounded-lg bg-slate-900 px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-slate-800 transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                  
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Click here to try another email
                  </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Right Side: Image Section */}
      <div className="relative hidden w-0 flex-1 lg:block">
        {/* صورة هادئة ومريحة للنظر */}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
          alt="Secure Laptop"
        />
        
        {/* Overlay Blue */}
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>

        <div className="absolute bottom-0 left-0 right-0 p-20 text-white z-10">
            <h3 className="text-3xl font-bold leading-tight">
                "Security is our top priority."
            </h3>
            <p className="mt-4 text-lg text-blue-100 opacity-90">
                We help you recover your account safely and securely.
            </p>
        </div>
      </div>
    </div>
  );
}