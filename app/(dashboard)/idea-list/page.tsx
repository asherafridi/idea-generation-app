"use client";
import IdeaBar from "@/components/IdeaBar";
import { useIdea } from "@/components/IdeaProvider";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

// Define types for card data
interface Card {
  idea_id: number;
  title: string;
  idea: string;
}

interface InfoCardProps {
  card: Card;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const Page: React.FC = () => {
  const { ideas, setSelectedIdeas, selectedIdeas } = useIdea();
  const [selectedCards, setSelectedCards] = useState(selectedIdeas || []);
  const cards = ideas || []; // Ensure `cards` is always an array.

  const router = useRouter();

  const handleCardSelect = (id: number): void => {
    setSelectedCards((prev) => {
      const exists = prev.some((card) => card.idea_id === id);
      if (exists) {
        return prev.filter((card) => card.idea_id !== id);
      }
      const selectedCard = cards.find((card) => card.idea_id === id);
      return selectedCard ? [...prev, selectedCard] : prev;
    });
  };

  const handleNext = (): void => {
    console.log("Selected Cards:", selectedCards);
    setSelectedIdeas(selectedCards);
    router.push("/idea-refinement");
  };

  return (
    <div className="w-full">
      <IdeaBar menu="list" />

      <div className="w-full mt-4">
        <div className="w-full flex px-6 gap-[480px]">
          <Button
            variant={"outline"}
            className="font-body py-6 flex gap-4 bg-background text-xl"
            onClick={()=>{
              router.back();
            }}
          >
            <ArrowLeft /> Back
          </Button>
        </div>

        {/* Selectable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 row-span-8 p-6 font-body">
          {cards.map((card) => (
            <InfoCard
              key={card.idea_id}
              card={card}
              isSelected={selectedCards.some((selected) => selected.idea_id === card.idea_id)}
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
      onClick={() => onSelect(card.idea_id)}
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
      <p className="mt-2 text-sm text-gray-700">{card.idea}</p>

      {/* Action Button */}
      <button
      onClick={ ()=>{
         navigator.clipboard.writeText(card.idea);
        toast.success("Idea Copied!")
      }}
        className="absolute right-4  p-2 -bottom-2 bg-blue-700 rounded-full border border-blue-400 text-white shadow hover:bg-blue-200"
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
