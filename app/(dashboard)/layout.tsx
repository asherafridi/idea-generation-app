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
    if (session.status === "unauthenticated") {
      console.log(session.status);
      router.push("/login");
    }

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
          <div className="block md:hidden w-full px-4 py-2 h-16 border-0 border-b border-blue-400 shadow-md flex items-center"> 
            <SidebarTrigger /> <span className="font-body font-medium">{session?.data?.user?.name}</span>
          </div>
          <IdeaProvider>{children}</IdeaProvider>

          <div className="w-full h-16  relative bottom-0">
            <div className="w-ful h-full bg-background px-4  flex items-center justify-center border font-body border-0 border-t  border-blue-400 shadow-sm">
              <p className="text-center">&copy; 2025 Launchidea. All rights reserved. Version 1.0</p>
            </div>
          </div>
        </div>
        
        <Toaster position="top-right" />
        
      </main>
    </SidebarProvider>
  );
}
