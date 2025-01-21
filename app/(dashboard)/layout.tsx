"use client";
import "@/styles/globals.css";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IdeaProvider } from "@/components/IdeaProvider";

import Head from "next/head";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = useSession();
  const router = useRouter();

  console.log(session.status);
  useEffect(() => {
    if (session.status === "unauthenticated") {
      console.log(session.status);
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", storedTheme);
    document.body.classList.add(storedTheme);
  }, []);
  

  return (
    <SidebarProvider>
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.1" />
      </Head> */}
      <main className="w-full flex">
        <Sidebar />
        <div className="w-full lg:pl-24">
          <IdeaProvider>{children}</IdeaProvider>
        </div>
        <Toaster position="top-right" />
      </main>
    </SidebarProvider>
  );
}
