"use client";
import SocialMedia from "./SocialMedia";
import { File, Flame, Globe, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DocumentUploader from "./Document";
import WebsiteLinks from "./WebsiteLinks";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "social"; // Default to 'social' if no tab is specified
  const [tab, setTab] = useState(initialTab);

  // Sync state with URL parameter changes
  useEffect(() => {
    const currentTab = searchParams.get("tab") || "social";
    setTab(currentTab); // Update the tab state when the URL parameter changes
  }, [searchParams]);

  // Update the URL when the tab state changes
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("tab", tab); // Update the `tab` parameter
    router.push(`/dashboard?${currentParams.toString()}`, { shallow: true });
  }, [tab]);

  const tabs = [
    { id: "social", label: "Social Media", icon: <Twitter /> },
    { id: "data", label: "Data Connect", icon: <Flame /> },
    { id: "document", label: "Upload Document", icon: <File /> },
    { id: "website", label: "Website Link", icon: <Globe /> },
  ];

  return (
    <div className="px-8">
      <h1 className="text-center font-body text-5xl font-medium mb-6 text-[#368DFF] mt-4">
        Ideation Studio
      </h1>
      <div className="flex w-full bg-background h-auto lg:h-16 font-body rounded-xl overflow-hidden relative shadow-lg">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`w-1/4 transition-all flex flex-col lg:flex-row items-center px-12 lg:gap-8 gap-2 py-4 duration-300 text-md lg:text-lg ${
              tab === item.id
                ? "bg-blue-500 text-white z-10 rounded-xl"
                : "bg-background text-foreground text-black"
            }`}
          >
            {item.icon} <span>{item.label}</span>
          </button>
        ))}
      </div>
      {tab === "social" && <SocialMedia />}
      {tab === "data" && <div>Data Connect Content</div>}
      {tab === "document" && <DocumentUploader />}
      {tab === "website" && <WebsiteLinks />}
    </div>
  );
}
