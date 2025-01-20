"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import IdeaBar from "@/components/IdeaBar";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { useIdea } from "@/components/IdeaProvider";
import { Skeleton } from "@/components/ui/skeleton";

// Interface for card data
interface Card {
  description: string;
  link: string;
}

// InfoCard Component Props
interface InfoCardProps {
  card: Card;
}

// Page Component
const Page: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { prototypeText } = useIdea();

  // Fetch cards from the API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        // const response = await axios.post(
        //   "https://idea.vetaai.com/search",
        //   { idea: prototypeText },
        //   {
        //     headers: { "Content-Type": "application/json" },
        //   }
        // );
        // setCards(response.data.results || []);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="w-full pb-16">
      <div className="w-full border-b px-32 py-6 flex items-center gap-6">
        <Button
          variant="outline"
          className="font-body py-6 flex gap-4 bg-background text-xl"
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back
        </Button>
        <h1 className="font-heading text-4xl font-bold">Idea History</h1>
      </div>
      <div></div>
    </div>
  );
};

// InfoCard Component
const HistoryCard: React.FC<InfoCardProps> = ({ card }) => {
  function getDomainName(link) {
    try {
      const url = new URL(link);
      return url.hostname; // Returns the domain name
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }

  return (
    <div className="p-4 w-full border rounded-xl font-body shadow-md bg-background relative pb-24">
      <div className="flex justify-between items-start">
        <h3 className="text-md font-semibold text-blue-600 break-words">
          {getDomainName(card.link)}
        </h3>
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
          aria-label="Open in new tab"
        >
          <ArrowTopRightIcon />
        </a>
      </div>
      <p className="mt-2 text-foreground text-sm mb-4">{card.description}</p>
      <Link href={card.link} className="absolute bottom-4" target="_blank">
        <button className="bg-primary px-10 text-xl py-2 rounded-full text-white border-2 border-blue-600 hover:bg-blue-700 hover:text-white">
          Visit
        </button>
      </Link>
    </div>
  );
};

export default Page;
