"use client";
import IdeaBar from "@/components/IdeaBar";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { ArrowLeft, ArrowRight, Snowflake } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Card = {
  id: number;
  title: string;
  description: string;
};

const Page = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

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

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
  };

  const handleNext = () => {
    console.log("Selected Card:", selectedCard);
    // Navigate to the next step with the selectedCard
  };

  return (
    <div className="w-full">
      <IdeaBar menu="refinement" />

      <div className="w-full mt-4">
        <div className="w-full flex px-6 gap-[480px]">
          <Button
            variant={"outline"}
            className="font-body py-6 flex gap-4 bg-background text-xl"
          >
            <ArrowLeft /> Back
          </Button>
        </div>
        <div className="flex justify-between gap-2 flex-col lg:flex-row">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 row-span-8 p-6 font-body w-full lg:w-1/2 lg:border-r border-gray-600">
            {cards.map((card) => (
              <InfoCard
                key={card.id}
                card={card}
                isSelected={selectedCard?.id === card.id}
                onSelect={handleCardSelect}
              />
            ))}
          </div>

          {/* Selectable Grid */}
          <div className="w-full lg:w-1/2 flex flex-col items-end p-6">
            <Button variant={"outline"} className="">
              <span className="text-xl">
                <Snowflake size={36} />
              </span>{" "}
              Generate Diagram
            </Button>
            <div className="w-full mt-6 bg-background p-4 rounded-lg border border-2 border-blue-400 font-body min-h-[400px] max-h-[400px] overflow-y-auto">
              <h2 className="text-xl font-semibold font-heading text-blue-700">
                {selectedCard?.title}
              </h2>
              <br />
              {selectedCard?.description}
            </div>
            <div className="w-full flex justify-end mt-6 gap-4">
              <Button
                variant={"outline"}
                className="bg-background font-body h-100 text-xl w-2/5"
              >
                Idea Refine
              </Button>
              <Button
                variant={"outline"}
                className="bg-background font-body h-100 text-xl w-2/5"
              >
                View Prototype
              </Button>
              <Button className="w-1/5 h-100">
                <Image src="/chat.png" width={50} height={50} alt="Chat" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

type InfoCardProps = {
  card: Card;
  isSelected: boolean;
  onSelect: (card: Card) => void;
};

const InfoCard: React.FC<InfoCardProps> = ({ card, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(card)}
      className={`relative w-full lg:max-w-sm p-6 bg-white border rounded-2xl shadow-lg cursor-pointer ${
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
