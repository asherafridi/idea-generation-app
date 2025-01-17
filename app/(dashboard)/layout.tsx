"use client";
import "@/styles/globals.css";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IdeaProvider } from "@/components/IdeaProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  return (
    <SidebarProvider>
      <main className="w-full flex">
        <Sidebar />
        <div className="w-full lg:pl-24"><IdeaProvider>{children}</IdeaProvider></div>
        <Toaster position="top-right" />
      </main>
    </SidebarProvider>
  );
}
