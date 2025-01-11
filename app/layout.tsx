import type { Metadata } from "next";
import "@/styles/globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import  Provider  from "@/components/Provider";

export const metadata: Metadata = {
  title: "Idea Generation App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    
    <html lang="en">
      <body className="min-h-screen light">

        <Provider>{children}</Provider>
      </body>
    </html>
    

        
  );
}

