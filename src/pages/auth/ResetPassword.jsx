import React, { useState } from "react";

import logo from "../../assets/logo2.svg";
import { sendPasswordResetEmail } from "firebase/auth";

import { Link } from "react-router-dom";

import { auth } from "../../config/firebase.js";

export default function App() {


  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between whitespace-nowrap px-6 sm:px-10 py-4">
        <div className="flex items-center gap-3 text-gray-800 dark:text-white">
          <div className="size-16 text-primary">
            <Link
              to="/"
              aria-label="Enjez Home"
              className="flex items-center gap-2"
            >
              <img src={logo} alt="Enjez Logo" className="h-16 w-auto" />
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full max-w-md">
        <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="flex flex-col gap-6">
            {/* Page Heading */}
            <div className="text-center">
              <p className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">
                Reset Your Password
              </p>
            </div>
            {/* Instructional Text */}
            <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal text-center">
              Enter the email address associated with your account, and we'll
              send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Email Input Field */}
              <div className="flex flex-col">
                <label className="flex flex-col w-full">
                  <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal pb-2">
                    Email Address
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>

              {/* Primary Button */}
              <button
                type="submit"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 w-full bg-primary text-white text-base font-bold leading-normal tracking-wide hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/70 dark:focus:ring-offset-background-dark"
              >
                <span className="truncate">Send Reset Link</span>
              </button>
            </form>

            {/* Secondary Link */}
            <div className="text-center">
              <Link
                className="flex items-center justify-center gap-2 text-primary hover:underline text-sm font-medium"
                to="/login"
              >
                <span className="material-symbols-outlined text-base">
                  arrow_back
                </span>
                Return to Sign In
              </Link>
            </div>

            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
          </div>

          {isSubmitted && (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-lg bg-green-50 dark:bg-green-900/30 p-4 text-center border border-green-200 dark:border-green-800">
              <span className="material-symbols-outlined text-3xl text-green-600 dark:text-green-400">
                mark_email_read
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-green-800 dark:text-green-200">
                  Check your inbox
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  If an account with that email exists, we've sent instructions
                  to reset your password. Don't forget to check your spam
                  folder!
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            For security reasons, we will not confirm if an email address is
            registered.
          </p>
        </div>
      </main>
    </div>
  );
}
