"use client";

import SocialMediaCard from "@/components/SocialMediaCard";

export default function SocialMedia() {
  return (
    <div>
      <h2 className="text-foreground mt-12 mb-4 text-3xl font-body font-medium">
        Enterprise Social Media Reviews
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-2  gap-12">
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
      </div>
    </div>
  );
}
