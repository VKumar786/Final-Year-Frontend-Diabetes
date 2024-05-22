"use client";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/");
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError("");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div className="flex min-h-5/6 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 384 511.4"
          width={30}
          height={30}
        >
          <defs>
            <linearGradient
              id="a"
              gradientUnits="userSpaceOnUse"
              x1="163.52"
              y1="286.47"
              x2="163.52"
              y2="500.71"
            >
              <stop offset={0} stopColor="#FB6404" />
              <stop offset={1} stopColor="#F2BE10" />
            </linearGradient>
          </defs>
          <path
            fill="#E20919"
            d="M77.46 228.43C65.33 119.85 128.78 43.48 247.72 0c-72.85 94.5 62.09 196.88 69.53 295.03 17.44-29.75 27.34-69.48 29.3-122.55 89.18 139.92 15.25 368.59-181.02 335.73-18.02-3.01-35.38-8.7-51.21-17.17C42.76 452.8 0 369.53 0 290c0-50.69 21.68-95.95 49.74-131.91 3.75 35.23 11.73 61.51 27.72 70.34z"
          />
          <path
            fill="url(#a)"
            d="M139.16 372.49c-21.83-57.66-18.81-150.75 42.33-183.41.43 107.03 103.57 120.64 84.44 234.9 17.64-20.39 26.51-53.02 28.1-78.75 27.96 65.38 6.04 117.72-33.81 144.37-121.15 81-225.48-83.23-156.11-173.26 2.08 20.07 26.14 51.12 35.05 56.15z"
          />
        </svg>

        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}
          onSubmit={!successfulCreation ? create : reset}
        >
          {!successfulCreation && (
            <>
              <label htmlFor="email">Please provide your email address</label>
              <input
                type="email"
                placeholder="e.g john@doe.com"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md btn btn-neutral px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 gap-2 items-center"
                >
                  Send password reset code
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </>
          )}

          {successfulCreation && (
            <>
              <label htmlFor="password">Enter your new password</label>
              <input
                type="password"
                value={password}
                placeholder="**********"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="password">
                Enter the password reset code that was sent to your email
              </label>
              <input
                type="text"
                value={code}
                placeholder="**********"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6 outline-none"
                onChange={(e) => setCode(e.target.value)}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md btn btn-neutral px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 gap-2 items-center"
                >
                  Reset
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </>
          )}

          {secondFactor && (
            <p>2FA is required, but this UI does not handle that</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
