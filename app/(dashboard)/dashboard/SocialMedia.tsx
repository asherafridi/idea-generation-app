"use client";

import SocialMediaCard from "@/components/SocialMediaCard";

export default function SocialMedia() {
  return (
    <div>
      <h2 className="text-foreground mt-12 mb-8 text-3xl font-heading font-medium">
        Enterprise Social Media Reviews
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-2 md:grid-cols-3  gap-12">
      <SocialMediaCard logo="/social/reddit.png" title="Reddit" />
      <SocialMediaCard logo="/social/facebook.png" title="Facebook" />
      <SocialMediaCard logo="/social/linkedin.png" title="LinkedIn" />
      <SocialMediaCard logo="/social/x.png" title="X" />
      <SocialMediaCard logo="/social/substack.png" title="Substack" />
      <SocialMediaCard logo="/social/medium.png" title="Medium" />
      <SocialMediaCard logo="/social/quora.png" title="Quora" />
      <SocialMediaCard logo="/social/b2c.png" title="Business 2 Community" />
      </div>
    </div>
  );
}
