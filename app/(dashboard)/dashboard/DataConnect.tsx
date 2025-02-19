"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import DatabaseCard from "./DatabaseCard";
import  AddNewDB  from "./AddNewDB";

interface Card {
  id: string;
  type: string;
  description: string;
  link: string;
}

export default function DataConnect() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleAddNewSource = () => {
    router.push("/database/new"); // Navigate to the "Add New Database" page
  };

  // Fetch cards from the API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/database");
        setCards(response.data.databases || []);
      } catch (error) {
        toast.error("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="mx-16 mx-auto">
      <AddNewDB />
      <h2 className="text-foreground font-heading mt-12 mb-4 text-3xl font-body font-medium flex justify-between items-center">
        Data Connections
      </h2>
      <div className="">
        {loading ? (
          <div className="w-full gap-4 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-full h-[300px] bg-gray-100" />
            ))}
          </div>
        ) : cards.length > 0 ? (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <DatabaseCard key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No results found.</p>
        )}
      </div>
    </div>
  );
}
