"use client";

import Home from "@/views/home";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

const HomePage = () => {
  const { user } = useUser();

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        const res = await axios.post("/api/user", {
          imageUrl: user.imageUrl,
        });
      }
    };

    getUser();
  }, [user]);

  return <Home />;
};

export default HomePage;
