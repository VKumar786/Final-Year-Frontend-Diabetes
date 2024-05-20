import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import toast, { Toaster } from "react-hot-toast";

const space_grotest = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diabetes Prediction",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space_grotest.className}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
