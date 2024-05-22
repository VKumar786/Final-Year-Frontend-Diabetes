import ForgotPassword from "@/views/reset-password";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ForgotPasswordPage = async () => {
  const user = await currentUser();

  if (user) redirect("/");
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
