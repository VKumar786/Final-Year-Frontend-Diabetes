import About from "@/views/about";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company",
};

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
