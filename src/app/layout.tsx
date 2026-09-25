import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

import { WorkoutProvider } from "./context/WorkoutContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = { title: "FitLog", description: "Workout Library" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${oswald.variable} bg-darkbg text-white`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <WorkoutProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ToastContainer position="bottom-right" theme="dark" />
        </WorkoutProvider>
      </body>
    </html>
  );
}