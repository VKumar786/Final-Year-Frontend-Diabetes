import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "./LayoutProvider";

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
    <ClerkProvider>
      <html lang="en">
        <body className={space_grotest.className}>
          <LayoutProvider>
            <Navbar />
            {children}
            <Toaster />
          </LayoutProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
