"use client";
import IdeaBar from "@/components/IdeaBar";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

// Define types for card data
interface Card {
  id: number;
  title: string;
  description: string;
}

interface InfoCardProps {
  card: Card;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const Page: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const cards: Card[] = [
    {
      id: 1,
      title: "GreenGrid Hub",
      description:
        "An eco-friendly initiative that integrates IoT-based energy monitoring and management across buildings to reduce carbon emissions. GreenGrid Hub leverages smart sensors and data analytics to optimize energy consumption, promote renewable sources, and encourage sustainable practices within urban areas.",
    },
    {
      id: 2,
      title: "SmartCity Solutions",
      description:
        "An eco-friendly initiative that integrates IoT-based energy monitoring and management across buildings to reduce carbon emissions. GreenGrid Hub leverages smart sensors and data analytics to optimize energy consumption, promote renewable sources, and encourage sustainable practices within urban areas.",
    },
    {
      id: 3,
      title: "EcoEnergy Network",
      description:
        "An eco-friendly initiative that integrates IoT-based energy monitoring and management across buildings to reduce carbon emissions. GreenGrid Hub leverages smart sensors and data analytics to optimize energy consumption, promote renewable sources, and encourage sustainable practices within urban areas.",
    },
    {
      id: 4,
      title: "UrbanAnalytics",
      description:
        "An eco-friendly initiative that integrates IoT-based energy monitoring and management across buildings to reduce carbon emissions. GreenGrid Hub leverages smart sensors and data analytics to optimize energy consumption, promote renewable sources, and encourage sustainable practices within urban areas.",
    },
    {
      id: 5,
      title: "CleanTech Hub",
      description:
        "An eco-friendly initiative that integrates IoT-based energy monitoring and management across buildings to reduce carbon emissions. GreenGrid Hub leverages smart sensors and data analytics to optimize energy consumption, promote renewable sources, and encourage sustainable practices within urban areas.",
    },
    {
      id: 6,
      title: "FutureEco",
      description:
        "An eco-friendly initiative that integrates IoT-based energy monitoring and management across buildings to reduce carbon emissions. GreenGrid Hub leverages smart sensors and data analytics to optimize energy consumption, promote renewable sources, and encourage sustainable practices within urban areas.",
    },
  ];

  const handleCardSelect = (id: number): void => {
    setSelectedCards((prev) => {
      const exists = prev.some((card) => card.id === id);
      if (exists) {
        // Remove the card if it already exists in the selection
        return prev.filter((card) => card.id !== id);
      }
      // Add the card if it doesn't exist
      const selectedCard = cards.find((card) => card.id === id);
      return selectedCard ? [...prev, selectedCard] : prev;
    });
  };

  const handleNext = (): void => {
    console.log("Selected Cards:", selectedCards);
    // Navigate to the next step with selectedCards
  };

  return (
    <div className="w-full">
      <IdeaBar menu="list" />

      <div className="w-full mt-4">
        <div className="w-full flex px-6 gap-[480px]">
          <Button
            variant={"outline"}
            className="font-body py-6 flex gap-4 bg-background text-xl"
          >
            <ArrowLeft /> Back
          </Button>
        </div>

        {/* Selectable Grid */}
        <div className="grid grid-cols-4 gap-4 row-span-8 p-6 font-body">
          {cards.map((card) => (
            <InfoCard
              key={card.id}
              card={card}
              isSelected={selectedCards.some((selected) => selected.id === card.id)}
              onSelect={handleCardSelect}
            />
          ))}
        </div>
      </div>
      <div className="px-8 flex justify-end">
        <Button
          variant={"default"}
          className="font-body py-6 flex gap-4 bg-blue-600 text-xl text-white"
          onClick={handleNext}
        >
          <ArrowRight /> Next
        </Button>
      </div>
    </div>
  );
};

export default Page;

const InfoCard: React.FC<InfoCardProps> = ({ card, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(card.id)}
      className={`relative max-w-sm p-6 bg-white border rounded-2xl shadow-lg cursor-pointer ${
        isSelected ? "border-blue-600 ring-2 ring-blue-400" : "border-blue-400"
      }`}
    >
      {/* Title */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-blue-600">{card.title}</h3>
        <a
          href="#"
          className="text-blue-600 hover:text-blue-800"
          aria-label="Open in new tab"
        >
          <ArrowTopRightIcon />
        </a>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-700">{card.description}</p>

      {/* Action Button */}
      <button
        className="absolute right-4 p-2 bg-blue-700 rounded-full border border-blue-400 text-white shadow hover:bg-blue-200"
        aria-label="Copy content"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M16 16h2a2 2 0 002-2V10a2 2 0 00-2-2h-8M16 12V6M8 8h4"
          />
        </svg>
      </button>
    </div>
  );
};
