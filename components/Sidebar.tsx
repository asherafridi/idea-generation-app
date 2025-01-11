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
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";
import ProfileMenu from "./ProfileMenu";

// Sidebar Context
interface SidebarContextType {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

// Sidebar Provider
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
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
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Sidebar Trigger Component
export const SidebarTrigger: React.FC = () => {
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

// Sidebar Item Props
interface SidebarItemProps {
  href: string;
  Icon: React.ReactNode;
  label: string;
}

// Sidebar Component
export const Sidebar: React.FC = () => {
  const { isExpanded, toggleExpanded } = useSidebar();
  const router = useRouter();

  const items: SidebarItemProps[] = [
    { href: "/dashboard?tab=social", Icon: <Twitter />, label: "Social Media" },
    { href: "/dashboard?tab=data", Icon: <Flame />, label: "Data Connect" },
    {
      href: "/dashboard?tab=document",
      Icon: <File />,
      label: "Upload Document",
    },
    { href: "/dashboard?tab=website", Icon: <Globe />, label: "Website Link" },
    { href: "/settings", Icon: <Twitch />, label: "History" },
  ];

  const logout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 h-screen transition-all duration-300 ease-in-out bg-sidebar z-50 md:z-auto overflow-hidden text-sidebar-foreground flex flex-col justify-between ${
          isExpanded ? "left-0 w-72" : "-left-72 w-72 lg:left-0 lg:w-24"
        }`}
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
            className={`mt-32 font-heading font-medium text-sm flex flex-col gap-2`}
          >
            <ProfileMenu isExpanded={isExpanded} />

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
        <div className="font-heading font-medium text-sm flex flex-col gap-2 pb-2">
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
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isExpanded ? "block lg:hidden" : "hidden"
        }`}
        onClick={toggleExpanded}
      />
    </>
  );
};

// Sidebar Item Component
export const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  Icon,
  label,
}) => {
  const { isExpanded } = useSidebar();

  return (
    <Link
      href={href}
      className={`w-full py-2 rounded flex items-center hover:bg-gray-200 ${
        isExpanded ? "flex-row px-4 gap-2" : "flex-col gap-1"
      }`}
    >
      {Icon}
      <span className={`text-center`}>{label}</span>
    </Link>
  );
};
