"use client";

import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoadingPage = () => {
  const router = useRouter();

  const fetchData = async () => {
    if (!localStorage.getItem("reloaded")) {
      localStorage.setItem("reloaded", "true");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    } else {
      localStorage.removeItem("reloaded");
      router.push("/");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <Loading />;
};

export default LoadingPage;
