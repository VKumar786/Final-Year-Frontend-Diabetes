import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex flex-col gap-3 justify-center px-6 py-12 lg:px-8 items-center w-full">
      <SignIn path="/sign-in" />
      <Link href="/forgot-password" className="text-blue-500 hover:underline">
        Forgot Password?
      </Link>
    </div>
  );
};

export default SignInPage;
