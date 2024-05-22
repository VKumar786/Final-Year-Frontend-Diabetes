import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex flex-col gap-3 justify-center px-6 py-12 lg:px-8 items-center w-full">
      <SignUp path="/sign-up" />
    </div>
  );
};

export default SignUpPage;
