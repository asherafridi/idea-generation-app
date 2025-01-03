import { TwitterLogoIcon } from "@radix-ui/react-icons";
import {
  File,
  Flame,
  Globe,
  LogOut,
  PanelLeft,
  Settings,
  Twitch,
  Twitter,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import  { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

// Sidebar Context
const SidebarContext = createContext(null);

// Sidebar Provider
export const SidebarProvider = ({ children }: { children: any }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        toggleExpanded,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Custom Hook to Use Sidebar Context
export const useSidebar = () => useContext(SidebarContext);

// Sidebar Trigger Component
export const SidebarTrigger = () => {
  const { toggleExpanded } = useSidebar();

  return (
    <button
      onClick={toggleExpanded}
      className="mr-2"
      aria-label="Toggle Sidebar"
    >
      <PanelLeft />
    </button>
  );
};

// Sidebar Component
export const Sidebar = () => {
  const { isExpanded, toggleExpanded } = useSidebar();
  const router = useRouter();
  const items = [
    { href: "/profile", Icon: <User />, label: "Profile" },
    { href: "/settings", Icon: <Twitter />, label: "Social Media" },
    { href: "/settings", Icon: <Flame />, label: "Data Connect" },
    { href: "/settings", Icon: <Globe />, label: "Website Link" },
    { href: "/settings", Icon: <File />, label: "Upload Document" },
    { href: "/settings", Icon: <Twitch />, label: "History" },
  ];

  const logout = ()=>{
    signOut();
    router.push('/login');
}
  return (
    <>
      {/* Sidebar */}
<div
  className={`
    fixed 
    top-0 
    h-screen
    transition-all duration-300 ease-in-out
    bg-sidebar z-50 md:z-auto overflow-hidden
    text-sidebar-foreground
    flex flex-col justify-between
    
    ${isExpanded ? "left-0 w-72" : "-left-72 w-72 lg:left-0 lg:w-24"}
  `}
>
  <div className="flex flex-col justify-between">
    {/* Logo Section */}
    <div className="w-full flex items-center justify-start gap-2 px-4 mt-2">
      <Image
        src="/logo.png"
        width={isExpanded ? 40 : 50}
        height={isExpanded ? 40 : 50}
        alt="Logo"
      />
      {isExpanded && (
        <span className="font-heading font-bold text-lg text-sidebar-foreground">
          Logo Name
        </span>
      )}
    </div>

    {/* Menu Items */}
    <div
      className={`mt-32 font-heading font-medium text-sm flex flex-col gap-2
      ${isExpanded ? "text-sm" : "text-md"}`}
    >
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          href={item.href}
          Icon={item.Icon}
          label={item.label}
        />
      ))}
    </div>
  </div>

  {/* Chat Image and Logout Section */}
  <div
    className={`font-heading font-medium text-sm flex flex-col gap-2 pb-2
      ${isExpanded ? "text-sm" : "text-md"}`}
  >
    {/* Chat Section */}
    <Link
      href="#"
      className={`w-full flex items-center gap-2 px-4 mb-4 ${
        isExpanded ? "text-md" : "justify-center"
      }`}
    >
      <Image
        src="/chat.png"
        width={isExpanded ? 28 : 50}
        height={isExpanded ? 28 : 50}
        alt="Chat"
      />
      {isExpanded && (
        <span className="font-heading font-medium text-sidebar-foreground">
          Chat
        </span>
      )}
    </Link>

    {/* Logout Item */}
    <button onClick={logout}>

    <SidebarItem href="#" Icon={<LogOut />} label="Logout" /> 
    </button>
  </div>
</div>

{/* Mobile Overlay */}
<div
  className={`
    fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300
    ${isExpanded ? "block lg:hidden" : "hidden"}
  `}
  onClick={toggleExpanded}
/>

    </>
  );
};

export const SidebarItem = ({ href, Icon, label }) => {
  const { isExpanded } = useSidebar();

  return (
    <Link
      href={href}
      className={`w-full py-2 rounded flex items-center hover:bg-gray-200 ${
        isExpanded ? "flex-row px-4 gap-2" : "flex-col gap-1"
      }`}
    >
      {Icon}
      <span className={`text-center `}>{label}</span>
    </Link>
  );
};
